/* =====================================================
   LOKSHIN GIGS — Admin Dashboard V2
   Immersive Marketplace Control Room
   Frontend controller with demo data fallback
   ===================================================== */

// =====================================================
// DEMO DATA — South African names, areas, realistic jobs
// =====================================================

const DEMO_STATS = {
  totalUsers: 1247,
  totalFreelancers: 523,
  totalJobs: 384,
  openJobs: 67,
  completedJobs: 289,
  inProgressJobs: 28,
  totalReviews: 1102
};

const DEMO_USERS = [
  { UserID: 1, FullName: 'Thabo Mokoena', Email: 'thabo.m@email.co.za', PhoneNumber: '072 345 6789', Role: 'Freelancer', Area: 'Soweto', CreatedAt: '2024-08-15T00:00:00', IsActive: true, Services: 'Plumbing, Electrical', CompletedJobs: 23, ActiveJobs: 2, Reviews: 18, Rating: 4.7, Verified: true },
  { UserID: 2, FullName: 'Lerato Ndlovu', Email: 'lerato.n@email.co.za', PhoneNumber: '083 456 7890', Role: 'Customer', Area: 'Kensington', CreatedAt: '2024-09-01T00:00:00', IsActive: true, Services: null, CompletedJobs: 8, ActiveJobs: 1, Reviews: 6, Rating: null, Verified: true },
  { UserID: 3, FullName: 'Sipho Dlamini', Email: 'sipho.d@email.co.za', PhoneNumber: '071 567 8901', Role: 'Freelancer', Area: 'Tembisa', CreatedAt: '2024-07-20T00:00:00', IsActive: true, Services: 'Gardening, Landscaping', CompletedJobs: 45, ActiveJobs: 3, Reviews: 32, Rating: 4.9, Verified: true },
  { UserID: 4, FullName: 'Nomsa Khumalo', Email: 'nomsa.k@email.co.za', PhoneNumber: '084 678 9012', Role: 'Customer', Area: 'Midrand', CreatedAt: '2024-10-05T00:00:00', IsActive: true, Services: null, CompletedJobs: 5, ActiveJobs: 0, Reviews: 4, Rating: null, Verified: true },
  { UserID: 5, FullName: 'Bongani Zulu', Email: 'bongani.z@email.co.za', PhoneNumber: '076 789 0123', Role: 'Freelancer', Area: 'Alexandra', CreatedAt: '2024-06-10T00:00:00', IsActive: false, Services: 'Painting, Tiling', CompletedJobs: 12, ActiveJobs: 0, Reviews: 8, Rating: 3.8, Verified: false },
  { UserID: 6, FullName: 'Ayanda Mthembu', Email: 'ayanda.m@email.co.za', PhoneNumber: '082 890 1234', Role: 'Freelancer', Area: 'Diepsloot', CreatedAt: '2024-11-12T00:00:00', IsActive: true, Services: 'Cleaning, Laundry', CompletedJobs: 67, ActiveJobs: 4, Reviews: 51, Rating: 4.8, Verified: true },
  { UserID: 7, FullName: 'Zanele Nkosi', Email: 'zanele.n@email.co.za', PhoneNumber: '079 901 2345', Role: 'Customer', Area: 'Randburg', CreatedAt: '2024-08-28T00:00:00', IsActive: true, Services: null, CompletedJobs: 12, ActiveJobs: 2, Reviews: 10, Rating: null, Verified: true },
  { UserID: 8, FullName: 'Mandla Sithole', Email: 'mandla@lokshin.co.za', PhoneNumber: '073 012 3456', Role: 'Admin', Area: 'Johannesburg CBD', CreatedAt: '2024-01-01T00:00:00', IsActive: true, Services: null, CompletedJobs: 0, ActiveJobs: 0, Reviews: 0, Rating: null, Verified: true },
  { UserID: 9, FullName: 'Palesa Molefe', Email: 'palesa.m@email.co.za', PhoneNumber: '081 123 4567', Role: 'Freelancer', Area: 'Roodepoort', CreatedAt: '2024-09-18T00:00:00', IsActive: true, Services: 'Cooking, Catering', CompletedJobs: 31, ActiveJobs: 1, Reviews: 24, Rating: 4.6, Verified: true },
  { UserID: 10, FullName: 'Tshepo Mahlangu', Email: 'tshepo.m@email.co.za', PhoneNumber: '085 234 5678', Role: 'Customer', Area: 'Centurion', CreatedAt: '2024-10-22T00:00:00', IsActive: true, Services: null, CompletedJobs: 3, ActiveJobs: 1, Reviews: 2, Rating: null, Verified: false }
];

const DEMO_JOBS = [
  { JobID: 101, Title: 'Garden maintenance', CategoryName: 'Landscaping', CustomerName: 'Lerato Ndlovu', Area: 'Tembisa', Budget: 450, Status: 'Open', PostedAt: '2025-01-10T00:00:00' },
  { JobID: 102, Title: 'Plumbing repair', CategoryName: 'Plumbing', CustomerName: 'Zanele Nkosi', Area: 'Randburg', Budget: 800, Status: 'In Progress', PostedAt: '2025-01-08T00:00:00' },
  { JobID: 103, Title: 'Deep house cleaning', CategoryName: 'Cleaning', CustomerName: 'Nomsa Khumalo', Area: 'Midrand', Budget: 350, Status: 'Completed', PostedAt: '2025-01-05T00:00:00' },
  { JobID: 104, Title: 'Electrical wiring repair', CategoryName: 'Electrical', CustomerName: 'Tshepo Mahlangu', Area: 'Centurion', Budget: 1200, Status: 'Open', PostedAt: '2025-01-12T00:00:00' },
  { JobID: 105, Title: 'Interior wall painting', CategoryName: 'Painting', CustomerName: 'Lerato Ndlovu', Area: 'Kensington', Budget: 2500, Status: 'In Progress', PostedAt: '2025-01-03T00:00:00' },
  { JobID: 106, Title: 'Roof leak repair', CategoryName: 'Construction', CustomerName: 'Zanele Nkosi', Area: 'Randburg', Budget: 3800, Status: 'Open', PostedAt: '2025-01-11T00:00:00' },
  { JobID: 107, Title: 'Weekly pool maintenance', CategoryName: 'Pool Services', CustomerName: 'Nomsa Khumalo', Area: 'Midrand', Budget: 600, Status: 'Completed', PostedAt: '2024-12-28T00:00:00' },
  { JobID: 108, Title: 'Precast fence installation', CategoryName: 'Fencing', CustomerName: 'Tshepo Mahlangu', Area: 'Centurion', Budget: 4500, Status: 'Open', PostedAt: '2025-01-13T00:00:00' },
  { JobID: 109, Title: 'Braai area paving', CategoryName: 'Landscaping', CustomerName: 'Lerato Ndlovu', Area: 'Kensington', Budget: 5200, Status: 'Open', PostedAt: '2025-01-14T00:00:00' },
  { JobID: 110, Title: 'Geyser replacement', CategoryName: 'Plumbing', CustomerName: 'Zanele Nkosi', Area: 'Randburg', Budget: 7800, Status: 'In Progress', PostedAt: '2025-01-09T00:00:00' }
];

const AI_RESPONSES = {
  'open jobs': 'There are currently <strong>5 open jobs</strong> awaiting freelancer assignment. The highest-value listing is <strong>Braai area paving</strong> in Kensington at R5,200. Centurion and Randburg have the most open listings.',
  'active freelancers': 'Currently <strong>4 active freelancers</strong> on the platform. Top performer: <strong>Ayanda Mthembu</strong> (Diepsloot) with 67 completed jobs and a 4.8 rating. Sipho Dlamini follows with 45 completed jobs and 4.9 rating.',
  'suspended users': 'There is <strong>1 suspended user</strong>: <strong>Bongani Zulu</strong> (Freelancer, Alexandra) — verification expired. 12 completed jobs, 3.8 rating. Consider reaching out for re-verification.',
  'longest jobs': 'The longest-running open jobs are:<br>1. <strong>Braai area paving</strong> — Kensington (posted 14 Jan)<br>2. <strong>Precast fence installation</strong> — Centurion (posted 13 Jan)<br>3. <strong>Electrical wiring repair</strong> — Centurion (posted 12 Jan)<br><br>Consider notifying freelancers in those areas.'
};

const AVATAR_COLORS = ['#B65A3C', '#5B7A5F', '#4A6E8A', '#C4922A', '#7F7669', '#8B6F4E', '#6B5B73', '#4C7A6F'];


// =====================================================
// STATE
// =====================================================

let currentView = 'overview';
let allUsers = [];
let allJobs = [];
let currentJobFilter = 'all';
let currentJobViewMode = 'list';
let isDemo = false;
let jobControlsReady = false;

// Preview mode — active on file:// or when URL contains ?preview=1
var isPreview = (function() {
  if (window.location.protocol === 'file:') return true;
  try { if (new URLSearchParams(window.location.search).get('preview') === '1') return true; } catch(e) {}
  return false;
})();


// =====================================================
// OVERRIDE showAlert — replaces Bootstrap-dependent version from main.js
// =====================================================

window.showAlert = function(msg, type) {
  type = type || 'success';
  document.querySelectorAll('.lk-toast').forEach(function(el) {
    el.classList.add('removing');
    setTimeout(function() { el.remove(); }, 300);
  });
  var toast = document.createElement('div');
  toast.className = 'lk-toast lk-toast--' + type;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(function() {
    toast.classList.add('removing');
    setTimeout(function() { toast.remove(); }, 300);
  }, 3500);
};


// =====================================================
// INIT
// =====================================================

async function init() {
  // Preview mode — skip authentication entirely
  if (isPreview) {
    console.log('Preview mode active — authentication bypassed');
    isDemo = true;
    injectPreviewBadge();
  } else {
    // Live mode — require admin authentication
    try {
      var user = await requireLogin();
      if (!user || user.role !== 'Admin') {
        window.location.href = '/pages/login.html';
        return;
      }
    } catch (e) {
      console.log('Auth unavailable, running in demo mode');
      isDemo = true;
    }
  }

  setupNavigation();
  setupMobileDrawer();
  setupAssist();
  setupWorkspacePeriod();

  loadStats();

  // Render workspace after layout settles
  requestAnimationFrame(function() {
    setTimeout(renderWorkspace, 120);
  });
}


// =====================================================
// NAVIGATION — floating nav, hero pills, mobile drawer
// =====================================================

function setupNavigation() {
  // Floating nav items
  document.querySelectorAll('.lk-float-nav__item[data-view]').forEach(function(item) {
    item.addEventListener('click', function() { switchView(item.dataset.view); });
  });

  // Hero pills
  document.querySelectorAll('.lk-pill[data-view]').forEach(function(pill) {
    pill.addEventListener('click', function() { switchView(pill.dataset.view); });
  });

  // Mobile drawer nav
  document.querySelectorAll('.lk-mob-drawer__nav button[data-view]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      switchView(btn.dataset.view);
      closeDrawer();
    });
  });
}

function switchView(viewName) {
  currentView = viewName;

  // Update floating nav — toggle active state + icon weight (ph ↔ ph-bold)
  document.querySelectorAll('.lk-float-nav__item[data-view]').forEach(function(item) {
    var active = item.dataset.view === viewName;
    item.classList.toggle('active', active);
    var icon = item.querySelector('i');
    if (icon) {
      var cls = icon.className.replace(/ph-bold|ph/, '').trim();
      icon.className = (active ? 'ph-bold ' : 'ph ') + cls;
    }
  });

  // Update hero pills
  document.querySelectorAll('.lk-pill[data-view]').forEach(function(pill) {
    pill.classList.toggle('active', pill.dataset.view === viewName);
  });

  // Update mobile drawer nav
  document.querySelectorAll('.lk-mob-drawer__nav button[data-view]').forEach(function(btn) {
    var active = btn.dataset.view === viewName;
    btn.classList.toggle('active', active);
    var icon = btn.querySelector('i');
    if (icon) {
      var cls = icon.className.replace(/ph-bold|ph/, '').trim();
      icon.className = (active ? 'ph-bold ' : 'ph ') + cls;
    }
  });

  // Show/hide views
  document.querySelectorAll('.lk-view').forEach(function(v) {
    v.classList.remove('lk-view--active');
  });
  var target = document.getElementById('view-' + viewName);
  if (target) target.classList.add('lk-view--active');

  // Load data when entering views
  if (viewName === 'users') loadUsers();
  if (viewName === 'jobs') loadAdminJobs();
}


// =====================================================
// MOBILE DRAWER
// =====================================================

function setupMobileDrawer() {
  var menuBtn = document.getElementById('mobMenuBtn');
  var closeBtn = document.getElementById('mobDrawerClose');
  var drawer = document.getElementById('mobDrawer');

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.addEventListener('click', function(e) {
      if (e.target === drawer) closeDrawer();
    });
  }
}

function openDrawer() {
  var d = document.getElementById('mobDrawer');
  if (d) d.classList.add('open');
}

function closeDrawer() {
  var d = document.getElementById('mobDrawer');
  if (d) d.classList.remove('open');
}


// =====================================================
// STATS & INFO CARDS
// =====================================================

async function loadStats() {
  var stats = null;

  try {
    var res = await fetch('/api/admin/stats');
    var data = await res.json();
    if (data.success) {
      stats = data.stats;
    }
  } catch (e) {
    // API unavailable
  }

  if (!stats) {
    isDemo = true;
    stats = DEMO_STATS;
  }

  // Info card 1: Active listings (open jobs)
  animateValue('icActivity', stats.openJobs || 0);

  // Info card 2: Avg job value
  var avgBudget = stats.avgBudget || 2450;
  animateValue('icValue', avgBudget, 'R');

  // Info card 3: Completion rate
  var total = (stats.completedJobs || 0) + (stats.openJobs || 0) + (stats.inProgressJobs || 0);
  var rate = total > 0 ? Math.round(((stats.completedJobs || 0) / total) * 100) : 0;
  animateValue('icHealth', rate, '', '%');

  // Review count for reviews view
  animateValue('reviewCount', stats.totalReviews || 0);

  // Render info card visual elements
  renderCardBars();
  renderCardLine();
  renderCardArc(rate);

  // Update preview labels when using live data
  if (!isDemo) {
    document.querySelectorAll('.lk-info-card__sub').forEach(function(el) {
      el.textContent = 'LIVE DATA';
    });
  }
}


// =====================================================
// INFO CARD VISUALS
// =====================================================

function renderCardBars() {
  var container = document.getElementById('icBars');
  if (!container) return;

  var values = [0.4, 0.7, 0.55, 0.85, 0.6, 0.75, 0.9];
  container.innerHTML = values.map(function(v, i) {
    var h = Math.round(v * 28);
    var color = i === values.length - 1 ? 'var(--lk-terra)' : 'var(--lk-border-str)';
    return '<div style="width:4px;height:' + h + 'px;border-radius:2px;background:' + color + ';transition:height .6s ease ' + (i * 60) + 'ms"></div>';
  }).join('');
}

function renderCardLine() {
  var container = document.getElementById('icLine');
  if (!container) return;

  var ns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 120 32');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.display = 'block';

  var points = [28, 22, 25, 18, 20, 12, 15, 8];
  var step = 120 / (points.length - 1);

  // Gradient fill
  var defs = document.createElementNS(ns, 'defs');
  var grad = document.createElementNS(ns, 'linearGradient');
  grad.id = 'lcGrad';
  grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '0'); grad.setAttribute('y2', '1');
  var s1 = document.createElementNS(ns, 'stop');
  s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#5B7A5F'); s1.setAttribute('stop-opacity', '0.15');
  var s2 = document.createElementNS(ns, 'stop');
  s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#5B7A5F'); s2.setAttribute('stop-opacity', '0');
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad);
  svg.appendChild(defs);

  // Area
  var areaD = 'M0,32 ';
  points.forEach(function(y, i) { areaD += 'L' + (i * step).toFixed(1) + ',' + y + ' '; });
  areaD += 'L' + ((points.length - 1) * step).toFixed(1) + ',32 Z';
  var area = document.createElementNS(ns, 'path');
  area.setAttribute('d', areaD);
  area.setAttribute('fill', 'url(#lcGrad)');
  svg.appendChild(area);

  // Line
  var d = points.map(function(y, i) {
    return (i === 0 ? 'M' : 'L') + (i * step).toFixed(1) + ',' + y;
  }).join(' ');
  var line = document.createElementNS(ns, 'path');
  line.setAttribute('d', d);
  line.setAttribute('fill', 'none');
  line.setAttribute('stroke', '#5B7A5F');
  line.setAttribute('stroke-width', '2');
  line.setAttribute('stroke-linecap', 'round');
  line.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(line);

  container.innerHTML = '';
  container.appendChild(svg);
}

function renderCardArc(percent) {
  var container = document.getElementById('icArc');
  if (!container) return;

  var ns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 120 32');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.display = 'block';

  var cx = 60, cy = 30, r = 24;
  var startAngle = Math.PI;

  // Background arc (full half-circle)
  var bgEnd = 2 * Math.PI;
  var bgD = describeArc(cx, cy, r, startAngle, bgEnd);
  var bgPath = document.createElementNS(ns, 'path');
  bgPath.setAttribute('d', bgD);
  bgPath.setAttribute('fill', 'none');
  bgPath.setAttribute('stroke', '#E8DFCE');
  bgPath.setAttribute('stroke-width', '3');
  bgPath.setAttribute('stroke-linecap', 'round');
  svg.appendChild(bgPath);

  // Progress arc
  var pct = Math.max(1, Math.min(percent, 100));
  var endAngle = startAngle + (Math.PI * pct / 100);
  var progD = describeArc(cx, cy, r, startAngle, endAngle);
  var progPath = document.createElementNS(ns, 'path');
  progPath.setAttribute('d', progD);
  progPath.setAttribute('fill', 'none');
  progPath.setAttribute('stroke', '#B65A3C');
  progPath.setAttribute('stroke-width', '3');
  progPath.setAttribute('stroke-linecap', 'round');
  svg.appendChild(progPath);

  container.innerHTML = '';
  container.appendChild(svg);
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  var x1 = cx + r * Math.cos(startAngle);
  var y1 = cy + r * Math.sin(startAngle);
  var x2 = cx + r * Math.cos(endAngle);
  var y2 = cy + r * Math.sin(endAngle);
  var largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;
  return 'M ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' A ' + r + ' ' + r + ' 0 ' + largeArc + ' 1 ' + x2.toFixed(2) + ' ' + y2.toFixed(2);
}


// =====================================================
// MARKETPLACE WORKSPACE — Abstract activity visualisation
// =====================================================

function renderWorkspace() {
  var container = document.getElementById('workspaceCanvas');
  if (!container) return;

  var rect = container.getBoundingClientRect();
  var W = rect.width || 800;
  var H = rect.height || 300;

  if (W < 10 || H < 10) return; // container not visible yet

  var ns = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.display = 'block';

  // Defs — glow filter for active nodes
  var defs = document.createElementNS(ns, 'defs');
  var filter = document.createElementNS(ns, 'filter');
  filter.id = 'nodeGlow';
  filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-50%');
  filter.setAttribute('width', '200%'); filter.setAttribute('height', '200%');
  var blur = document.createElementNS(ns, 'feGaussianBlur');
  blur.setAttribute('stdDeviation', '3'); blur.setAttribute('result', 'blur');
  var merge = document.createElementNS(ns, 'feMerge');
  var m1 = document.createElementNS(ns, 'feMergeNode'); m1.setAttribute('in', 'blur');
  var m2 = document.createElementNS(ns, 'feMergeNode'); m2.setAttribute('in', 'SourceGraphic');
  merge.appendChild(m1); merge.appendChild(m2);
  filter.appendChild(blur); filter.appendChild(merge);
  defs.appendChild(filter);
  svg.appendChild(defs);

  // Subtle grid
  var x, y, gridLine;
  for (x = 40; x < W; x += 80) {
    gridLine = document.createElementNS(ns, 'line');
    gridLine.setAttribute('x1', x); gridLine.setAttribute('y1', 0);
    gridLine.setAttribute('x2', x); gridLine.setAttribute('y2', H);
    gridLine.setAttribute('stroke', '#E8E5DF'); gridLine.setAttribute('stroke-width', '0.5');
    gridLine.setAttribute('stroke-dasharray', '4 8');
    svg.appendChild(gridLine);
  }
  for (y = 40; y < H; y += 60) {
    gridLine = document.createElementNS(ns, 'line');
    gridLine.setAttribute('x1', 0); gridLine.setAttribute('y1', y);
    gridLine.setAttribute('x2', W); gridLine.setAttribute('y2', y);
    gridLine.setAttribute('stroke', '#E8E5DF'); gridLine.setAttribute('stroke-width', '0.5');
    gridLine.setAttribute('stroke-dasharray', '4 8');
    svg.appendChild(gridLine);
  }

  // Activity nodes — marketplace areas
  var nodes = [
    { x: W * 0.10, y: H * 0.35, r: 8,  status: 'active',    label: 'Soweto',     count: 12 },
    { x: W * 0.22, y: H * 0.58, r: 10, status: 'active',    label: 'Diepsloot',  count: 8  },
    { x: W * 0.16, y: H * 0.78, r: 6,  status: 'completed', label: 'Alexandra',  count: 4  },
    { x: W * 0.36, y: H * 0.28, r: 12, status: 'active',    label: 'Tembisa',    count: 15 },
    { x: W * 0.44, y: H * 0.65, r: 7,  status: 'progress',  label: 'Midrand',    count: 6  },
    { x: W * 0.55, y: H * 0.22, r: 9,  status: 'active',    label: 'Randburg',   count: 9  },
    { x: W * 0.62, y: H * 0.50, r: 11, status: 'active',    label: 'JHB CBD',    count: 14 },
    { x: W * 0.74, y: H * 0.32, r: 8,  status: 'completed', label: 'Centurion',  count: 7  },
    { x: W * 0.80, y: H * 0.72, r: 6,  status: 'progress',  label: 'Roodepoort', count: 5  },
    { x: W * 0.90, y: H * 0.44, r: 10, status: 'active',    label: 'Kensington', count: 11 }
  ];

  var statusColors = {
    active: '#B65A3C',
    completed: '#5B7A5F',
    progress: '#C4922A'
  };

  // Connection lines between nearby areas
  var connections = [
    [0, 1], [0, 2], [1, 3], [1, 4], [3, 5], [4, 6], [5, 6], [5, 7], [6, 8], [7, 9], [6, 9], [3, 6]
  ];

  connections.forEach(function(pair) {
    var a = nodes[pair[0]], b = nodes[pair[1]];
    var line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);
    line.setAttribute('stroke', '#D8CCB5');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('opacity', '0.45');
    svg.appendChild(line);
  });

  // Render each node
  nodes.forEach(function(node, i) {
    var g = document.createElementNS(ns, 'g');

    // Pulse ring for active nodes
    if (node.status === 'active') {
      var pulse = document.createElementNS(ns, 'circle');
      pulse.setAttribute('cx', node.x); pulse.setAttribute('cy', node.y);
      pulse.setAttribute('r', node.r + 4);
      pulse.setAttribute('fill', 'none');
      pulse.setAttribute('stroke', statusColors[node.status]);
      pulse.setAttribute('stroke-width', '1');
      pulse.setAttribute('opacity', '0.3');
      pulse.style.animation = 'pulse 3s ease-in-out ' + (i * 0.4) + 's infinite';
      g.appendChild(pulse);
    }

    // Main circle
    var circle = document.createElementNS(ns, 'circle');
    circle.setAttribute('cx', node.x); circle.setAttribute('cy', node.y);
    circle.setAttribute('r', node.r);
    circle.setAttribute('fill', statusColors[node.status]);
    circle.setAttribute('opacity', '0.85');
    if (node.status === 'active') {
      circle.setAttribute('filter', 'url(#nodeGlow)');
      circle.style.animation = 'nodeGlow 4s ease-in-out ' + (i * 0.3) + 's infinite';
    }
    g.appendChild(circle);

    // Inner white dot
    var inner = document.createElementNS(ns, 'circle');
    inner.setAttribute('cx', node.x); inner.setAttribute('cy', node.y);
    inner.setAttribute('r', Math.max(2, node.r * 0.35));
    inner.setAttribute('fill', '#fff');
    inner.setAttribute('opacity', '0.9');
    g.appendChild(inner);

    // Area label above node
    var label = document.createElementNS(ns, 'text');
    label.setAttribute('x', node.x); label.setAttribute('y', node.y - node.r - 8);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('fill', '#4C463D');
    label.setAttribute('font-size', '10');
    label.setAttribute('font-weight', '600');
    label.setAttribute('font-family', 'Manrope, sans-serif');
    label.textContent = node.label;
    g.appendChild(label);

    // Count badge
    var cw = node.count > 9 ? 22 : 16;
    var countBg = document.createElementNS(ns, 'rect');
    countBg.setAttribute('x', node.x + node.r + 2); countBg.setAttribute('y', node.y - 7);
    countBg.setAttribute('width', cw); countBg.setAttribute('height', 14);
    countBg.setAttribute('rx', '4');
    countBg.setAttribute('fill', '#1F1B16');

    var countTxt = document.createElementNS(ns, 'text');
    countTxt.setAttribute('x', node.x + node.r + 2 + cw / 2); countTxt.setAttribute('y', node.y + 3);
    countTxt.setAttribute('text-anchor', 'middle');
    countTxt.setAttribute('fill', '#fff');
    countTxt.setAttribute('font-size', '9');
    countTxt.setAttribute('font-weight', '700');
    countTxt.setAttribute('font-family', 'Manrope, sans-serif');
    countTxt.textContent = node.count;

    g.appendChild(countBg);
    g.appendChild(countTxt);

    svg.appendChild(g);
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

function setupWorkspacePeriod() {
  document.querySelectorAll('.lk-workspace__period button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.lk-workspace__period button').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      renderWorkspace();
    });
  });
}


// =====================================================
// USERS
// =====================================================

async function loadUsers() {
  var tbody = document.getElementById('usersBody');
  if (!tbody) return;

  try {
    var res = await fetch('/api/admin/users');
    var data = await res.json();
    if (data.success) {
      allUsers = data.users.map(function(u) {
        return Object.assign({}, u, {
          Area: u.Area || '--',
          Services: u.Services || null,
          CompletedJobs: u.CompletedJobs || 0,
          ActiveJobs: u.ActiveJobs || 0,
          Reviews: u.Reviews || 0,
          Rating: u.Rating || null,
          Verified: u.Verified !== undefined ? u.Verified : true
        });
      });
      renderUsers(allUsers);
      return;
    }
  } catch (e) {
    // API unavailable
  }

  // Demo fallback
  allUsers = DEMO_USERS;
  renderUsers(allUsers);
}

function renderUsers(users) {
  var tbody = document.getElementById('usersBody');
  var countEl = document.getElementById('userCount');
  if (!tbody) return;

  if (countEl) countEl.textContent = users.length + ' user' + (users.length !== 1 ? 's' : '');

  if (users.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="lk-table__empty">No users match the current filters</td></tr>';
    return;
  }

  tbody.innerHTML = users.map(function(u) {
    var initials = u.FullName.split(' ').map(function(n) { return n[0]; }).join('').substring(0, 2);
    var avatarColor = AVATAR_COLORS[u.UserID % AVATAR_COLORS.length];
    var roleLower = u.Role.toLowerCase();
    var statusClass = u.IsActive ? 'active' : 'suspended';
    var statusLabel = u.IsActive ? 'Active' : 'Suspended';
    var completedCount = u.CompletedJobs || 0;
    var joined = typeof formatDate === 'function' ? formatDate(u.CreatedAt) : new Date(u.CreatedAt).toLocaleDateString('en-ZA');
    var toggleLabel = u.IsActive ? 'Suspend' : 'Activate';
    var toggleClass = u.IsActive ? 'lk-act-warn' : 'lk-act-success';

    return '<tr data-user="' + u.UserID + '">' +
      '<td><div class="lk-user-cell">' +
        '<div class="lk-avatar" style="background:' + avatarColor + '">' + initials + '</div>' +
        '<div><div class="lk-user-name">' + u.FullName + '</div>' +
        '<div class="lk-user-email">' + u.Email + '</div></div>' +
      '</div></td>' +
      '<td><span class="lk-role-tag lk-role-tag--' + roleLower + '">' + u.Role + '</span></td>' +
      '<td>' + u.Area + '</td>' +
      '<td><span class="lk-status-dot lk-status-dot--' + statusClass + '">' + statusLabel + '</span></td>' +
      '<td>' + joined + '</td>' +
      '<td>' + completedCount + ' job' + (completedCount !== 1 ? 's' : '') + '</td>' +
      '<td><div class="lk-row-actions">' +
        '<button class="' + toggleClass + '" onclick="event.stopPropagation();toggleUser(' + u.UserID + ')">' + toggleLabel + '</button>' +
        '<button class="lk-act-danger" onclick="event.stopPropagation();deleteUser(' + u.UserID + ')">Delete</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');

  // Row click → open record panel
  tbody.querySelectorAll('tr[data-user]').forEach(function(row) {
    row.addEventListener('click', function() {
      var userId = parseInt(row.dataset.user);
      var user = allUsers.find(function(u) { return u.UserID === userId; });
      if (user) openRecordPanel(user);
    });
  });
}

function filterUsers() {
  var query = (document.getElementById('userSearch') ? document.getElementById('userSearch').value : '').toLowerCase();
  var role = document.getElementById('roleFilter') ? document.getElementById('roleFilter').value : '';
  var status = document.getElementById('statusFilter') ? document.getElementById('statusFilter').value : '';

  var filtered = allUsers.filter(function(u) {
    var matchQ = !query ||
      u.FullName.toLowerCase().indexOf(query) !== -1 ||
      u.Email.toLowerCase().indexOf(query) !== -1 ||
      (u.Area && u.Area.toLowerCase().indexOf(query) !== -1);
    var matchR = !role || u.Role === role;
    var matchS = !status ||
      (status === 'active' && u.IsActive) ||
      (status === 'suspended' && !u.IsActive);
    return matchQ && matchR && matchS;
  });

  renderUsers(filtered);
}


// =====================================================
// RECORD PANEL
// =====================================================

function openRecordPanel(user) {
  var overlay = document.getElementById('panelOverlay');
  var panel = document.getElementById('recordPanel');
  var nameEl = document.getElementById('panelName');
  var bodyEl = document.getElementById('panelBody');
  var footEl = document.getElementById('panelFoot');
  if (!panel || !bodyEl) return;

  if (nameEl) nameEl.textContent = user.FullName;

  var statusClass = user.IsActive ? 'active' : 'suspended';
  var statusLabel = user.IsActive ? 'Active' : 'Suspended';
  var roleLower = user.Role.toLowerCase();
  var joined = typeof formatDate === 'function' ? formatDate(user.CreatedAt) : new Date(user.CreatedAt).toLocaleDateString('en-ZA');

  var servicesHtml = '';
  if (user.Services) {
    var skills = user.Services.split(',').map(function(s) { return s.trim(); });
    servicesHtml =
      '<div class="lk-panel__section">' +
        '<div class="lk-panel__section-title">Services</div>' +
        '<div class="lk-panel__tags">' +
          skills.map(function(s) { return '<span class="lk-panel__tag">' + s + '</span>'; }).join('') +
        '</div>' +
      '</div>';
  }

  bodyEl.innerHTML =
    '<div class="lk-panel__section">' +
      '<div class="lk-panel__section-title">Details</div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Role</span><span class="lk-panel__row-value"><span class="lk-role-tag lk-role-tag--' + roleLower + '">' + user.Role + '</span></span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Area</span><span class="lk-panel__row-value">' + (user.Area || '--') + '</span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Status</span><span class="lk-panel__row-value"><span class="lk-status-dot lk-status-dot--' + statusClass + '">' + statusLabel + '</span></span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Joined</span><span class="lk-panel__row-value">' + joined + '</span></div>' +
    '</div>' +

    '<div class="lk-panel__section">' +
      '<div class="lk-panel__section-title">Contact</div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Email</span><span class="lk-panel__row-value">' + user.Email + '</span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Phone</span><span class="lk-panel__row-value">' + user.PhoneNumber + '</span></div>' +
    '</div>' +

    servicesHtml +

    '<div class="lk-panel__section">' +
      '<div class="lk-panel__section-title">Trust</div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Identity verified</span><span class="lk-panel__row-value">' + (user.Verified ? 'Yes' : 'Pending') + '</span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Credential status</span><span class="lk-panel__row-value">' + (user.Verified ? 'Confirmed' : 'Unverified') + '</span></div>' +
    '</div>' +

    '<div class="lk-panel__section">' +
      '<div class="lk-panel__section-title">Activity</div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Completed jobs</span><span class="lk-panel__row-value">' + (user.CompletedJobs || 0) + '</span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Active jobs</span><span class="lk-panel__row-value">' + (user.ActiveJobs || 0) + '</span></div>' +
      '<div class="lk-panel__row"><span class="lk-panel__row-label">Reviews</span><span class="lk-panel__row-value">' + (user.Reviews || 0) + '</span></div>' +
      (user.Rating ? '<div class="lk-panel__row"><span class="lk-panel__row-label">Rating</span><span class="lk-panel__row-value">' + user.Rating.toFixed(1) + '</span></div>' : '') +
    '</div>';

  if (footEl) {
    var toggleLabel = user.IsActive ? 'Suspend account' : 'Activate account';
    var toggleClass = user.IsActive ? 'lk-btn-warn' : 'lk-btn-success';
    footEl.innerHTML =
      '<button class="' + toggleClass + '" onclick="toggleUser(' + user.UserID + ')">' + toggleLabel + '</button>' +
      '<button class="lk-btn-danger" onclick="deleteUser(' + user.UserID + ')">Delete account</button>';
  }

  if (overlay) overlay.classList.add('open');
  panel.classList.add('open');

  // Close handlers
  var closeBtn = document.getElementById('panelClose');
  if (closeBtn) closeBtn.onclick = closeRecordPanel;
  if (overlay) overlay.onclick = closeRecordPanel;
}

function closeRecordPanel() {
  var overlay = document.getElementById('panelOverlay');
  var panel = document.getElementById('recordPanel');
  if (overlay) overlay.classList.remove('open');
  if (panel) panel.classList.remove('open');
}


// =====================================================
// TOGGLE & DELETE USER
// =====================================================

async function toggleUser(id) {
  try {
    var data = await apiPut('/admin/users/' + id + '/toggle', {});
    showAlert(data.message, data.success ? 'success' : 'danger');
    if (data.success) {
      closeRecordPanel();
      loadUsers();
      return;
    }
  } catch (e) {
    // Demo mode
  }

  // Demo fallback
  var user = allUsers.find(function(u) { return u.UserID === id; });
  if (user) {
    user.IsActive = !user.IsActive;
    showAlert('User ' + user.FullName + ' ' + (user.IsActive ? 'activated' : 'suspended') + ' (demo)', 'success');
    closeRecordPanel();
    filterUsers();
  }
}

async function deleteUser(id) {
  if (!confirm('Are you sure you want to delete this user? This cannot be undone.')) return;

  try {
    var data = await apiDelete('/admin/users/' + id);
    showAlert(data.message, data.success ? 'success' : 'danger');
    if (data.success) {
      closeRecordPanel();
      loadUsers();
      return;
    }
  } catch (e) {
    // Demo mode
  }

  // Demo fallback
  allUsers = allUsers.filter(function(u) { return u.UserID !== id; });
  showAlert('User deleted (demo)', 'success');
  closeRecordPanel();
  filterUsers();
}


// =====================================================
// JOBS
// =====================================================

async function loadAdminJobs() {
  var tbody = document.getElementById('jobsBody');
  if (!tbody) return;

  try {
    var res = await fetch('/api/admin/jobs');
    var data = await res.json();
    if (data.success) {
      allJobs = data.jobs;
      applyJobFilter();
      if (!jobControlsReady) setupJobControls();
      return;
    }
  } catch (e) {
    // API unavailable
  }

  // Demo fallback
  allJobs = DEMO_JOBS;
  applyJobFilter();
  if (!jobControlsReady) setupJobControls();
}

function setupJobControls() {
  jobControlsReady = true;

  // Filter tabs
  var filters = document.getElementById('jobFilters');
  if (filters) {
    filters.querySelectorAll('.lk-filter-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        filters.querySelectorAll('.lk-filter-tab').forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        currentJobFilter = tab.dataset.filter;
        applyJobFilter();
      });
    });
  }

  // View toggle (list / board)
  var toggle = document.getElementById('viewToggle');
  if (toggle) {
    toggle.querySelectorAll('button').forEach(function(btn) {
      btn.addEventListener('click', function() {
        toggle.querySelectorAll('button').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentJobViewMode = btn.dataset.mode;
        applyJobFilter();
      });
    });
  }
}

function applyJobFilter() {
  var filtered = currentJobFilter === 'all'
    ? allJobs
    : allJobs.filter(function(j) { return j.Status === currentJobFilter; });

  var listView = document.getElementById('jobsListView');
  var boardView = document.getElementById('jobsBoardView');

  if (currentJobViewMode === 'list') {
    if (listView) listView.style.display = '';
    if (boardView) boardView.style.display = 'none';
    renderJobsList(filtered);
  } else {
    if (listView) listView.style.display = 'none';
    if (boardView) boardView.style.display = '';
    renderJobsBoard(currentJobFilter === 'all' ? allJobs : filtered);
  }
}

function localStatusBadge(status) {
  var map = { 'Open': 'open', 'In Progress': 'progress', 'Completed': 'completed', 'Cancelled': 'cancelled' };
  var cls = map[status] || 'open';
  return '<span class="badge-' + cls + '">' + status + '</span>';
}

function renderJobsList(jobs) {
  var tbody = document.getElementById('jobsBody');
  if (!tbody) return;

  if (jobs.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="lk-table__empty">No jobs match the current filter</td></tr>';
    return;
  }

  tbody.innerHTML = jobs.map(function(j) {
    var budget = typeof formatZAR === 'function' ? formatZAR(j.Budget) : 'R' + parseFloat(j.Budget).toFixed(2);
    var status = typeof statusBadge === 'function' ? statusBadge(j.Status) : localStatusBadge(j.Status);
    var posted = typeof formatDate === 'function' ? formatDate(j.PostedAt) : new Date(j.PostedAt).toLocaleDateString('en-ZA');

    return '<tr>' +
      '<td><span class="lk-user-name">' + j.Title + '</span></td>' +
      '<td>' + j.CategoryName + '</td>' +
      '<td>' + j.CustomerName + '</td>' +
      '<td>' + (j.Area || '--') + '</td>' +
      '<td>' + budget + '</td>' +
      '<td>' + status + '</td>' +
      '<td>' + posted + '</td>' +
    '</tr>';
  }).join('');
}

function renderJobsBoard(jobs) {
  var colOpen = document.getElementById('boardOpen');
  var colProgress = document.getElementById('boardProgress');
  var colCompleted = document.getElementById('boardCompleted');
  if (!colOpen || !colProgress || !colCompleted) return;

  var openJobs = jobs.filter(function(j) { return j.Status === 'Open'; });
  var progressJobs = jobs.filter(function(j) { return j.Status === 'In Progress'; });
  var completedJobs = jobs.filter(function(j) { return j.Status === 'Completed'; });

  function renderCards(list) {
    if (list.length === 0) {
      return '<div style="padding:16px;text-align:center;color:var(--lk-ink-muted);font-size:12px">No jobs</div>';
    }
    return list.map(function(j) {
      var budget = typeof formatZAR === 'function' ? formatZAR(j.Budget) : 'R' + parseFloat(j.Budget).toFixed(2);
      return '<div class="lk-board__card">' +
        '<div class="lk-board__card-title">' + j.Title + '</div>' +
        '<div class="lk-board__card-meta">' + j.CategoryName + ' &middot; ' + j.CustomerName + '</div>' +
        '<div class="lk-board__card-budget">' + budget + '</div>' +
      '</div>';
    }).join('');
  }

  colOpen.innerHTML = '<div class="lk-board__col-head">Open</div>' + renderCards(openJobs);
  colProgress.innerHTML = '<div class="lk-board__col-head">In Progress</div>' + renderCards(progressJobs);
  colCompleted.innerHTML = '<div class="lk-board__col-head">Completed</div>' + renderCards(completedJobs);
}


// =====================================================
// LOKSHIN ASSIST — Demo AI interaction
// =====================================================

function setupAssist() {
  // Prompt chip clicks
  document.querySelectorAll('.lk-chip[data-prompt]').forEach(function(chip) {
    chip.addEventListener('click', function() {
      handleAssistPrompt(chip.dataset.prompt);
    });
  });

  // Send button
  var sendBtn = document.getElementById('assistSend');
  var input = document.getElementById('assistInput');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      var val = input ? input.value.trim() : '';
      if (val) handleAssistPrompt(val);
    });
  }

  // Enter key
  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var val = input.value.trim();
        if (val) handleAssistPrompt(val);
      }
    });
  }
}

function handleAssistPrompt(prompt) {
  var messagesEl = document.getElementById('assistMessages');
  var inputEl = document.getElementById('assistInput');
  if (!messagesEl) return;

  // User message bubble
  var userMsg = document.createElement('div');
  userMsg.className = 'lk-assist__msg lk-assist__msg--user';
  userMsg.textContent = prompt;
  messagesEl.appendChild(userMsg);

  // Clear input
  if (inputEl) inputEl.value = '';

  // Find matching response
  var response = AI_RESPONSES[prompt];
  if (!response) {
    var lower = prompt.toLowerCase();
    var keys = Object.keys(AI_RESPONSES);
    for (var k = 0; k < keys.length; k++) {
      var keyword = keys[k].split(' ')[0];
      if (lower.indexOf(keyword) !== -1) {
        response = AI_RESPONSES[keys[k]];
        break;
      }
    }
  }
  if (!response) {
    response = 'I can help with that. In production, this query would be processed by the Lokshin Assist backend. Try one of the suggested prompts for a demo.';
  }

  // AI response bubble with slight delay
  setTimeout(function() {
    var aiMsg = document.createElement('div');
    aiMsg.className = 'lk-assist__msg lk-assist__msg--ai';
    aiMsg.innerHTML = response;
    messagesEl.appendChild(aiMsg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }, 500);

  messagesEl.scrollTop = messagesEl.scrollHeight;
}


// =====================================================
// ANIMATE VALUE — count-up with ease-out
// =====================================================

function animateValue(elementId, target, prefix, suffix) {
  prefix = prefix || '';
  suffix = suffix || '';
  var el = document.getElementById(elementId);
  if (!el) return;

  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = prefix + formatNumber(target) + suffix;
    return;
  }

  var duration = 900;
  var start = performance.now();

  function step(now) {
    var progress = Math.min((now - start) / duration, 1);
    var ease = 1 - Math.pow(1 - progress, 3);
    var current = Math.round(target * ease);
    el.textContent = prefix + formatNumber(current) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function formatNumber(n) {
  return n.toLocaleString('en-ZA');
}


// =====================================================
// PREVIEW MODE BADGE
// =====================================================

function injectPreviewBadge() {
  var badge = document.createElement('div');
  badge.className = 'lk-preview-badge';
  badge.textContent = 'PREVIEW MODE';
  document.body.appendChild(badge);
}


// =====================================================
// WINDOW RESIZE — debounced workspace redraw
// =====================================================

var resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (currentView === 'overview') renderWorkspace();
  }, 250);
});


// =====================================================
// START
// =====================================================

init();
