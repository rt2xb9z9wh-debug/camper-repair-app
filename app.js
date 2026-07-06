const lastUpdate = document.querySelector("#lastUpdate");
const toast = document.querySelector("#toast");
const detailPanel = document.querySelector("#detailPanel");
const actionButtons = document.querySelectorAll(".action-card");
const navButtons = document.querySelectorAll(".nav-item");
const saveButton = document.querySelector("#saveDamage");
const syncButton = document.querySelector("#syncButton");
const todayLabel = document.querySelector("#todayLabel");
const areaSelect = document.querySelector("#areaSelect");
const statusSelect = document.querySelector("#statusSelect");
const storageKey = "camperfix:last-entry";

const actionContent = {
  damage: {
    title: "Schaden erfassen",
    badge: "Neu",
    area: "Seitenwand rechts",
    status: "Prüfen",
    toast: "Schaden lokal gespeichert",
  },
  photo: {
    title: "Fotodoku",
    badge: "12 Fotos",
    area: "Dach",
    status: "Demontage",
    toast: "Fotodoku vorbereitet",
  },
  parts: {
    title: "Materialliste",
    badge: "2 offen",
    area: "Heckklappe",
    status: "Spachteln",
    toast: "Materialliste aktualisiert",
  },
};

function currentTime() {
  return new Intl.DateTimeFormat("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
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

function setActive(buttons, activeButton) {
  buttons.forEach((button) => button.classList.toggle("active", button === activeButton));
}

function updateDetail(action) {
  const content = actionContent[action];
  detailPanel.querySelector(".panel-head h2").textContent = content.title;
  detailPanel.querySelector(".panel-head span").textContent = content.badge;
  areaSelect.value = content.area;
  statusSelect.value = content.status;
}

function selectedSeverity() {
  return document.querySelector(".segmented .selected").textContent.trim();
}

function saveEntry() {
  const activeAction = document.querySelector(".action-card.active").dataset.action;
  const entry = {
    action: activeAction,
    area: areaSelect.value,
    status: statusSelect.value,
    severity: selectedSeverity(),
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(storageKey, JSON.stringify(entry));
  lastUpdate.textContent = currentTime();
  showToast(actionContent[activeAction].toast);
}

function restoreEntry() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return;

  try {
    const entry = JSON.parse(saved);
    const actionButton = document.querySelector(`[data-action="${entry.action}"]`);
    if (actionButton) {
      setActive(actionButtons, actionButton);
      updateDetail(entry.action);
    }
    if (entry.area) areaSelect.value = entry.area;
    if (entry.status) statusSelect.value = entry.status;
    document.querySelectorAll(".segmented button").forEach((button) => {
      button.classList.toggle("selected", button.textContent.trim() === entry.severity);
    });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActive(actionButtons, button);
    updateDetail(button.dataset.action);
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActive(navButtons, button);
    showToast(`${button.textContent.trim()} geöffnet`);
  });
});

document.querySelectorAll(".segmented button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".segmented button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

saveButton.addEventListener("click", () => {
  saveEntry();
});

syncButton.addEventListener("click", () => {
  lastUpdate.textContent = currentTime();
  showToast("Daten synchronisiert");
});

lastUpdate.textContent = currentTime();
todayLabel.textContent = todayText();
restoreEntry();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
