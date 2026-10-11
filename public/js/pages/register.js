/**
 * Lokshin Gigs — Registration Page Logic
 * Dependencies: /js/main.js (apiPost, loadCategories)
 */
(function () {
  'use strict';

  // ─── Card content (Customer vs Freelancer) ───────────────────────
  var content = {
    customer: [
      { lbl: 'Trust', big: '', head: 'Local reputation travels fast', para: 'A good service moves from one neighbour to the next without needing a traditional job ad.', foot: '' },
      { lbl: 'Nearby', big: 'Close by', head: '', para: 'For everyday work, being nearby matters as much as the skill — especially when someone needs help today.', foot: 'Distance can be an advantage' },
      { lbl: 'Skills', big: '3‑in‑1', head: '', para: 'One provider can offer several services, from braiding and nails to setup, delivery or repairs.', foot: 'More skills, more possibilities' },
      { lbl: 'Work', big: '', head: 'One request can create more work', para: 'A repair, event or catering job can bring in transport, assistants, cleaning, setup and supplies.', foot: '' },
      { lbl: 'Local', big: '', head: 'The next customer may be nearby', para: 'In a neighbourhood marketplace, local knowledge and familiarity make finding the right person easier.', foot: '' },
      { lbl: 'Verification', big: 'Verified', head: '', para: 'Service providers are verified using identity documents plus relevant professional or academic certificates.', foot: 'Identity + credentials' }
    ],
    freelancer: [
      { lbl: 'Reputation', big: '', head: 'Good work brings the next customer', para: 'A strong service can turn one completed job into another recommendation nearby.', foot: '' },
      { lbl: 'Nearby', big: 'Your area', head: '', para: 'Customers often start with the people closest to them when the job is practical, urgent or hands-on.', foot: 'Be found where you work' },
      { lbl: 'Skills', big: 'Multi‑skill', head: '', para: 'Hair, beauty, repairs, gardening, tutoring, cleaning — practical skills can become multiple income opportunities.', foot: 'One profile, many services' },
      { lbl: 'Demand', big: '', head: 'Your skill can solve a real need', para: 'From home repairs to event support, everyday local problems create opportunities for people who can get the job done.', foot: '' },
      { lbl: 'Local', big: '', head: 'Your next client could be nearby', para: 'Show what you do, where you work and the kind of service customers can expect.', foot: '' },
      { lbl: 'Verification', big: 'Credentials', head: '', para: 'Freelancers can build trust through identity verification and relevant professional or academic certificates.', foot: 'ID + professional credentials' }
    ]
  };

  function renderCards(role) {
    var d = content[role];
    for (var i = 0; i < 6; i++) {
      var el = document.getElementById('sc' + (i + 1));
      if (!el) continue;
      var c = d[i], h = '';
      h += '<p class="sc-lbl">' + c.lbl + '</p>';
      if (c.big) h += '<p class="sc-big" style="font-size:' + (c.big.length > 8 ? '22' : '28') + 'px;margin-top:6px">' + c.big + '</p>';
      if (c.head) h += '<p class="sc-big" style="font-size:14px;margin-top:6px;line-height:1.25">' + c.head + '</p>';
      h += '<p class="sc-p" style="font-size:10px;margin-top:5px">' + c.para + '</p>';
      if (c.foot) h += '<p class="sc-foot">' + c.foot + '</p>';
      el.innerHTML = h;
    }
  }

  // ─── DOM refs ────────────────────────────────────────────────────
  var cC = document.getElementById('card-customer');
  var cF = document.getElementById('card-freelancer');
  var rC = document.getElementById('roleC');
  var rF = document.getElementById('roleF');
  var freelancerFields = document.getElementById('freelancerFields');
  var shell = document.querySelector('.shell');
  var form = document.getElementById('registerForm');
  var alertBox = document.getElementById('alertBox');
  var submitBtn = document.getElementById('registerSubmit');
  var submitLabel = document.getElementById('registerSubmitLabel');
  var pw = document.getElementById('password');
  var pwToggle = document.getElementById('passwordToggle');
  var eyeOn = document.getElementById('iconEye');
  var eyeOff = document.getElementById('iconEyeSlash');
  var googleBtn = document.getElementById('googleSignup');

  var currentRole = 'Customer';
  var transitioning = false;

  // ─── Render initial cards ────────────────────────────────────────
  renderCards('customer');

  // ─── Role switching with whip transition ─────────────────────────
  function applyRole(r) {
    var f = r === 'Freelancer';
    cC.dataset.selected = String(!f);
    cF.dataset.selected = String(f);
    rC.checked = !f;
    rF.checked = f;
    freelancerFields.dataset.open = String(f);
    renderCards(f ? 'freelancer' : 'customer');
    currentRole = r;
  }

  function setRole(r) {
    if (r === currentRole || transitioning) return;
    transitioning = true;
    var dir = r === 'Freelancer' ? 'ltr' : 'rtl';
    shell.classList.add('whip-' + dir);
    setTimeout(function () { applyRole(r); }, 220);
    setTimeout(function () { shell.classList.remove('whip-' + dir); transitioning = false; }, 500);
  }

  cC.addEventListener('click', function () { setRole('Customer'); });
  cF.addEventListener('click', function () { setRole('Freelancer'); });

  // ─── URL param: ?role=Freelancer ─────────────────────────────────
  if (new URLSearchParams(location.search).get('role') === 'Freelancer') {
    applyRole('Freelancer');
  }

  // ─── Load skill categories from API ──────────────────────────────
  if (typeof loadCategories === 'function') {
    loadCategories('skillCategory');
  }

  // ─── Input text-align behaviour ──────────────────────────────────
  document.querySelectorAll('.fi').forEach(function (el) {
    el.addEventListener('input', function () {
      el.classList.toggle('has-value', el.value.length > 0);
    });
  });

  // ─── Password visibility toggle ─────────────────────────────────
  pwToggle.addEventListener('click', function () {
    var hidden = pw.type === 'password';
    pw.type = hidden ? 'text' : 'password';
    pwToggle.setAttribute('aria-label', hidden ? 'Hide password' : 'Show password');
    pwToggle.setAttribute('aria-pressed', String(hidden));
    eyeOn.style.display = hidden ? 'none' : 'block';
    eyeOff.style.display = hidden ? 'block' : 'none';
    pw.focus();
  });

  // ─── Google signup placeholder ───────────────────────────────────
  googleBtn.addEventListener('click', function () {
    var base = (typeof window !== 'undefined' && window.API_BASE) ? window.API_BASE : '';
    window.location.href = base + '/api/auth/google';
  });

  // ─── Form submission with real API ───────────────────────────────
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    alertBox.innerHTML = '';

    var fullName = document.getElementById('fullName').value.trim();
    var email    = document.getElementById('email').value.trim();
    var phone    = document.getElementById('phone').value.trim();
    var password = document.getElementById('password').value;
    var role     = document.querySelector('input[name="role"]:checked').value;

    // Client-side validation
    if (!fullName || !email || !phone || !password) {
      alertBox.innerHTML = '<div class="alert-err">Please fill in all required fields.</div>';
      return;
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/[0-9]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      alertBox.innerHTML = '<div class="alert-err">Password must be at least 8 characters and include a letter, number, and special character.</div>';
      return;
    }

    // Loading state
    submitBtn.disabled = true;
    submitLabel.textContent = 'Creating account…';

    var payload = {
      fullName: fullName,
      email: email,
      phone: phone,
      password: password,
      role: role,
      skillCategory: document.getElementById('skillCategory') ? document.getElementById('skillCategory').value : '',
      experience:    document.getElementById('experience')    ? document.getElementById('experience').value    : '',
      bio:           document.getElementById('bio')           ? document.getElementById('bio').value           : ''
    };

    try {
      var data = await apiPost('/auth/register', payload);

      if (data.success) {
        alertBox.innerHTML = '<div class="alert-ok">' + data.message + ' Redirecting to login…</div>';
        setTimeout(function () { window.location.href = '/login'; }, 1800);
      } else {
        alertBox.innerHTML = '<div class="alert-err">' + data.message + '</div>';
        submitBtn.disabled = false;
        submitLabel.textContent = 'Create Account';
      }
    } catch (err) {
      alertBox.innerHTML = '<div class="alert-err">Network error — please check your connection and try again.</div>';
      submitBtn.disabled = false;
      submitLabel.textContent = 'Create Account';
    }
  });
})();
