// Auth via our own core PHP backend + MySQL (no Supabase involved).
// API_URL comes from js/config.js, loaded before this file.

const AUTH = {
  async signUp(email, password, fullName) {
    const res = await fetch(`${API_URL}/api/register.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Sign up failed");
    AUTH.saveSession(data);
    return data;
  },

  async signIn(email, password) {
    const res = await fetch(`${API_URL}/api/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");
    AUTH.saveSession(data);
    return data;
  },

  async signOut() {
    const session = AUTH.getSession();
    if (session?.token) {
      await fetch(`${API_URL}/api/logout.php`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.token}` },
      }).catch(() => {});
    }
    localStorage.removeItem("fragk_session");
  },

  saveSession(data) {
    localStorage.setItem("fragk_session", JSON.stringify({ token: data.token, user: data.user }));
  },

  getSession() {
    const raw = localStorage.getItem("fragk_session");
    return raw ? JSON.parse(raw) : null;
  },

  getUser() {
    return AUTH.getSession()?.user || null;
  },

  async refreshUser() {
    const session = AUTH.getSession();
    if (!session) return null;
    const res = await fetch(`${API_URL}/api/me.php`, {
      headers: { Authorization: `Bearer ${session.token}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    session.user = data.user;
    localStorage.setItem("fragk_session", JSON.stringify(session));
    return data.user;
  },

  async updateProfile(fullName) {
    const session = AUTH.getSession();
    const res = await fetch(`${API_URL}/api/update-profile.php`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.token}` },
      body: JSON.stringify({ fullName }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");
    session.user = data.user;
    localStorage.setItem("fragk_session", JSON.stringify(session));
    return data.user;
  },

  async uploadAvatar(file) {
    const session = AUTH.getSession();
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await fetch(`${API_URL}/api/upload-avatar.php`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.token}` },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Upload failed");

    session.user.avatar_url = data.avatar_url;
    localStorage.setItem("fragk_session", JSON.stringify(session));
    return data.avatar_url;
  },

  // Call this at the top of every protected page.
  requireAuth() {
    if (!AUTH.getSession()) {
      window.location.href = "index.html";
    }
  },
};
