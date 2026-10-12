// -----------------------------------------------------------------------------
// Lokshin Gigs — Login page script.
// Compiled from src/ts/pages/login.ts → public/js/pages/login.js.
//
// Depends on the global `apiPost` defined in src/ts/main.ts (loaded first via
// <script src="/js/main.js"></script>). Because tsconfig uses "module": "none",
// both files share the script scope and no import/export is required.
//
// API CONTRACT PRESERVED: POST /api/auth/login  { email, password }
//                        → { success, user: { role }, message? }
// Role-based redirect matches the previous inline handler exactly.
//
// ADDED:
//  - Forgot password view + POST /api/auth/forgot-password  { email }
//  - Reset password view + POST /api/auth/reset-password  { token, newPassword }
//  - Password validation (8+ chars, letter, number, special char)
//  - View switching (login / forgot / reset)
//  - Input text-align behavior (.fi-align / .has-value)
//  - Google sign-in placeholder
//  - Reset-view password toggle ([data-pw-toggle])
//  - URL param ?token=xxx → reset view
// -----------------------------------------------------------------------------
const ROLE_REDIRECT = {
    Customer: '/pages/customer-dashboard.html',
    Freelancer: '/pages/freelancer-dashboard.html',
    Admin: '/pages/admin-dashboard.html'
};
// ------- password strength validator ----------------------------------------
function validatePassword(pw) {
    if (pw.length < 8)              return 'Password must be at least 8 characters.';
    if (!/[a-zA-Z]/.test(pw))       return 'Password must include at least one letter.';
    if (!/[0-9]/.test(pw))          return 'Password must include at least one number.';
    if (!/[^a-zA-Z0-9]/.test(pw))   return 'Password must include at least one special character.';
    return null;
}
function initLoginPage() {
    // ─── Login form refs (original) ────────────────────────────────────
    const form = document.getElementById('loginForm');
    const email = document.getElementById('email');
    const pw = document.getElementById('password');
    const submit = document.getElementById('loginSubmit');
    const submitLabel = document.getElementById('loginSubmitLabel');
    const errBox = document.getElementById('loginError');
    const pwToggle = document.getElementById('passwordToggle');
    const iconEye = document.getElementById('iconEye');
    const iconEyeSlash = document.getElementById('iconEyeSlash');
    if (!form || !email || !pw || !submit || !submitLabel || !errBox)
        return;
    // ─── View refs ─────────────────────────────────────────────────────
    const loginView = document.getElementById('loginView');
    const forgotView = document.getElementById('forgotView');
    const resetView = document.getElementById('resetView');
    const forgotLink = document.getElementById('forgotLink');
    const backToLogin = document.getElementById('backToLogin');
    const googleBtn = document.getElementById('googleSignin');
    // ─── Forgot form refs ──────────────────────────────────────────────
    const forgotForm = document.getElementById('forgotForm');
    const forgotEmail = document.getElementById('forgotEmail');
    const forgotAlert = document.getElementById('forgotAlert');
    const forgotSubmit = document.getElementById('forgotSubmit');
    const forgotSubmitLabel = document.getElementById('forgotSubmitLabel');
    // ─── Reset form refs ───────────────────────────────────────────────
    const resetForm = document.getElementById('resetForm');
    const newPwInput = document.getElementById('newPassword');
    const confirmPwInput = document.getElementById('confirmPassword');
    const resetAlert = document.getElementById('resetAlert');
    const resetSubmit = document.getElementById('resetSubmit');
    const resetSubmitLabel = document.getElementById('resetSubmitLabel');
    // ─── URL token ─────────────────────────────────────────────────────
    const resetToken = new URLSearchParams(location.search).get('token');
    // ------- error banner (original) -----------------------------------------
    const showError = (msg) => {
        errBox.textContent = msg;
        errBox.hidden = false;
    };
    const clearError = () => {
        if (!errBox.hidden) {
            errBox.textContent = '';
            errBox.hidden = true;
        }
    };
    // ------- submit loading state (original) ---------------------------------
    const setLoading = (loading) => {
        submit.disabled = loading;
        submitLabel.textContent = loading ? 'Signing in…' : 'Sign in';
    };
    // Clear the error banner as soon as the user starts typing again (original)
    email.addEventListener('input', clearError);
    pw.addEventListener('input', clearError);
    // ------- password visibility toggle (original) ---------------------------
    if (pwToggle && iconEye && iconEyeSlash) {
        pwToggle.addEventListener('click', () => {
            const wasHidden = pw.type === 'password';
            pw.type = wasHidden ? 'text' : 'password';
            pwToggle.setAttribute('aria-label', wasHidden ? 'Hide password' : 'Show password');
            pwToggle.setAttribute('aria-pressed', wasHidden ? 'true' : 'false');
            iconEye.classList.toggle('hidden', wasHidden);
            iconEyeSlash.classList.toggle('hidden', !wasHidden);
            pw.focus();
        });
    }
    // ------- submit (original + password validation) -------------------------
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearError();
        const emailV = email.value.trim();
        const pwV = pw.value;
        // Client-side validation
        if (!emailV || !pwV) {
            showError('Please enter your email and password.');
            (emailV ? pw : email).focus();
            return;
        }
        // Password strength check (added)
        const pwErr = validatePassword(pwV);
        if (pwErr) {
            showError(pwErr);
            pw.focus();
            return;
        }
        setLoading(true);
        try {
            const r = await apiPost('/auth/login', { email: emailV, password: pwV });
            if (r.success && r.user) {
                submitLabel.textContent = 'Signed in — redirecting…';
                const target = ROLE_REDIRECT[r.user.role] || '/';
                localStorage.setItem('lg_user', JSON.stringify(r.user));
                setTimeout(() => { window.location.href = target; }, 400);
                return;
            }
            // API error (invalid credentials, etc.)
            showError(r.message || 'Sign-in failed. Please check your details and try again.');
            setLoading(false);
            pw.focus();
            pw.select();
        }
        catch {
            // Network failure
            showError('We could not reach the server. Check your connection and try again.');
            setLoading(false);
        }
    });
    // ═══════════════════════════════════════════════════════════════════
    //  NEW FEATURES — built on top of original login logic
    // ═══════════════════════════════════════════════════════════════════
    // ------- view switching --------------------------------------------------
    function showView(view) {
        if (loginView) loginView.classList.remove('active');
        if (forgotView) forgotView.classList.remove('active');
        if (resetView) resetView.classList.remove('active');
        if (view) view.classList.add('active');
        // Clear all alerts
        clearError();
        if (forgotAlert) forgotAlert.innerHTML = '';
        if (resetAlert) resetAlert.innerHTML = '';
    }
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            showView(forgotView);
        });
    }
    if (backToLogin) {
        backToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showView(loginView);
        });
    }
    // If ?token=xxx is present, open reset view immediately
    if (resetToken && resetView) {
        showView(resetView);
    }
    // ------- input text-align behaviour (.fi-align / .has-value) -------------
    document.querySelectorAll('.fi-align').forEach((el) => {
        el.addEventListener('input', () => {
            el.classList.toggle('has-value', el.value.length > 0);
        });
    });
    // ------- reset-view password toggle ([data-pw-toggle]) -------------------
    document.querySelectorAll('[data-pw-toggle]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const wrap = btn.closest('.relative');
            if (!wrap) return;
            const input = wrap.querySelector('input');
            const eyeOn = btn.querySelector('.pw-eye');
            const eyeOff = btn.querySelector('.pw-eye-off');
            if (!input || !eyeOn || !eyeOff) return;
            const wasHidden = input.type === 'password';
            input.type = wasHidden ? 'text' : 'password';
            btn.setAttribute('aria-label', wasHidden ? 'Hide password' : 'Show password');
            btn.setAttribute('aria-pressed', wasHidden ? 'true' : 'false');
            eyeOn.classList.toggle('hidden', wasHidden);
            eyeOff.classList.toggle('hidden', !wasHidden);
            input.focus();
        });
    });
    // ------- forgot password form submission ---------------------------------
    // API endpoint: POST /api/auth/forgot-password  { email }
    // Expected response: { success, message }
    if (forgotForm && forgotEmail && forgotAlert && forgotSubmit && forgotSubmitLabel) {
        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            forgotAlert.innerHTML = '';
            const emailV = forgotEmail.value.trim();
            if (!emailV) {
                forgotAlert.innerHTML = '<div class="alert-banner alert-banner-err">Please enter your email address.</div>';
                forgotEmail.focus();
                return;
            }
            forgotSubmit.disabled = true;
            forgotSubmitLabel.textContent = 'Sending…';
            try {
                const r = await apiPost('/auth/forgot-password', { email: emailV });
                if (r.success) {
                    forgotAlert.innerHTML = '<div class="alert-banner alert-banner-ok">' + (r.message || 'If that email is registered, a reset link has been sent.') + '</div>';
                } else {
                    forgotAlert.innerHTML = '<div class="alert-banner alert-banner-err">' + (r.message || 'Unable to process your request. Please try again.') + '</div>';
                }
            } catch {
                forgotAlert.innerHTML = '<div class="alert-banner alert-banner-err">We could not reach the server. Check your connection and try again.</div>';
            }
            forgotSubmit.disabled = false;
            forgotSubmitLabel.textContent = 'Send Reset Link';
        });
    }
    // ------- reset password form submission -----------------------------------
    // API endpoint: POST /api/auth/reset-password  { token, newPassword }
    // Expected response: { success, message }
    if (resetForm && newPwInput && confirmPwInput && resetAlert && resetSubmit && resetSubmitLabel) {
        resetForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            resetAlert.innerHTML = '';
            const newPw = newPwInput.value;
            const confirmPw = confirmPwInput.value;
            if (!newPw || !confirmPw) {
                resetAlert.innerHTML = '<div class="alert-banner alert-banner-err">Please fill in both password fields.</div>';
                return;
            }
            if (newPw !== confirmPw) {
                resetAlert.innerHTML = '<div class="alert-banner alert-banner-err">Passwords do not match.</div>';
                return;
            }
            const pwErr = validatePassword(newPw);
            if (pwErr) {
                resetAlert.innerHTML = '<div class="alert-banner alert-banner-err">' + pwErr + '</div>';
                return;
            }
            if (!resetToken) {
                resetAlert.innerHTML = '<div class="alert-banner alert-banner-err">Invalid or missing reset token. Please request a new reset link.</div>';
                return;
            }
            resetSubmit.disabled = true;
            resetSubmitLabel.textContent = 'Resetting…';
            try {
                const r = await apiPost('/auth/reset-password', { token: resetToken, newPassword: newPw });
                if (r.success) {
                    resetAlert.innerHTML = '<div class="alert-banner alert-banner-ok">' + (r.message || 'Password reset successfully. Redirecting to sign in…') + '</div>';
                    setTimeout(() => { window.location.href = '/pages/login.html'; }, 1800);
                } else {
                    resetAlert.innerHTML = '<div class="alert-banner alert-banner-err">' + (r.message || 'Unable to reset password. The link may have expired.') + '</div>';
                    resetSubmit.disabled = false;
                    resetSubmitLabel.textContent = 'Reset Password';
                }
            } catch {
                resetAlert.innerHTML = '<div class="alert-banner alert-banner-err">We could not reach the server. Check your connection and try again.</div>';
                resetSubmit.disabled = false;
                resetSubmitLabel.textContent = 'Reset Password';
            }
        });
    }
    // ------- Google sign-in placeholder --------------------------------------
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            const base = (typeof window !== 'undefined' && window.API_BASE) ? window.API_BASE : '';
            window.location.href = base + '/api/auth/google';
        });
    }
}
// ------- atmospheric surface cursor tracking (UNCHANGED) --------------------
function initAtmosCursor() {
    const atmos = document.getElementById('atmos');
    if (!atmos)
        return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced)
        return;
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    // Lissajous ambient paths for 3 elongated gradient fields
    const fields = [
        { cx: 42, cy: 42, ax: 32, ay: 24, fx: 0.091, fy: 0.125, px: 0.0, py: 0.7 },
        { cx: 55, cy: 52, ax: 28, ay: 22, fx: 0.071, fy: 0.091, px: 1.4, py: 2.3 },
        { cx: 48, cy: 46, ax: 25, ay: 18, fx: 0.055, fy: 0.071, px: 3.1, py: 0.9 },
    ];
    const cursorTarget = { x: 0, y: 0 };
    const cursorPrev = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const cursorSmooth = [
        { x: 0, y: 0, damp: 0.08, weight: 9.0 },
        { x: 0, y: 0, damp: 0.03, weight: 5.5 },
        { x: 0, y: 0, damp: 0.012, weight: 3.0 },
    ];
    if (hasFinePointer) {
        document.addEventListener('pointermove', (e) => {
            cursorTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
            cursorTarget.y = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });
    }
    const propNames = ['--g1x', '--g1y', '--g2x', '--g2y', '--g3x', '--g3y'];
    const startTime = performance.now();
    const velWeights = [0.7, 0.4, 0.15];
    function tick(now) {
        const t = (now - startTime) / 1000;
        const vx = cursorTarget.x - cursorPrev.x;
        const vy = cursorTarget.y - cursorPrev.y;
        cursorPrev.x = cursorTarget.x;
        cursorPrev.y = cursorTarget.y;
        velocity.x = velocity.x * 0.96 + vx * 0.7;
        velocity.y = velocity.y * 0.97 + vy * 0.35;
        for (let i = 0; i < 3; i++) {
            const f = fields[i];
            const cs = cursorSmooth[i];
            cs.x += (cursorTarget.x - cs.x) * cs.damp;
            cs.y += (cursorTarget.y - cs.y) * cs.damp;
            let x = f.cx + f.ax * Math.sin(t * f.fx * Math.PI * 2 + f.px)
                + cs.x * cs.weight + velocity.x * velWeights[i];
            let y = f.cy + f.ay * Math.sin(t * f.fy * Math.PI * 2 + f.py)
                + cs.y * cs.weight + velocity.y * velWeights[i];
            x = Math.max(5, Math.min(95, x));
            y = Math.max(5, Math.min(95, y));
            atmos.style.setProperty(propNames[i * 2], x.toFixed(1) + '%');
            atmos.style.setProperty(propNames[i * 2 + 1], y.toFixed(1) + '%');
        }
        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}
// ------- init (UNCHANGED pattern) -------------------------------------------
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initLoginPage();
        initAtmosCursor();
    });
}
else {
    initLoginPage();
    initAtmosCursor();
}
