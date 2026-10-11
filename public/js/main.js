// -----------------------------------------------------------------------------
// Lokshin Gigs — shared frontend utilities
// Compiled from src/ts/main.ts → public/js/main.js as a CLASSIC (non-module)
// script. All functions below are declared at the top level so they remain
// available on the global scope, which is required because inline <script>
// blocks in the (as-yet unmigrated) HTML pages call them by bare name:
// showAlert(...), apiPost(...), renderStars(...), etc.
//
// DO NOT introduce `export` or `import` in this file — that would make it an ES
// module and break every unmigrated page. See tsconfig `"module": "none"`.
// -----------------------------------------------------------------------------
// Dynamic API base — empty string means same server (local dev)
// Set window.API_BASE to your Render URL when deploying to Vercel
const API = (typeof window !== 'undefined' && window.API_BASE) ? window.API_BASE + '/api' : '/api';
function showAlert(msg, type = 'success') {
    document.querySelectorAll('.alert-float').forEach(e => e.remove());
    const d = document.createElement('div');
    d.className = `alert alert-${type} alert-dismissible fade show alert-float`;
    d.innerHTML = `${msg}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 4000);
}
async function getCurrentUser() {
    try {
        const r = await fetch(`${API}/auth/me`, { credentials: 'include' });
        const d = await r.json();
        return d.success ? d.user : null;
    }
    catch {
        return null;
    }
}
// FIX: use relative paths so they work regardless of how server is run
async function requireLogin(redirect = '/pages/login.html') {
    const u = await getCurrentUser();
    if (!u) {
        window.location.href = redirect;
        return null;
    }
    return u;
}
function renderStars(rating) {
    const n = Math.round(rating || 0);
    let h = '';
    for (let i = 1; i <= 5; i++)
        h += `<span class="${i <= n ? 'stars' : 'stars-empty'}">&#9733;</span>`;
    return h + ` <small class="text-muted">${parseFloat(String(rating || 0)).toFixed(1)}</small>`;
}
function formatDate(d) {
    return new Date(d).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatZAR(n) {
    return `R${parseFloat(String(n)).toFixed(2)}`;
}
function statusBadge(s) {
    const m = {
        'Open': 'badge-open',
        'In Progress': 'badge-progress',
        'Completed': 'badge-completed',
        'Cancelled': 'badge-cancelled'
    };
    return `<span class="${m[s] || 'badge bg-secondary'}">${s}</span>`;
}
async function apiPost(url, body) {
    const r = await fetch(`${API}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    return r.json();
}
async function apiPut(url, body) {
    const r = await fetch(`${API}${url}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    return r.json();
}
async function apiDelete(url) {
    const r = await fetch(`${API}${url}`, { method: 'DELETE', credentials: 'include' });
    return r.json();
}
// FIX: relative redirect path
async function logout() {
    await fetch(`${API}/auth/logout`, { method: 'POST', credentials: 'include' });
    window.location.href = '/pages/login.html';
}
async function loadCategories(selectId, allOption = false) {
    const r = await fetch(`${API}/categories`, { credentials: 'include' });
    const d = await r.json();
    const sel = document.getElementById(selectId);
    if (!sel || !d.success)
        return;
    sel.innerHTML = allOption
        ? '<option value="">All Categories</option>'
        : '<option value="">-- Select Category --</option>';
    d.categories.forEach((c) => {
        sel.innerHTML += `<option value="${c.CategoryID}">${c.CategoryName}</option>`;
    });
}
