const AIRTABLE_API = "https://api.airtable.com/v0";

function pick(fields, names, fallback = "") {
  for (const name of names) {
    const value = fields[name];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return fallback;
}

function asText(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value) return value.name || JSON.stringify(value);
  return String(value || "");
}

function photos(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => item.url).filter(Boolean).slice(0, 6);
}

function isFlagged(fields) {
  const rentability = asText(pick(fields, ["Rentability", "rentability", "Rentable", "Not rentable"])).toLowerCase();
  const executer = asText(pick(fields, ["Executer Decision", "Executor Decision", "executerDecision"])).toLowerCase();
  const flag = asText(pick(fields, ["Flag", "Red", "Priority", "Marked", "markedRed"])).toLowerCase();
  return rentability.includes("not") || executer.includes("not rentable") || flag.includes("red") || flag.includes("urgent");
}

function mapRecord(record) {
  const fields = record.fields || {};
  const id = asText(pick(fields, ["damage_id", "Damage ID", "ID"], record.id));
  const partDecision = asText(pick(fields, ["Part Decision", "partDecision"]));
  const orderStatus = asText(pick(fields, ["Order Status", "Needs Order", "orderStatus"]));
  const flagged = isFlagged(fields);
  return {
    id,
    airtableRecordId: record.id,
    plate: asText(pick(fields, ["license_plate", "Plate", "License Plate", "Kennzeichen"])),
    model: asText(pick(fields, ["Subgroup", "Model", "vehicle_id"], "Airtable")),
    station: asText(pick(fields, ["Station", "station", "Pickup Station", "Current Station"], "")),
    description: asText(pick(fields, ["Damage Description", "Damage", "Description"])),
    status: "Offen",
    partDecision,
    orderStatus,
    units: 0,
    warranty: asText(pick(fields, ["warranty", "Warranty"])),
    comment: asText(pick(fields, ["Comment NEW", "Comment", "Repair Comment"])),
    orderComment: orderStatus,
    sourceActive: true,
    rentability: flagged ? "Not rentable" : "Rentable",
    flagged,
    photos: photos(pick(fields, ["Damage Pictures", "Pictures", "Photos"], [])),
  };
}

module.exports = async function handler(request, response) {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID || process.env.AIRTABLE_TABLE_NAME;
  const view = process.env.AIRTABLE_VIEW_ID || process.env.AIRTABLE_VIEW_NAME;

  if (!token || !baseId || !tableId) {
    response.status(500).json({ error: "Airtable environment variables missing" });
    return;
  }

  const station = request.query.station || "";
  const url = new URL(`${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableId)}`);
  url.searchParams.set("pageSize", "100");
  if (view) url.searchParams.set("view", view);

  const damages = [];
  let offset = "";
  do {
    if (offset) url.searchParams.set("offset", offset);
    const airtableResponse = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!airtableResponse.ok) {
      response.status(airtableResponse.status).json({ error: "Airtable request failed" });
      return;
    }
    const payload = await airtableResponse.json();
    damages.push(...(payload.records || []).map(mapRecord));
    offset = payload.offset || "";
  } while (offset && damages.length < 500);

  const filtered = station ? damages.filter((damage) => !damage.station || damage.station === station) : damages;
  response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  response.status(200).json({ damages: filtered });
};
