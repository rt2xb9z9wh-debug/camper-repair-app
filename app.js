const damageStorageKey = "camperfix:damage-state:v2";
const projectStorageKey = "camperfix:project-state:v2";
const noteKey = "camperfix:invoice-note:v2";
const profileStorageKey = "camperfix:profile-state:v1";

const seedProjects = [
  {
    id: "project-nantes",
    name: "Frankreich Reise Juli",
    stations: ["Nantes", "Toulouse"],
    activeStation: "Nantes",
    period: "28.06. - 04.07.2026",
    ratePerUnit: 95,
    damageIds: ["D-1001", "D-1002", "D-1004", "D-1005", "D-1009", "D-2004"],
    expenses: [
      { id: "E-1", type: "Hotel", amount: 320 },
      { id: "E-2", type: "Kilometer", amount: 180 },
    ],
  },
  {
    id: "project-bordeaux",
    name: "Bordeaux Nacharbeit",
    stations: ["Bordeaux"],
    activeStation: "Bordeaux",
    period: "15.07. - 16.07.2026",
    ratePerUnit: 95,
    damageIds: ["D-3001"],
    expenses: [],
  },
];

const seedDamages = [
  {
    id: "D-1001",
    plate: "VAN-001",
    model: "Road House",
    station: "Nantes",
    description: "Safety net bar missing",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 1,
    warranty: "yes",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Not rentable",
    flagged: true,
    photos: [],
  },
  {
    id: "D-1002",
    plate: "VAN-002",
    model: "Couple Cottage",
    station: "Nantes",
    description: "Drivers blind detached at bottom",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 1,
    warranty: "yes",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Rentable",
    flagged: false,
    photos: [],
  },
  {
    id: "D-1003",
    plate: "VAN-003",
    model: "Family Finca",
    station: "Nantes",
    description: "Window out of place",
    status: "Offen",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "yes",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Rentable",
    flagged: false,
    photos: [],
  },
  {
    id: "D-1004",
    plate: "VAN-004",
    model: "Campervan",
    station: "Nantes",
    description: "Water tap leaking, kitchen area",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 3,
    warranty: "",
    comment: "",
    orderComment: "",
    sourceActive: false,
    rentability: "Rentable",
    flagged: false,
    photos: [],
  },
  {
    id: "D-1005",
    plate: "VAN-004",
    model: "Campervan",
    station: "Nantes",
    description: "Water runs into the vehicle when it rains",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "",
    comment: "Geprueft, aktuell kein Wassereintritt erkennbar.",
    orderComment: "",
    sourceActive: false,
    rentability: "Not rentable",
    flagged: true,
    photos: [],
  },
  {
    id: "D-1006",
    plate: "VAN-005",
    model: "Campervan",
    station: "Nantes",
    description: "Pop up roof does not close from one side",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 0,
    warranty: "",
    comment: "Antrieb auf einer Seite defekt, Teil erforderlich.",
    orderComment: "Electric linear actuator driver side pruefen/bestellen.",
    sourceActive: true,
    rentability: "Not rentable",
    flagged: true,
    photos: [],
  },
  {
    id: "D-1009",
    plate: "VAN-007",
    model: "Campervan",
    station: "Nantes",
    description: "Roof window broken",
    status: "Partly repaired",
    partDecision: "Part(s) Needed",
    orderStatus: "New roof window",
    units: 1,
    warranty: "",
    comment: "Provisorisch abgedichtet.",
    orderComment: "New roof window, large and small option klaeren.",
    sourceActive: false,
    rentability: "Not rentable",
    flagged: true,
    photos: [],
  },
  {
    id: "D-2001",
    plate: "VAN-201",
    model: "Surfer Suite",
    station: "Toulouse",
    description: "Sliding door blind frame cracked",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 1,
    warranty: "yes",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Rentable",
    flagged: true,
    photos: [],
  },
  {
    id: "D-2002",
    plate: "VAN-202",
    model: "Road House",
    station: "Toulouse",
    description: "Step housing cover missing",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Ordered",
    units: 1,
    warranty: "",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Not rentable",
    flagged: true,
    photos: [],
  },
  {
    id: "D-2003",
    plate: "VAN-203",
    model: "Campervan",
    station: "Toulouse",
    description: "Kitchen drawer detached",
    status: "Offen",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Rentable",
    flagged: false,
    photos: [],
  },
  {
    id: "D-2004",
    plate: "VAN-204",
    model: "Campervan",
    station: "Toulouse",
    description: "Mosquito net pins missing",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 2,
    warranty: "",
    comment: "Pins ersetzt, Funktion getestet.",
    orderComment: "",
    sourceActive: false,
    rentability: "Rentable",
    flagged: false,
    photos: [],
  },
  {
    id: "D-3001",
    plate: "VAN-301",
    model: "Family Finca",
    station: "Bordeaux",
    description: "Table latch does not lock",
    status: "Offen",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Rentable",
    flagged: false,
    photos: [],
  },
  {
    id: "D-3002",
    plate: "VAN-302",
    model: "Campervan",
    station: "Bordeaux",
    description: "Bathroom door lower panel loose",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 1,
    warranty: "",
    comment: "",
    orderComment: "",
    sourceActive: true,
    rentability: "Not rentable",
    flagged: true,
    photos: [],
  },
];

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-item");
const toast = document.querySelector("#toast");
const todayLabel = document.querySelector("#todayLabel");
const lastUpdate = document.querySelector("#lastUpdate");
const searchInput = document.querySelector("#searchInput");
const projectSelect = document.querySelector("#projectSelect");
const stationSelect = document.querySelector("#stationSelect");
const damageList = document.querySelector("#damageList");
const damageDetail = document.querySelector("#damageDetail");
const sourceList = document.querySelector("#sourceList");
const invoiceNote = document.querySelector("#invoiceNote");
const saveInvoiceNote = document.querySelector("#saveInvoiceNote");
const expenseType = document.querySelector("#expenseType");
const expenseAmount = document.querySelector("#expenseAmount");
const addExpenseButton = document.querySelector("#addExpenseButton");
const newProjectButton = document.querySelector("#newProjectButton");
const editProjectButton = document.querySelector("#editProjectButton");
const deleteProjectButton = document.querySelector("#deleteProjectButton");
const menuButton = document.querySelector("#menuButton");
const appMenu = document.querySelector("#appMenu");
const manualDamageButton = document.querySelector("#manualDamageButton");
const exportInvoiceButton = document.querySelector("#exportInvoiceButton");
const exportReportButton = document.querySelector("#exportReportButton");
const importCsvButton = document.querySelector("#importCsvButton");
const exportCsvButton = document.querySelector("#exportCsvButton");
const csvImportInput = document.querySelector("#csvImportInput");

let damages = loadArray(damageStorageKey, seedDamages);
let projects = loadArray(projectStorageKey, seedProjects);
let profile = loadProfile();
let activeProjectId = projects[0]?.id;
let selectedId = activeProject()?.damageIds[0];
let activeFilter = "open";
let activeSourceFilter = "all";
let damageScrollY = 0;
const collapsedSourceGroups = new Set();

hydrateDamageMetadata();

function loadArray(key, fallback) {
  const saved = localStorage.getItem(key);
  if (!saved) return structuredClone(fallback);
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(fallback);
  } catch {
    return structuredClone(fallback);
  }
}

function hydrateDamageMetadata() {
  const seedById = new Map(seedDamages.map((damage) => [damage.id, damage]));
  damages = damages.map((damage) => {
    const seed = seedById.get(damage.id);
    if (!seed) return damage;
    return {
      ...damage,
      rentability: damage.rentability || seed.rentability,
      flagged: typeof damage.flagged === "boolean" ? damage.flagged : seed.flagged,
      orderComment: damage.orderComment || seed.orderComment || "",
      photos: Array.isArray(damage.photos) ? damage.photos : seed.photos || [],
    };
  });
}

function loadProfile() {
  const fallback = {
    name: "Quick Fix",
    unitRate: 95,
    expenseRates: {
      Spesen: 28,
      Kilometer: 0.42,
      Fahrstunden: 35,
      Flug: 0,
      Hotel: 0,
      Parken: 0,
      "Uber etc.": 0,
      "Sonstige Kosten": 0,
    },
  };
  const saved = localStorage.getItem(profileStorageKey);
  if (!saved) return fallback;
  try {
    return { ...fallback, ...JSON.parse(saved), expenseRates: { ...fallback.expenseRates, ...(JSON.parse(saved).expenseRates || {}) } };
  } catch {
    return fallback;
  }
}

function persistProfile() {
  localStorage.setItem(profileStorageKey, JSON.stringify(profile));
}

function activeProject() {
  const project = projects.find((item) => item.id === activeProjectId) || projects[0];
  normalizeProject(project);
  return project;
}

function normalizeProject(project) {
  if (!project) return;
  if (!project.stations) project.stations = project.station ? [project.station] : ["Nantes"];
  if (!project.activeStation) project.activeStation = project.stations[0];
  if (!project.expenses) project.expenses = [];
  if (!project.ratePerUnit) project.ratePerUnit = 95;
}

function currentTime() {
  return new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function todayText() {
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function e(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function safeUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function persist() {
  localStorage.setItem(damageStorageKey, JSON.stringify(damages));
  localStorage.setItem(projectStorageKey, JSON.stringify(projects));
  lastUpdate.textContent = currentTime();
}

function statusType(status) {
  if (status === "Repariert") return "done";
  if (status === "Irreparabel") return "blocked";
  if (status === "Partly repaired" || status === "Teilrepariert") return "partial";
  return "open";
}

function projectDamages(project = activeProject()) {
  return project.damageIds.map((id) => damages.find((damage) => damage.id === id)).filter(Boolean);
}

function isProjectDamage(id, project = activeProject()) {
  return project.damageIds.includes(id);
}

function sourceDamages(project = activeProject()) {
  normalizeProject(project);
  return damages.filter((damage) => {
    return damage.station === project.activeStation && damage.sourceActive && !project.damageIds.includes(damage.id);
  });
}

function matchesSearch(damage) {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    damage.id,
    damage.plate,
    damage.model,
    damage.station,
    damage.description,
    damage.comment,
    damage.orderComment,
    damage.partDecision,
    damage.orderStatus,
    damage.rentability,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function filteredDamages() {
  return projectDamages().filter((damage) => {
    const matchesQuery = matchesSearch(damage);
    const matchesFilter =
      (activeFilter === "open" && !["Repariert", "Irreparabel", "Partly repaired", "Teilrepariert"].includes(damage.status)) ||
      (activeFilter === "done" && damage.status === "Repariert") ||
      (activeFilter === "partial" && ["Partly repaired", "Teilrepariert"].includes(damage.status)) ||
      (activeFilter === "blocked" && damage.status === "Irreparabel");
    return matchesQuery && matchesFilter;
  });
}

function filteredSourceDamages() {
  const stationRows = sourceDamages();
  const plateCounts = countByPlate(stationRows);
  return stationRows.filter((damage) => {
    const matchesFilter =
      activeSourceFilter === "all" ||
      (activeSourceFilter === "notRentable" && damage.rentability === "Not rentable") ||
      (activeSourceFilter === "parts" && hasParts(damage)) ||
      (activeSourceFilter === "samePlate" && plateCounts.get(damage.plate) > 1);
    return matchesFilter && matchesSearch(damage);
  });
}

function countByPlate(rows) {
  return rows.reduce((map, damage) => map.set(damage.plate, (map.get(damage.plate) || 0) + 1), new Map());
}

function hasParts(damage) {
  return Boolean(damage.partDecision || damage.orderStatus);
}

function rentabilityLabel(damage) {
  return damage.rentability === "Not rentable" ? "Nicht mietbar" : "Rentable";
}

function priorityScore(damage) {
  let score = 0;
  if (damage.rentability === "Not rentable") score += 100;
  if (hasParts(damage)) score += 20;
  if (damage.flagged) score += 10;
  return score;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        value += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        value += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(value);
      value = "";
    } else if (char === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (char !== "\r") {
      value += char;
    }
  }
  row.push(value);
  rows.push(row);
  return rows.filter((item) => item.some((cell) => cell.trim()));
}

function csvValue(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function getField(record, names, fallback = "") {
  for (const name of names) {
    if (record[name] !== undefined && record[name] !== "") return record[name];
  }
  return fallback;
}

function extractUrls(text) {
  return String(text || "").match(/https?:\/\/[^\s),]+/g) || [];
}

function mapCsvDamage(record, fallbackStation) {
  const id = String(getField(record, ["damage_id", "Damage ID", "ID"], `CSV-${Date.now()}`)).trim();
  const when = String(getField(record, ["When to repair"], "")).toLowerCase();
  const partDecision = String(getField(record, ["Part Decision"], "")).trim();
  const orderStatus = String(getField(record, ["Order Status (repair list & order list)", "Order Status", "Needs Order"], "")).trim();
  const flagged = when.includes("asap") || when.includes("defer") || when.includes("stop renting");
  return {
    id,
    plate: String(getField(record, ["license_plate", "Plate", "License Plate", "Kennzeichen"], "")).trim(),
    model: String(getField(record, ["Subgroup (from vehicle_id)", "Subgroup", "Model"], "CSV Import")).trim(),
    vehicleId: String(getField(record, ["vehicle_id"], "")).trim(),
    station: String(getField(record, ["Station"], fallbackStation)).trim() || fallbackStation,
    description: String(getField(record, ["Damage Description", "Damage", "Description"], "")).trim(),
    status: "Offen",
    partDecision,
    orderStatus,
    units: 0,
    warranty: String(getField(record, ["warranty", "Warranty"], "")).trim(),
    comment: String(getField(record, ["Comment NEW", "Comment", "Repair Comment"], "")).trim(),
    orderComment: orderStatus,
    sourceActive: true,
    rentability: flagged ? "Not rentable" : "Rentable",
    flagged,
    photos: extractUrls(getField(record, ["Damage Pictures", "Pictures", "Photos"], "")),
    links: {
      fillout: String(getField(record, ["Fillout Station"], "")).trim(),
      vehicle: String(getField(record, ["LINK TO WAVE CAR"], "")).trim(),
      damage: String(getField(record, ["damage link Button"], "")).trim(),
    },
    importedAt: new Date().toISOString(),
  };
}

function importCsvFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    const project = activeProject();
    const rows = parseCsv(String(reader.result || ""));
    const header = rows[0] || [];
    const imported = rows
      .slice(1)
      .map((row) => Object.fromEntries(header.map((name, index) => [name, row[index] || ""])))
      .map((record) => mapCsvDamage(record, project.activeStation))
      .filter((damage) => damage.id && damage.description);
    const byId = new Map(damages.map((damage) => [damage.id, damage]));
    imported.forEach((damage) => {
      const existing = byId.get(damage.id);
      if (existing && !existing.sourceActive) {
        byId.set(damage.id, { ...damage, ...existing, sourceActive: false });
      } else {
        byId.set(damage.id, existing ? { ...existing, ...damage, comment: existing.comment || damage.comment } : damage);
      }
    });
    damages = [...byId.values()];
    persist();
    render();
    showToast(`${imported.length} Schäden importiert`);
  });
  reader.readAsText(file);
}

function exportCsv(filename, rows) {
  const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function exportWorkCsv() {
  const project = activeProject();
  const projectIds = new Set(project.damageIds);
  const rowsForStation = damages
    .filter((damage) => damage.station === project.activeStation)
    .sort((a, b) => priorityScore(b) - priorityScore(a) || a.plate.localeCompare(b.plate));
  const rows = [
    ["damage_id", "license_plate", "Subgroup", "Station", "Damage Description", "Comment NEW", "Needs Order", "Status", "Units", "Part Decision", "Order Status", "Priority", "In Project"],
    ...rowsForStation.map((damage) => [
      damage.id,
      damage.plate,
      damage.model,
      damage.station,
      damage.description,
      damage.comment || "",
      damage.orderComment || damage.orderStatus || "",
      damage.status,
      damage.units || 0,
      damage.partDecision || "",
      damage.orderStatus || "",
      damage.flagged ? "rot/dringend" : "",
      projectIds.has(damage.id) ? "yes" : "",
    ]),
  ];
  exportCsv(`${project.name.replaceAll(" ", "-")}-${project.activeStation}-arbeitsliste.csv`, rows);
}

function repairHelp(damage) {
  const text = `${damage.description} ${damage.comment} ${damage.orderComment}`.toLowerCase();
  if (text.includes("water") || text.includes("leak")) {
    return "Erst Dichtung, Ablauf und sichtbare Risse prüfen. Danach mit Wasser gezielt 5 Minuten testen und innen kontrollieren, bevor Teile bestellt werden.";
  }
  if (text.includes("roof") || text.includes("pop up")) {
    return "Mechanik links/rechts vergleichen, Führung reinigen, Endlagen prüfen und Antrieb nur ohne Gewalt testen. Wenn einseitig blockiert: Actuator/Schiene dokumentieren.";
  }
  if (text.includes("blind") || text.includes("screen") || text.includes("curtain")) {
    return "Führung und Halter zuerst prüfen. Oft reicht neu einhängen oder Clip ersetzen; bei gerissenem Rahmen direkt Needs Order mit Seite/Position notieren.";
  }
  if (text.includes("door") || text.includes("drawer") || text.includes("latch")) {
    return "Spiel, Scharnier, Verriegelung und Schrauben prüfen. Erst ausrichten und nachziehen, danach testen ob Fahrtvibration die Ursache wiederholt.";
  }
  return "Erst Ursache sichtbar machen: Funktion testen, lose Teile sichern, Foto/Kommentar ergänzen, dann entscheiden ob Reparatur vor Ort reicht oder Needs Order nötig ist.";
}

function setView(viewName) {
  views.forEach((view) => view.classList.toggle("active", view.dataset.viewPanel === viewName));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  if (viewName === "detail" && !selectedId) selectedId = projectDamages()[0]?.id;
  render();
  if (viewName === "damages" && damageScrollY) window.requestAnimationFrame(() => window.scrollTo(0, damageScrollY));
}

function setProject(projectId) {
  activeProjectId = projectId;
  selectedId = projectDamages()[0]?.id;
  searchInput.value = "";
  invoiceNote.value = localStorage.getItem(`${noteKey}:${activeProjectId}`) || "";
  activeFilter = "open";
  document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("selected", button.dataset.filter === "open"));
  render();
}

function setProjectStation(station) {
  projects = projects.map((project) => (project.id === activeProjectId ? { ...project, activeStation: station } : project));
  persist();
  render();
}

function renderProjectControls() {
  const project = activeProject();
  normalizeProject(project);
  projectSelect.innerHTML = projects
    .map((item) => `<option value="${item.id}" ${item.id === project.id ? "selected" : ""}>${item.name}</option>`)
    .join("");
  stationSelect.innerHTML = project.stations
    .map((station) => `<option value="${station}" ${station === project.activeStation ? "selected" : ""}>${station}</option>`)
    .join("");

  document.querySelector("#projectTitle").textContent = project.name;
  document.querySelector("#projectStation").textContent = project.activeStation;
  document.querySelector("#projectPeriod").textContent = project.period;
  document.querySelector("#stationPill").textContent = project.name;
  document.querySelector("#damageProjectName").textContent = project.name;
  document.querySelector("#damageStation").textContent = project.activeStation;
  document.querySelector("#airtableStation").textContent = project.activeStation;
  document.querySelector("#billingProject").textContent = `${project.name} · ${project.period}`;

  const stations = [...new Set([...project.stations, ...damages.map((damage) => damage.station)])];
  document.querySelector("#stationList").innerHTML = stations
    .map((station) => {
      const count = projectDamages(project).filter((damage) => damage.station === station).length;
      const isInProject = project.stations.includes(station);
      return `
        <button type="button" class="station-button ${project.activeStation === station ? "selected" : ""}" data-station="${station}">
          <strong>${e(station)}</strong>
          <span>${isInProject ? `${count} im Projekt` : "hinzufügen"}</span>
        </button>
      `;
    })
    .join("");
}

function renderDashboard() {
  const project = activeProject();
  const rows = projectDamages(project);
  const done = rows.filter((damage) => damage.status === "Repariert").length;
  const open = rows.filter((damage) => !["Repariert", "Irreparabel"].includes(damage.status)).length;
  const parts = rows.filter((damage) => damage.partDecision || damage.orderStatus).length;
  const redOpen = rows.filter((damage) => damage.flagged && !["Repariert", "Irreparabel"].includes(damage.status)).length;
  const units = rows.reduce((sum, damage) => sum + Number(damage.units || 0), 0);
  const progress = rows.length ? Math.round((done / rows.length) * 100) : 0;
  const archived = rows.filter((damage) => !damage.sourceActive).length;
  const expenses = project.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const revenue = units * Number(project.ratePerUnit || 0);
  const profit = revenue;

  document.querySelector("#doneCount").textContent = done;
  document.querySelector("#unitCount").textContent = units;
  document.querySelector("#redOpenCount").textContent = redOpen;
  document.querySelector("#projectDamageCount").textContent = rows.length;
  document.querySelector("#sourceCount").textContent = sourceDamages(project).length;
  document.querySelector("#archiveCount").textContent = archived;
  document.querySelector("#progressText").textContent = `${progress}%`;
  document.querySelector("#progressBar").value = progress;
  document.querySelector("#billingUnits").textContent = units;
  document.querySelector("#billingRevenue").textContent = formatCurrency(revenue);
  document.querySelector("#billingExpenses").textContent = formatCurrency(expenses);
  document.querySelector("#billingProfit").textContent = formatCurrency(profit);
  document.querySelector("#invoiceSummary").innerHTML = `
    <div><span>Stationen</span><strong>${project.stations.join(" + ")}</strong></div>
    <div><span>Satz je Einheit</span><strong>${formatCurrency(project.ratePerUnit)}</strong></div>
    <div><span>Positionen</span><strong>${rows.length} Schäden</strong></div>
    <div><span>Rechnung gesamt</span><strong>${formatCurrency(revenue + expenses)}</strong></div>
  `;
  renderExpenseList(project);

  document.querySelector("#priorityList").innerHTML =
    rows
      .filter((damage) => damage.status !== "Repariert")
      .sort((a, b) => priorityScore(b) - priorityScore(a))
      .slice(0, 4)
      .map(
        (damage) => `
          <button type="button" class="priority-item" data-open-detail="${damage.id}">
            <span>${e(damage.plate)}</span>
            <strong>${e(damage.description)}</strong>
            <em>${e(damage.orderStatus || damage.status)}</em>
          </button>
        `,
      )
      .join("") || `<p class="empty-state">Alle Projektschäden sind abgearbeitet.</p>`;
}

function renderList() {
  const projectRows = filteredDamages();
  const sourceRows = filteredSourceDamages();
  const urgent = [...projectRows, ...sourceRows].filter((damage) => damage.rentability === "Not rentable").length;
  document.querySelector("#damageOverview").innerHTML = `
    <span>${projectRows.length} im Projekt</span>
    <span>${sourceRows.length} neu</span>
    <span>${urgent} zuerst</span>
  `;

  const rows = filteredDamages()
    .map(
      (damage) => `
        <button type="button" class="damage-row ${selectedId === damage.id ? "selected" : ""} ${damage.flagged ? "flagged" : ""}" data-damage-id="${damage.id}">
          <span class="status-dot ${statusType(damage.status)}"></span>
          <div>
            <strong>${e(damage.plate)} · ${e(damage.id)}</strong>
            <span>${e(damage.description)}</span>
            <small>${damage.sourceActive ? "CSV aktiv" : "im Projekt gesichert"} · ${rentabilityLabel(damage)} · ${hasParts(damage) ? "Teile nötig" : "keine Teile"}</small>
          </div>
          <em>${damage.units} E</em>
        </button>
      `,
    )
    .join("");

  damageList.innerHTML = rows || `<p class="empty-state">Keine Projektschäden gefunden.</p>`;
}

function renderSourceList() {
  const groups = [
    { key: "not-rentable-parts", title: "Nicht mietbar · Teile nötig", filter: (damage) => damage.rentability === "Not rentable" && hasParts(damage) },
    { key: "not-rentable-no-parts", title: "Nicht mietbar · keine Teile", filter: (damage) => damage.rentability === "Not rentable" && !hasParts(damage) },
    { key: "rentable-parts", title: "Rentable · Teile nötig", filter: (damage) => damage.rentability !== "Not rentable" && hasParts(damage) },
    { key: "rentable-no-parts", title: "Rentable · keine Teile", filter: (damage) => damage.rentability !== "Not rentable" && !hasParts(damage) },
  ];
  const rows = filteredSourceDamages().sort((a, b) => priorityScore(b) - priorityScore(a));
  const plateCounts = countByPlate(sourceDamages());

  sourceList.innerHTML =
    groups
      .map((group) => {
        const groupRows = rows.filter(group.filter);
        if (!groupRows.length) return "";
        return `
          <section class="source-group">
            <button type="button" class="source-group-head" data-toggle-source="${group.key}">
              <strong>${e(group.title)}</strong>
              <span>${groupRows.length}</span>
            </button>
            <div class="source-group-body ${collapsedSourceGroups.has(group.key) ? "collapsed" : ""}">
              ${groupRows
              .map(
                (damage) => `
                  <article class="source-item ${damage.flagged ? "flagged" : ""}">
                    <div>
                      <strong>${e(damage.plate)} · ${e(damage.id)}</strong>
                      <span>${e(damage.description)}</span>
                      <small>${e(rentabilityLabel(damage))} · ${e(hasParts(damage) ? damage.orderStatus || damage.partDecision : "keine Teile nötig")}${plateCounts.get(damage.plate) > 1 ? ` · ${plateCounts.get(damage.plate)} Schäden am Van` : ""}</small>
                    </div>
                    <div class="source-actions">
                      <button type="button" data-preview-damage="${damage.id}">Ansehen</button>
                      <button type="button" data-import-damage="${damage.id}">Übernehmen</button>
                    </div>
                  </article>
                `,
              )
              .join("")}
            </div>
          </section>
        `;
      })
      .join("") || `<p class="empty-state">Keine neuen CSV-Schäden für diese Station.</p>`;
}

function renderDetail() {
  const damage = damages.find((item) => item.id === selectedId) || projectDamages()[0];
  if (!damage) {
    damageDetail.innerHTML = `<p class="empty-state">Wähle zuerst einen Schaden aus dem Projekt.</p>`;
    return;
  }
  selectedId = damage.id;

  damageDetail.innerHTML = `
    <button class="secondary-button slim back-button" type="button" id="backToDamages">Zurück zu Schäden</button>
    <div class="section-head">
      <div>
        <p>${e(damage.plate)} · ${e(damage.id)}</p>
        <h2>${e(damage.description)}</h2>
      </div>
      <span class="status-badge ${statusType(damage.status)}">${damage.status}</span>
    </div>

    <div class="field-grid">
      <div><span>Modell</span><strong>${e(damage.model)}</strong></div>
      <div><span>Station</span><strong>${e(damage.station)}</strong></div>
      <div><span>Teile</span><strong>${e(damage.orderStatus || "keine")}</strong></div>
      <div><span>Priorität</span><strong>${rentabilityLabel(damage)}</strong></div>
    </div>

    ${renderPhotoLinks(damage)}

    <section class="ai-help">
      <strong>KI-Ersthilfe</strong>
      <p>${e(repairHelp(damage))}</p>
    </section>

    <label>
      Status
      <select id="detailStatus">
        ${["Offen", "Repariert", "Teilrepariert", "Irreparabel"].map((status) => `<option ${status === damage.status || (status === "Teilrepariert" && damage.status === "Partly repaired") ? "selected" : ""}>${status}</option>`).join("")}
      </select>
    </label>

    <label>
      Einheiten
      <div class="unit-stepper">
        <button type="button" data-unit="-1">-</button>
        <strong id="detailUnits">${damage.units}</strong>
        <button type="button" data-unit="1">+</button>
      </div>
    </label>

    <label>
      Kommentar
      <textarea id="detailComment" rows="5">${e(damage.comment || "")}</textarea>
    </label>

    <label>
      Needs Order Kommentar
      <textarea id="orderComment" rows="4" placeholder="Was soll die Firma bestellen? Seite, Position, Menge...">${e(damage.orderComment || "")}</textarea>
    </label>

    <div class="button-row detail-actions">
      ${isProjectDamage(damage.id) ? "" : `<button class="secondary-button" type="button" data-import-damage="${damage.id}">Ins Projekt übernehmen</button>`}
      <button class="primary-button" type="button" id="saveDetail">Schaden im Projekt sichern</button>
    </div>
  `;
}

function renderPhotoLinks(damage) {
  const photos = Array.isArray(damage.photos) ? damage.photos.filter(Boolean) : [];
  if (!photos.length) return `<p class="photo-note">Keine Foto-Links in diesem Datensatz.</p>`;
  return `
    <div class="photo-links">
      ${photos
    .map((url, index) => safeUrl(url))
    .filter(Boolean)
    .map((url, index) => `<a href="${url}" target="_blank" rel="noreferrer">Foto ${index + 1}</a>`)
        .join("")}
    </div>
  `;
}

function updateDamage(id, patch) {
  damages = damages.map((damage) => (damage.id === id ? { ...damage, ...patch } : damage));
  persist();
  render();
}

function importDamage(id) {
  const project = activeProject();
  const damage = damages.find((item) => item.id === id);
  projects = projects.map((item) => {
    if (item.id !== project.id || item.damageIds.includes(id)) return item;
    const stations = item.stations.includes(damage.station) ? item.stations : [...item.stations, damage.station];
    return { ...item, stations, activeStation: damage.station, damageIds: [...item.damageIds, id] };
  });
  selectedId = id;
  persist();
  setView("detail");
  showToast("Schaden ins Projekt übernommen");
}

function createManualDamage() {
  const project = activeProject();
  const plate = window.prompt("Kennzeichen", "");
  if (!plate) return;
  const description = window.prompt("Schadenbeschreibung", "");
  if (!description) return;
  const needsParts = window.confirm("Teile nötig / Needs Order?");
  const notRentable = window.confirm("Nicht mietbar / dringend rot markieren?");
  const id = `MAN-${Date.now()}`;
  const damage = {
    id,
    plate: plate.trim(),
    model: "Manuell",
    station: project.activeStation,
    description: description.trim(),
    status: "Offen",
    partDecision: needsParts ? "Part(s) Needed" : "",
    orderStatus: needsParts ? "Needs Order" : "",
    units: 0,
    warranty: "",
    comment: "",
    orderComment: "",
    sourceActive: false,
    rentability: notRentable ? "Not rentable" : "Rentable",
    flagged: notRentable,
    photos: [],
  };
  damages = [...damages, damage];
  projects = projects.map((item) => (item.id === project.id ? { ...item, damageIds: [...item.damageIds, id] } : item));
  selectedId = id;
  persist();
  setView("detail");
  showToast("Manueller Schaden angelegt");
}

function editProfile() {
  const name = window.prompt("Name / Firma", profile.name) || profile.name;
  const unitRate = Number(window.prompt("Verdienst je Einheit", String(profile.unitRate)) || profile.unitRate);
  const kilometer = Number(window.prompt("Kilometer-Satz", String(profile.expenseRates.Kilometer)) || profile.expenseRates.Kilometer);
  const spesen = Number(window.prompt("Spesen pro Tag/Eintrag", String(profile.expenseRates.Spesen)) || profile.expenseRates.Spesen);
  const fahrstunden = Number(window.prompt("Fahrstunden-Satz", String(profile.expenseRates.Fahrstunden)) || profile.expenseRates.Fahrstunden);
  profile = { ...profile, name, unitRate, expenseRates: { ...profile.expenseRates, Kilometer: kilometer, Spesen: spesen, Fahrstunden: fahrstunden } };
  projects = projects.map((project) => ({ ...project, ratePerUnit: unitRate }));
  persistProfile();
  persist();
  render();
  showToast("Profil gespeichert");
}

function addExpense() {
  const value = Number(expenseAmount.value || 0);
  if (!value) {
    showToast("Wert fehlt");
    return;
  }
  const project = activeProject();
  const rate = Number(profile.expenseRates[expenseType.value] || 0);
  const amount = rate && ["Kilometer", "Fahrstunden", "Spesen"].includes(expenseType.value) ? value * rate : value;
  projects = projects.map((item) =>
    item.id === project.id
      ? { ...item, expenses: [...item.expenses, { id: `E-${Date.now()}`, type: expenseType.value, amount, quantity: value, rate }] }
      : item,
  );
  expenseAmount.value = "";
  persist();
  render();
  showToast("Kosten hinzugefügt");
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value || 0));
}

function renderExpenseList(project = activeProject()) {
  const list = document.querySelector("#expenseList");
  list.innerHTML =
    project.expenses
      .map(
        (expense) => `
          <article class="expense-item">
            <div><strong>${e(expense.type)}</strong><span>${expense.quantity && expense.rate ? `${expense.quantity} x ${formatCurrency(expense.rate)} = ` : ""}${formatCurrency(expense.amount)}</span></div>
            <button type="button" data-delete-expense="${expense.id}">Löschen</button>
          </article>
        `,
      )
      .join("") || `<p class="empty-state">Noch keine Spesen/Kosten im Projekt.</p>`;
}

function exportDocument(type) {
  const project = activeProject();
  const rows = projectDamages(project);
  const units = rows.reduce((sum, damage) => sum + Number(damage.units || 0), 0);
  const expenses = project.expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const revenue = units * Number(project.ratePerUnit || profile.unitRate || 0);
  const note = localStorage.getItem(`${noteKey}:${activeProjectId}`) || invoiceNote.value.trim();
  const title = type === "report" ? `RS ${project.activeStation} Report ${project.period}` : `Rechnung ${project.name}`;
  const reportRows = rows
    .map(
      (damage) => `
        <tr>
          <td class="id">${e(damage.id)}</td>
          <td>${e(damage.plate)}</td>
          <td>${e(damage.description)}</td>
          <td>${e(damage.comment || "")}</td>
          <td>${e(damage.orderComment || damage.orderStatus || "")}</td>
          <td class="status ${statusType(damage.status)}">${e(damage.status)}</td>
          ${type === "invoice" ? `<td>${damage.units || 0}</td><td>${formatCurrency(Number(damage.units || 0) * Number(project.ratePerUnit || profile.unitRate || 0))}</td>` : ""}
        </tr>
      `,
    )
    .join("");
  const expenseRows = project.expenses
    .map((expense) => `<tr><td colspan="6">${e(expense.type)}</td><td>${e(expense.quantity || "")}</td><td>${formatCurrency(expense.amount)}</td></tr>`)
    .join("");
  const html = `
    <!doctype html>
    <html lang="de">
      <head>
        <meta charset="utf-8" />
        <title>${e(title)}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #111; margin: 34px; }
          h1 { text-align: center; font-size: 18px; font-weight: 500; margin: 0 0 18px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th { background: #c9c9c9; text-align: left; }
          th, td { border: 1px solid #aaa; padding: 6px; vertical-align: top; }
          td.id { background: #ddd; font-weight: 700; text-align: right; }
          .note { border: 1px solid #aaa; padding: 10px; margin: 0 0 16px; white-space: pre-wrap; }
          .status.done { background: #b9ec9a; }
          .status.blocked { background: #ff9c8c; }
          .status.partial { background: #fff99b; }
          .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; }
          .summary div { border: 1px solid #aaa; padding: 8px; }
          @media print { button { display: none; } body { margin: 18mm; } }
        </style>
      </head>
      <body>
        <button onclick="window.print()">PDF speichern / drucken</button>
        <h1>${e(title)}</h1>
        ${
          type === "invoice"
            ? `<section class="summary"><div>Einheiten<br><strong>${units}</strong></div><div>Verdienst<br><strong>${formatCurrency(revenue)}</strong></div><div>Auslagen<br><strong>${formatCurrency(expenses)}</strong></div><div>Rechnung gesamt<br><strong>${formatCurrency(revenue + expenses)}</strong></div></section>${note ? `<section class="note"><strong>Notiz fuer Rechnung</strong><br>${e(note)}</section>` : ""}`
            : ""
        }
        <table>
          <thead>
            <tr>
              <th>Damage ID</th><th>Plate</th><th>Damage</th><th>Comment</th><th>Needs Order</th><th>Status</th>${type === "invoice" ? "<th>Einheiten</th><th>Betrag</th>" : ""}
            </tr>
          </thead>
          <tbody>${reportRows}${type === "invoice" ? expenseRows : ""}</tbody>
        </table>
      </body>
    </html>
  `;
  const popup = window.open("", "_blank");
  if (!popup) {
    showToast("Popup blockiert");
    return;
  }
  popup.document.write(html);
  popup.document.close();
}

function createProject() {
  const name = window.prompt("Projektname", "London + Toulouse Reise");
  if (!name) return;
  const stationsInput = window.prompt("Stationen, mit Komma getrennt", "London, Toulouse");
  const stations = (stationsInput || "London")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const period = window.prompt("Zeitraum", "nächste Woche") || "offen";
  const rate = Number(window.prompt("Satz je Einheit", "95") || 95);
  const project = {
    id: `project-${Date.now()}`,
    name,
    stations,
    activeStation: stations[0],
    period,
    ratePerUnit: rate,
    damageIds: [],
    expenses: [],
  };
  projects = [...projects, project];
  activeProjectId = project.id;
  selectedId = undefined;
  persist();
  render();
  showToast("Projekt angelegt");
}

function editProject() {
  const project = activeProject();
  const name = window.prompt("Projektname", project.name);
  if (!name) return;
  const stations = (window.prompt("Stationen, mit Komma getrennt", project.stations.join(", ")) || project.stations.join(","))
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const period = window.prompt("Zeitraum", project.period) || project.period;
  const ratePerUnit = Number(window.prompt("Satz je Einheit", String(project.ratePerUnit)) || project.ratePerUnit);
  projects = projects.map((item) =>
    item.id === project.id ? { ...item, name, stations, activeStation: stations.includes(item.activeStation) ? item.activeStation : stations[0], period, ratePerUnit } : item,
  );
  persist();
  render();
  showToast("Projekt bearbeitet");
}

function deleteProject() {
  if (projects.length <= 1) {
    showToast("Ein Projekt muss bleiben");
    return;
  }
  const project = activeProject();
  if (!window.confirm(`${project.name} wirklich löschen? Die Schäden bleiben als Archivdaten erhalten.`)) return;
  projects = projects.filter((item) => item.id !== project.id);
  activeProjectId = projects[0].id;
  selectedId = projectDamages()[0]?.id;
  persist();
  render();
  showToast("Projekt gelöscht");
}

function render() {
  renderProjectControls();
  renderDashboard();
  renderList();
  renderSourceList();
  renderDetail();
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav-item");
  if (nav) setView(nav.dataset.view);

  const menuAction = event.target.closest("[data-menu-action]");
  if (menuAction) {
    appMenu.hidden = true;
    if (menuAction.dataset.menuAction === "profile") editProfile();
    if (menuAction.dataset.menuAction === "import") csvImportInput.click();
    if (menuAction.dataset.menuAction === "export") exportWorkCsv();
    if (menuAction.dataset.menuAction === "login") showToast("Login kommt später, CSV läuft ohne Konto");
    if (menuAction.dataset.menuAction === "logout") showToast("Abgemeldet auf diesem Gerät");
  }

  const station = event.target.closest("[data-station]");
  if (station) {
    const project = activeProject();
    if (!project.stations.includes(station.dataset.station)) {
      projects = projects.map((item) =>
        item.id === project.id ? { ...item, stations: [...item.stations, station.dataset.station], activeStation: station.dataset.station } : item,
      );
      persist();
      showToast("Station zum Projekt hinzugefügt");
    } else {
      setProjectStation(station.dataset.station);
    }
  }

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    activeFilter = filter.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("selected", button === filter));
    renderList();
  }

  const sourceFilter = event.target.closest("[data-source-filter]");
  if (sourceFilter) {
    activeSourceFilter = sourceFilter.dataset.sourceFilter;
    document.querySelectorAll("[data-source-filter]").forEach((button) => button.classList.toggle("selected", button === sourceFilter));
    renderList();
    renderSourceList();
  }

  const sourceToggle = event.target.closest("[data-toggle-source]");
  if (sourceToggle) {
    const key = sourceToggle.dataset.toggleSource;
    if (collapsedSourceGroups.has(key)) collapsedSourceGroups.delete(key);
    else collapsedSourceGroups.add(key);
    renderSourceList();
  }

  const row = event.target.closest("[data-damage-id], [data-open-detail]");
  if (row) {
    damageScrollY = window.scrollY;
    selectedId = row.dataset.damageId || row.dataset.openDetail;
    setView("detail");
  }

  const previewButton = event.target.closest("[data-preview-damage]");
  if (previewButton) {
    damageScrollY = window.scrollY;
    selectedId = previewButton.dataset.previewDamage;
    setView("detail");
  }

  const importButton = event.target.closest("[data-import-damage]");
  if (importButton) importDamage(importButton.dataset.importDamage);

  if (event.target.closest("#backToDamages")) setView("damages");

  const deleteExpense = event.target.closest("[data-delete-expense]");
  if (deleteExpense) {
    const project = activeProject();
    projects = projects.map((item) =>
      item.id === project.id ? { ...item, expenses: item.expenses.filter((expense) => expense.id !== deleteExpense.dataset.deleteExpense) } : item,
    );
    persist();
    render();
  }

  const step = event.target.closest("[data-unit]");
  if (step) {
    const damage = damages.find((item) => item.id === selectedId);
    const nextUnits = Math.max(0, Number(damage.units || 0) + Number(step.dataset.unit));
    updateDamage(selectedId, { units: nextUnits });
  }

  if (event.target.closest("#saveDetail")) {
    updateDamage(selectedId, {
      status: document.querySelector("#detailStatus").value,
      comment: document.querySelector("#detailComment").value.trim(),
      orderComment: document.querySelector("#orderComment").value.trim(),
      sourceActive: false,
    });
    showToast("Schaden im Projekt gesichert");
  }
});

projectSelect.addEventListener("change", () => setProject(projectSelect.value));
stationSelect.addEventListener("change", () => setProjectStation(stationSelect.value));
searchInput.addEventListener("input", () => {
  renderList();
  renderSourceList();
});
menuButton.addEventListener("click", () => {
  appMenu.hidden = !appMenu.hidden;
});
manualDamageButton.addEventListener("click", createManualDamage);
newProjectButton.addEventListener("click", createProject);
editProjectButton.addEventListener("click", editProject);
deleteProjectButton.addEventListener("click", deleteProject);
addExpenseButton.addEventListener("click", addExpense);
exportInvoiceButton.addEventListener("click", () => exportDocument("invoice"));
exportReportButton.addEventListener("click", () => exportDocument("report"));
importCsvButton.addEventListener("click", () => csvImportInput.click());
exportCsvButton.addEventListener("click", exportWorkCsv);
csvImportInput.addEventListener("change", () => {
  importCsvFile(csvImportInput.files[0]);
  csvImportInput.value = "";
});

saveInvoiceNote.addEventListener("click", () => {
  localStorage.setItem(`${noteKey}:${activeProjectId}`, invoiceNote.value.trim());
  showToast("Rechnungsnotiz gespeichert");
});

projectSelect.addEventListener("change", () => {
  invoiceNote.value = localStorage.getItem(`${noteKey}:${activeProjectId}`) || "";
});

todayLabel.textContent = todayText();
lastUpdate.textContent = currentTime();
invoiceNote.value = localStorage.getItem(`${noteKey}:${activeProjectId}`) || "";
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
