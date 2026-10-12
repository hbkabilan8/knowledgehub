// ============================================================
// KnowledgeHub - Main Script (script.js)
// ============================================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    checkSession();
    setupMobileMenu();
    addCardHoverEffects();
});

// ─── Mobile Menu ────────────────────────────────────────────
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    if (!mobileMenuBtn || !nav) return;

    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
        }
    });
}

// ─── Particles ───────────────────────────────────────────────
function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 1;
        particle.style.cssText = `
            width:${size}px; height:${size}px;
            left:${Math.random()*100}%; top:${Math.random()*100}%;
            animation-duration:${Math.random()*20+10}s;
            animation-delay:${Math.random()*5}s;
            background-color:rgba(255,255,255,${Math.random()*0.3+0.1});
        `;
        container.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
        .particle {
            position:absolute; border-radius:50%;
            animation: particle-float linear infinite; pointer-events:none;
        }
        @keyframes particle-float {
            0%   { transform:translateY(0) rotate(0deg); opacity:0; }
            10%  { opacity:1; }
            90%  { opacity:1; }
            100% { transform:translateY(-100vh) rotate(360deg); opacity:0; }
        }
    `;
    document.head.appendChild(style);
}

// ─── Popup helpers ───────────────────────────────────────────
function openLogin() {
    document.getElementById('loginOverlay').style.display = 'flex';
    const reg = document.getElementById('registerOverlay');
    if (reg) reg.style.display = 'none';
}

function openRegister() {
    document.getElementById('registerOverlay').style.display = 'flex';
    const log = document.getElementById('loginOverlay');
    if (log) log.style.display = 'none';
}

function closeAll() {
    document.querySelectorAll('.popup-overlay').forEach(el => el.style.display = 'none');
}

function switchToRegister() { closeAll(); setTimeout(openRegister, 10); }
function switchToLogin()    { closeAll(); setTimeout(openLogin, 10); }

// ─── Password toggle ─────────────────────────────────────────
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const icon  = field.parentNode.querySelector('.toggle-password');
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// ─── Filter tests (index page) ───────────────────────────────
function filterTests(category) {
    const cards      = document.querySelectorAll('.test-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        const text = btn.textContent.trim().toLowerCase();
        if (category === 'all' && text === 'all') btn.classList.add('active');
        if (category !== 'all' && text.includes(category)) btn.classList.add('active');
    });

    cards.forEach(card => {
        const show = category === 'all' || card.getAttribute('data-category') === category;
        if (show) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity='1'; card.style.transform='translateY(0)'; }, 10);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => { card.style.display='none'; }, 300);
        }
    });
}

// ─── Scroll to tests section ─────────────────────────────────
function scrollToTests() {
    const section = document.getElementById('testsSection');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// ─── START TEST (global — works from index & tests pages) ────
function startTest(testId, testName) {
    fetch("php/session.php")
        .then(res => res.text())
        .then(data => {
            if (data && data.trim() !== '') {
                window.location.href = `test.html?test=${testId}`;
            } else {
                alert('Please login to take the test');
                openLogin();
            }
        })
        .catch(() => openLogin());
}

// ─── Auth ────────────────────────────────────────────────────
function login() {
    const email    = document.getElementById('lemail').value.trim();
    const password = document.getElementById('lpass').value;

    if (!email || !password) { alert('Please fill in all fields'); return; }

    fetch("php/login.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === 'success') { closeAll(); setTimeout(() => location.reload(), 300); }
        else { alert('Login failed. Please check your credentials.'); }
    })
    .catch(() => alert('Network error. Please try again.'));
}

function register() {
    const name        = document.getElementById('rname').value.trim();
    const email       = document.getElementById('remail').value.trim();
    const password    = document.getElementById('rpass').value;
    const confirmPass = document.getElementById('rcpass').value;

    if (!name || !email || !password || !confirmPass) { alert('Please fill in all fields'); return; }
    if (password !== confirmPass) { alert('Passwords do not match'); return; }
    if (password.length < 8) { alert('Password must be at least 8 characters'); return; }

    fetch("php/register.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `fullname=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(res => res.text())
    .then(data => {
        if (data.trim() === 'success') {
            alert('Registered successfully! You can now login.');
            closeAll();
            setTimeout(openLogin, 300);
        } else if (data.trim() === 'duplicate') {
            alert('This email is already registered. Please login instead.');
        } else {
            alert('Registration failed: ' + data);
        }
    })
    .catch(() => alert('Network error. Please try again.'));
}

function checkSession() {
    fetch("php/session.php")
        .then(res => res.text())
        .then(data => {
            if (data && data.trim() !== '') {
                const userEl = document.getElementById('user');
                if (userEl) userEl.innerText = 'Welcome, ' + data.trim();
                document.querySelectorAll('.btn-login, .btn-register').forEach(el => el.style.display = 'none');
                const logoutBtn = document.getElementById('logoutBtn');
                if (logoutBtn) logoutBtn.style.display = 'flex';
            }
        })
        .catch(err => console.error('Session check error:', err));
}

function logout() {
    fetch("php/logout.php").finally(() => location.reload());
}

// ─── Card hover effects ──────────────────────────────────────
function addCardHoverEffects() {
    document.querySelectorAll('.test-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) { icon.style.transform='scale(1.2) rotate(10deg)'; icon.style.transition='transform 0.3s ease'; }
        });
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.card-icon i');
            if (icon) icon.style.transform='scale(1) rotate(0deg)';
        });
    });
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    document.querySelectorAll('.popup-overlay').forEach(overlay => {
        if (e.target === overlay) closeAll();
    });
});
