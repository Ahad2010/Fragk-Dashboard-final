const NAV_ITEMS = [
  { label: "Dashboard", href: "dashboard.html", icon: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" },
  { label: "Matches", href: "matches.html", icon: "grid" },
  { label: "Performance", href: "performance.html", icon: "M4 20V10M12 20V4M20 20v-7" },
  { label: "Stats Analyzer", href: "stats-analyzer.html", icon: "target" },
  { label: "Players", href: "players.html", icon: "users" },
  { label: "Leaderboards", href: "leaderboards.html", icon: "trophy" },
  { label: "Analytics", href: "analytics.html", icon: "M4 20V10M12 20V4M20 20v-7" },
  { label: "Team", href: "team.html", icon: "shield" },
  { label: "Settings", href: "settings.html", icon: "gear" },
];

function iconSvg(name) {
  const wrap = (inner) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${inner}</svg>`;
  switch (name) {
    case "grid":
      return wrap('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>');
    case "target":
      return wrap('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>');
    case "users":
      return wrap('<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="9" r="2.5"/><path d="M22 20c0-2.8-2-5-5-5.5"/>');
    case "trophy":
      return wrap('<path d="M8 4h8v5a4 4 0 0 1-8 0V4Z"/><path d="M6 6H4a2 2 0 0 0 2 4M18 6h2a2 2 0 0 1-2 4"/><path d="M10 15h4v2h-4zM8 21h8l-1-4H9l-1 4Z"/>');
    case "shield":
      return wrap('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/>');
    case "gear":
      return wrap('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/>');
    default:
      return wrap(`<path d="${name}"/>`);
  }
}

function renderSidebar(activePage) {
  const items = NAV_ITEMS.map(
    (item) => `
    <li class="nav-item ${item.href === activePage ? "active" : ""}" onclick="location.href='${item.href}'">
      ${iconSvg(item.icon)} ${item.label}
    </li>`
  ).join("");

  return `
    <div class="sidebar-logo"><img src="assets/logo.png" alt="FRAGK" /></div>
    <ul class="nav-list">${items}</ul>
    <div class="card upgrade-card">
      <p style="font-weight:600;">Go Premium</p>
      <p class="text-muted" style="font-size:12px;">Unlock advanced stats, custom reports and much more.</p>
      <button class="btn btn-primary">Upgrade Now</button>
    </div>
  `;
}

function renderTopbarUserBits() {
  const user = AUTH.getUser();
  const name = user?.full_name || user?.email?.split("@")[0] || "Player";
  const avatarUrl = user?.avatar_url || null;
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return { name, avatarUrl, initials };
}

function renderTopbar(title, subtitle) {
  const { name, avatarUrl, initials } = renderTopbarUserBits();
  const avatarInner = avatarUrl ? `<img src="${avatarUrl}" alt="${name}" />` : initials;

  return `
    <div class="topbar-mobile">
      <button class="icon-btn" onclick="toggleMobileSidebar()">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <img src="assets/logo.png" alt="FRAGK" />
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="dropdown-wrap">
          <button class="icon-btn" onclick="toggleDropdown('notif-dd')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>
            <span class="badge-dot">3</span>
          </button>
          <div class="dropdown card" id="notif-dd" style="width:220px;"><a href="#">New personal best K/D</a><a href="#">Weekly report ready</a></div>
        </div>
        <div class="dropdown-wrap">
          <button class="profile-btn" onclick="toggleDropdown('profile-dd')">
            <span class="avatar-circle" style="width:28px;height:28px;">${avatarInner}</span>
          </button>
          <div class="dropdown card" id="profile-dd">
            <a href="settings.html">Edit Profile</a>
            <button onclick="handleLogout()">Logout</button>
          </div>
        </div>
      </div>
    </div>
    <div class="topbar topbar-desktop">
      <div>
        <h1>${title}</h1>
        ${subtitle ? `<p>${subtitle}</p>` : ""}
      </div>
      <div class="topbar-actions">
        <button class="btn btn-primary" onclick="location.href='stats-analyzer.html'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 9l5-5 5 5M12 4v13"/></svg>
          Upload Screenshot
        </button>
        <button class="btn btn-primary" onclick="openAddPlayerModal()">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
          Add Player
        </button>
        <div class="dropdown-wrap">
          <button class="icon-btn" onclick="toggleDropdown('notif-dd-desktop')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 8a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>
            <span class="badge-dot">3</span>
          </button>
          <div class="dropdown card" id="notif-dd-desktop" style="width:260px;">
            <p style="padding:10px 12px;border-bottom:1px solid var(--surface-border);font-weight:600;font-size:13px;">Notifications</p>
            <a href="#">New personal best K/D</a><a href="#">Weekly report ready</a><a href="#">Squad invite</a>
          </div>
        </div>
        <div class="dropdown-wrap">
          <button class="profile-btn" onclick="toggleDropdown('profile-dd-desktop')">
            <span class="avatar-circle">${avatarInner}</span>
            <span style="text-align:left;">
              <p style="margin:0;font-size:13px;font-weight:500;">${name}</p>
              <p style="margin:0;font-size:10px;color:var(--muted);">Pro Player</p>
            </span>
          </button>
          <div class="dropdown card" id="profile-dd-desktop">
            <a href="settings.html">Edit Profile</a>
            <a href="settings.html">Settings</a>
            <button onclick="handleLogout()" class="text-danger">Logout</button>
          </div>
        </div>
      </div>
    </div>
    <div class="topbar-mobile" style="border-top:1px solid var(--surface-border);padding-top:12px;">
      <div><h1 style="font-size:16px;">${title}</h1>${subtitle ? `<p style="font-size:12px;">${subtitle}</p>` : ""}</div>
    </div>
  `;
}

function toggleDropdown(id) {
  document.querySelectorAll(".dropdown.open").forEach((el) => {
    if (el.id !== id) el.classList.remove("open");
  });
  document.getElementById(id)?.classList.toggle("open");
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".dropdown-wrap")) {
    document.querySelectorAll(".dropdown.open").forEach((el) => el.classList.remove("open"));
  }
});

function toggleMobileSidebar() {
  document.querySelector(".sidebar")?.classList.toggle("mobile-open");
  document.querySelector(".mobile-backdrop")?.classList.toggle("open");
}

async function handleLogout() {
  await AUTH.signOut();
  window.location.href = "index.html";
}

// ---------------- Add Player modal (global — available on every page) ----------------
function playerRowHtml(n) {
  return `
    <div style="display:grid; grid-template-columns:1fr 120px; gap:8px; margin-bottom:14px;">
      <div>
        <label class="field-label" for="newPlayerName${n}">Player ${n} Name</label>
        <input class="input" id="newPlayerName${n}" type="text" placeholder="${n === 1 ? "Enter name" : "Optional"}" />
      </div>
      <div>
        <label class="field-label" for="newPlayerRole${n}">Role</label>
        <select class="input" id="newPlayerRole${n}">
          <option>IGL</option>
          <option>Fragger</option>
          <option>Support</option>
          <option>Entry Fragger</option>
        </select>
      </div>
    </div>`;
}

function renderAddPlayerModal() {
  return `
  <div class="modal-backdrop" id="addPlayerBackdrop">
    <div class="card modal-box" style="max-width:420px;">
      <button type="button" class="modal-close" onclick="closeAddPlayerModal()">&times;</button>
      <h3>Add Players</h3>
      <p class="modal-desc">Add up to 4 players to your team roster at once. Leave any name blank to skip it.</p>
      <div id="addPlayerError" class="form-error"></div>
      <form id="addPlayerForm">
        ${[1, 2, 3, 4].map(playerRowHtml).join("")}
        <button type="submit" class="btn btn-primary" style="width:100%;">Add Players</button>
      </form>
    </div>
  </div>`;
}

function openAddPlayerModal() {
  document.getElementById("addPlayerError")?.classList.remove("show");
  document.getElementById("addPlayerForm")?.reset();
  document.getElementById("addPlayerBackdrop")?.classList.add("open");
}

function closeAddPlayerModal() {
  document.getElementById("addPlayerBackdrop")?.classList.remove("open");
}

async function handleAddPlayerSubmit(e) {
  e.preventDefault();
  const errorBox = document.getElementById("addPlayerError");
  errorBox.classList.remove("show");

  const entries = [1, 2, 3, 4]
    .map((n) => ({
      name: document.getElementById(`newPlayerName${n}`).value.trim(),
      role: document.getElementById(`newPlayerRole${n}`).value,
    }))
    .filter((p) => p.name);

  if (entries.length === 0) {
    errorBox.textContent = "Enter at least one player name.";
    errorBox.classList.add("show");
    return;
  }

  const session = AUTH.getSession();
  const failures = [];

  for (const entry of entries) {
    try {
      const res = await fetch(`${API_URL}/api/team-players.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.token}` },
        body: JSON.stringify(entry),
      });
      const data = await res.json();
      if (!res.ok) failures.push(`${entry.name}: ${data.error || "could not be added"}`);
    } catch (err) {
      failures.push(`${entry.name}: ${err.message}`);
    }
  }

  if (failures.length) {
    errorBox.textContent = failures.join(" · ");
    errorBox.classList.add("show");
  } else {
    closeAddPlayerModal();
    document.getElementById("addPlayerForm").reset();
  }
}

function initShell(activePage, title, subtitle) {
  document.querySelector(".sidebar").innerHTML = renderSidebar(activePage);
  document.querySelector(".topbar-mount").innerHTML = renderTopbar(title, subtitle);

  if (!document.getElementById("addPlayerBackdrop")) {
    document.body.insertAdjacentHTML("beforeend", renderAddPlayerModal());
    document.getElementById("addPlayerBackdrop").addEventListener("click", (e) => {
      if (e.target.id === "addPlayerBackdrop") closeAddPlayerModal();
    });
    document.getElementById("addPlayerForm").addEventListener("submit", handleAddPlayerSubmit);
  }
}