const storageKey = "camperfix:damage-state:v1";
const noteKey = "camperfix:invoice-note:v1";

const seedDamages = [
  {
    id: "D-1001",
    plate: "VAN-001",
    model: "Road House",
    vehicle: "DEMO-VIN-001",
    station: "Demo Station",
    description: "Safety net bar missing",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 1,
    warranty: "yes",
    comment: "",
  },
  {
    id: "D-1002",
    plate: "VAN-002",
    model: "Couple Cottage",
    vehicle: "DEMO-VIN-002",
    station: "Demo Station",
    description: "Drivers blind detached at bottom",
    status: "Offen",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 1,
    warranty: "yes",
    comment: "",
  },
  {
    id: "D-1003",
    plate: "VAN-003",
    model: "Family Finca",
    vehicle: "DEMO-VIN-003",
    station: "Demo Station",
    description: "Window out of place",
    status: "Offen",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "yes",
    comment: "",
  },
  {
    id: "D-1004",
    plate: "VAN-004",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "Water Tap leaking, kitchen area",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 3,
    warranty: "",
    comment: "",
  },
  {
    id: "D-1005",
    plate: "VAN-004",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "Water runs into the vehicle when it rains",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "",
    comment: "Geprueft, aktuell kein Wassereintritt erkennbar.",
  },
  {
    id: "D-1006",
    plate: "VAN-005",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "Pop up roof do not close from one side",
    status: "Irreparabel",
    partDecision: "Part(s) Needed",
    orderStatus: "Needs Order",
    units: 0,
    warranty: "",
    comment: "Antrieb auf einer Seite defekt, Teil erforderlich.",
  },
  {
    id: "D-1007",
    plate: "VAN-006",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "Water leaking under right rear bottom and inside of the car",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 2,
    warranty: "",
    comment: "",
  },
  {
    id: "D-1008",
    plate: "VAN-006",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "The step does not work",
    status: "Irreparabel",
    partDecision: "Part(s) Needed",
    orderStatus: "New step / motor",
    units: 0,
    warranty: "",
    comment: "",
  },
  {
    id: "D-1009",
    plate: "VAN-007",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "Roof window broken",
    status: "Partly repaired",
    partDecision: "Part(s) Needed",
    orderStatus: "New roof window",
    units: 1,
    warranty: "",
    comment: "Provisorisch abgedichtet.",
  },
  {
    id: "D-1010",
    plate: "VAN-008",
    model: "Campervan",
    vehicle: "Numbers-Schema",
    station: "Demo Station",
    description: "Door handle is broken",
    status: "Repariert",
    partDecision: "",
    orderStatus: "",
    units: 1,
    warranty: "",
    comment: "Mechanik eingestellt, Funktion wieder gegeben.",
  },
];

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-item");
const toast = document.querySelector("#toast");
const todayLabel = document.querySelector("#todayLabel");
const lastUpdate = document.querySelector("#lastUpdate");
const searchInput = document.querySelector("#searchInput");
const damageList = document.querySelector("#damageList");
const damageDetail = document.querySelector("#damageDetail");
const invoiceNote = document.querySelector("#invoiceNote");
const saveInvoiceNote = document.querySelector("#saveInvoiceNote");

let damages = loadDamages();
let selectedId = damages[0]?.id;
let activeFilter = "all";

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

function loadDamages() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return seedDamages;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : seedDamages;
  } catch {
    return seedDamages;
  }
}

function persist() {
  localStorage.setItem(storageKey, JSON.stringify(damages));
  lastUpdate.textContent = currentTime();
}

function statusType(status) {
  if (status === "Repariert") return "done";
  if (status === "Irreparabel") return "blocked";
  if (status === "Partly repaired") return "partial";
  return "open";
}

function filteredDamages() {
  const query = searchInput.value.trim().toLowerCase();
  return damages.filter((damage) => {
    const haystack = `${damage.id} ${damage.plate} ${damage.model} ${damage.description} ${damage.comment}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "open" && !["Repariert", "Irreparabel"].includes(damage.status)) ||
      (activeFilter === "parts" && Boolean(damage.partDecision || damage.orderStatus)) ||
      (activeFilter === "done" && damage.status === "Repariert");
    return matchesQuery && matchesFilter;
  });
}

function setView(viewName) {
  views.forEach((view) => view.classList.toggle("active", view.dataset.viewPanel === viewName));
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  if (viewName === "detail" && !selectedId) selectedId = damages[0]?.id;
  render();
}

function renderDashboard() {
  const done = damages.filter((damage) => damage.status === "Repariert").length;
  const open = damages.filter((damage) => !["Repariert", "Irreparabel"].includes(damage.status)).length;
  const parts = damages.filter((damage) => damage.partDecision || damage.orderStatus).length;
  const units = damages.reduce((sum, damage) => sum + Number(damage.units || 0), 0);
  const progress = Math.round((done / damages.length) * 100);

  document.querySelector("#openCount").textContent = open;
  document.querySelector("#doneCount").textContent = done;
  document.querySelector("#partsCount").textContent = parts;
  document.querySelector("#unitCount").textContent = units;
  document.querySelector("#progressText").textContent = `${progress}%`;
  document.querySelector("#progressBar").value = progress;
  document.querySelector("#billingUnits").textContent = units;
  document.querySelector("#billingExpenses").textContent = "0";
  document.querySelector("#billingKm").textContent = "0";
  document.querySelector("#billingHours").textContent = "0";

  const priority = damages
    .filter((damage) => damage.status !== "Repariert")
    .slice(0, 4)
    .map(
      (damage) => `
        <button type="button" class="priority-item" data-open-detail="${damage.id}">
          <span>${damage.plate}</span>
          <strong>${damage.description}</strong>
          <em>${damage.orderStatus || damage.status}</em>
        </button>
      `,
    )
    .join("");

  document.querySelector("#priorityList").innerHTML = priority;
}

function renderList() {
  const rows = filteredDamages()
    .map(
      (damage) => `
        <button type="button" class="damage-row ${selectedId === damage.id ? "selected" : ""}" data-damage-id="${damage.id}">
          <span class="status-dot ${statusType(damage.status)}"></span>
          <div>
            <strong>${damage.plate} · ${damage.id}</strong>
            <span>${damage.description}</span>
          </div>
          <em>${damage.units} E</em>
        </button>
      `,
    )
    .join("");

  damageList.innerHTML = rows || `<p class="empty-state">Keine Schäden gefunden.</p>`;
}

function renderDetail() {
  const damage = damages.find((item) => item.id === selectedId) || damages[0];
  if (!damage) return;
  selectedId = damage.id;

  damageDetail.innerHTML = `
    <div class="section-head">
      <div>
        <p>${damage.plate} · ${damage.id}</p>
        <h2>${damage.description}</h2>
      </div>
      <span class="status-badge ${statusType(damage.status)}">${damage.status}</span>
    </div>

    <div class="field-grid">
      <div><span>Modell</span><strong>${damage.model}</strong></div>
      <div><span>Station</span><strong>${damage.station}</strong></div>
      <div><span>Teile</span><strong>${damage.orderStatus || "keine"}</strong></div>
      <div><span>Warranty</span><strong>${damage.warranty || "-"}</strong></div>
    </div>

    <label>
      Status
      <select id="detailStatus">
        ${["Offen", "Repariert", "Partly repaired", "Irreparabel"].map((status) => `<option ${status === damage.status ? "selected" : ""}>${status}</option>`).join("")}
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
      <textarea id="detailComment" rows="5">${damage.comment || ""}</textarea>
    </label>

    <button class="primary-button" type="button" id="saveDetail">Schaden speichern</button>
  `;
}

function updateDamage(id, patch) {
  damages = damages.map((damage) => (damage.id === id ? { ...damage, ...patch } : damage));
  persist();
  render();
}

function render() {
  renderDashboard();
  renderList();
  renderDetail();
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest(".nav-item");
  if (nav) setView(nav.dataset.view);

  const filter = event.target.closest("[data-filter]");
  if (filter) {
    activeFilter = filter.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("selected", button === filter));
    renderList();
  }

  const row = event.target.closest("[data-damage-id], [data-open-detail]");
  if (row) {
    selectedId = row.dataset.damageId || row.dataset.openDetail;
    setView("detail");
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
    });
    showToast("Schaden gespeichert");
  }
});

searchInput.addEventListener("input", renderList);

saveInvoiceNote.addEventListener("click", () => {
  localStorage.setItem(noteKey, invoiceNote.value.trim());
  showToast("Rechnungsnotiz gespeichert");
});

todayLabel.textContent = todayText();
lastUpdate.textContent = currentTime();
invoiceNote.value = localStorage.getItem(noteKey) || "";
render();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
