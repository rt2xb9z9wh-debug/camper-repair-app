const damageStorageKey = "camperfix:damage-state:v2";
const projectStorageKey = "camperfix:project-state:v2";
const noteKey = "camperfix:invoice-note:v2";

const seedProjects = [
  {
    id: "project-nantes",
    name: "Nantes Reise",
    station: "Nantes",
    period: "28.06. - 04.07.2026",
    damageIds: ["D-1001", "D-1002", "D-1004", "D-1005", "D-1009"],
  },
  {
    id: "project-toulouse",
    name: "Toulouse Reise",
    station: "Toulouse",
    period: "08.07. - 11.07.2026",
    damageIds: ["D-2001", "D-2002", "D-2004"],
  },
  {
    id: "project-bordeaux",
    name: "Bordeaux Nacharbeit",
    station: "Bordeaux",
    period: "15.07. - 16.07.2026",
    damageIds: ["D-3001"],
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
    sourceActive: true,
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
    sourceActive: true,
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
    sourceActive: true,
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
    sourceActive: false,
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
    sourceActive: false,
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
    sourceActive: true,
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
    sourceActive: false,
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
    sourceActive: true,
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
    sourceActive: true,
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
    sourceActive: true,
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
    sourceActive: false,
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
    sourceActive: true,
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
    sourceActive: true,
  },
];

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-item");
const toast = document.querySelector("#toast");
const todayLabel = document.querySelector("#todayLabel");
const lastUpdate = document.querySelector("#lastUpdate");
const searchInput = document.querySelector("#searchInput");
const projectSelect = document.querySelector("#projectSelect");
const damageList = document.querySelector("#damageList");
const damageDetail = document.querySelector("#damageDetail");
const sourceList = document.querySelector("#sourceList");
const invoiceNote = document.querySelector("#invoiceNote");
const saveInvoiceNote = document.querySelector("#saveInvoiceNote");

let damages = loadArray(damageStorageKey, seedDamages);
let projects = loadArray(projectStorageKey, seedProjects);
let activeProjectId = projects[0]?.id;
let selectedId = activeProject()?.damageIds[0];
let activeFilter = "all";

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

function activeProject() {
  return projects.find((project) => project.id === activeProjectId) || projects[0];
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

function persist() {
  localStorage.setItem(damageStorageKey, JSON.stringify(damages));
  localStorage.setItem(projectStorageKey, JSON.stringify(projects));
  lastUpdate.textContent = currentTime();
}

function statusType(status) {
  if (status === "Repariert") return "done";
  if (status === "Irreparabel") return "blocked";
  if (status === "Partly repaired") return "partial";
  return "open";
}

function projectDamages(project = activeProject()) {
  return project.damageIds.map((id) => damages.find((damage) => damage.id === id)).filter(Boolean);
}

function sourceDamages(project = activeProject()) {
  return damages.filter((damage) => {
    return damage.station === project.station && damage.sourceActive && !project.damageIds.includes(damage.id);
  });
}

function filteredDamages() {
  const query = searchInput.value.trim().toLowerCase();
  return projectDamages().filter((damage) => {
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
  if (viewName === "detail" && !selectedId) selectedId = projectDamages()[0]?.id;
  render();
}

function setProject(projectId) {
  activeProjectId = projectId;
  selectedId = projectDamages()[0]?.id;
  searchInput.value = "";
  invoiceNote.value = localStorage.getItem(`${noteKey}:${activeProjectId}`) || "";
  activeFilter = "all";
  document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("selected", button.dataset.filter === "all"));
  render();
}

function renderProjectControls() {
  const project = activeProject();
  projectSelect.innerHTML = projects
    .map((item) => `<option value="${item.id}" ${item.id === project.id ? "selected" : ""}>${item.name} - ${item.station}</option>`)
    .join("");

  document.querySelector("#projectTitle").textContent = project.name;
  document.querySelector("#projectStation").textContent = project.station;
  document.querySelector("#projectPeriod").textContent = project.period;
  document.querySelector("#stationPill").textContent = project.station;
  document.querySelector("#damageProjectName").textContent = project.name;
  document.querySelector("#damageStation").textContent = project.station;
  document.querySelector("#airtableStation").textContent = project.station;
  document.querySelector("#billingProject").textContent = `${project.name} · ${project.period}`;

  const stations = [...new Set(projects.map((item) => item.station))];
  document.querySelector("#stationList").innerHTML = stations
    .map((station) => {
      const stationProject = projects.find((item) => item.station === station);
      const count = stationProject ? stationProject.damageIds.length : 0;
      return `
        <button type="button" class="station-button ${project.station === station ? "selected" : ""}" data-station="${station}">
          <strong>${station}</strong>
          <span>${count} Projektschäden</span>
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
  const units = rows.reduce((sum, damage) => sum + Number(damage.units || 0), 0);
  const progress = rows.length ? Math.round((done / rows.length) * 100) : 0;
  const archived = rows.filter((damage) => !damage.sourceActive).length;

  document.querySelector("#openCount").textContent = open;
  document.querySelector("#doneCount").textContent = done;
  document.querySelector("#partsCount").textContent = parts;
  document.querySelector("#unitCount").textContent = units;
  document.querySelector("#sourceCount").textContent = sourceDamages(project).length;
  document.querySelector("#archiveCount").textContent = archived;
  document.querySelector("#progressText").textContent = `${progress}%`;
  document.querySelector("#progressBar").value = progress;
  document.querySelector("#billingUnits").textContent = units;
  document.querySelector("#billingExpenses").textContent = "0";
  document.querySelector("#billingKm").textContent = "0";
  document.querySelector("#billingHours").textContent = "0";

  document.querySelector("#priorityList").innerHTML =
    rows
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
      .join("") || `<p class="empty-state">Alle Projektschäden sind abgearbeitet.</p>`;
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
            <small>${damage.sourceActive ? "Airtable aktiv" : "im Projekt gesichert"}</small>
          </div>
          <em>${damage.units} E</em>
        </button>
      `,
    )
    .join("");

  damageList.innerHTML = rows || `<p class="empty-state">Keine Projektschäden gefunden.</p>`;
}

function renderSourceList() {
  const rows = sourceDamages()
    .map(
      (damage) => `
        <article class="source-item">
          <div>
            <strong>${damage.plate} · ${damage.id}</strong>
            <span>${damage.description}</span>
          </div>
          <button type="button" data-import-damage="${damage.id}">Übernehmen</button>
        </article>
      `,
    )
    .join("");

  sourceList.innerHTML = rows || `<p class="empty-state">Keine neuen Airtable-Schäden für diese Station.</p>`;
}

function renderDetail() {
  const damage = damages.find((item) => item.id === selectedId) || projectDamages()[0];
  if (!damage) {
    damageDetail.innerHTML = `<p class="empty-state">Wähle zuerst einen Schaden aus dem Projekt.</p>`;
    return;
  }
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
      <div><span>Quelle</span><strong>${damage.sourceActive ? "Airtable" : "Projektarchiv"}</strong></div>
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

    <button class="primary-button" type="button" id="saveDetail">Schaden im Projekt sichern</button>
  `;
}

function updateDamage(id, patch) {
  damages = damages.map((damage) => (damage.id === id ? { ...damage, ...patch } : damage));
  persist();
  render();
}

function importDamage(id) {
  const project = activeProject();
  projects = projects.map((item) => {
    if (item.id !== project.id || item.damageIds.includes(id)) return item;
    return { ...item, damageIds: [...item.damageIds, id] };
  });
  selectedId = id;
  persist();
  setView("detail");
  showToast("Schaden ins Projekt übernommen");
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

  const station = event.target.closest("[data-station]");
  if (station) {
    const project = projects.find((item) => item.station === station.dataset.station);
    if (project) setProject(project.id);
  }

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

  const importButton = event.target.closest("[data-import-damage]");
  if (importButton) importDamage(importButton.dataset.importDamage);

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
      sourceActive: false,
    });
    showToast("Schaden im Projekt gesichert");
  }
});

projectSelect.addEventListener("change", () => setProject(projectSelect.value));
searchInput.addEventListener("input", renderList);

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
