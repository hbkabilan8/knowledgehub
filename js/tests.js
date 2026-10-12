// ============================================================
// KnowledgeHub - Tests Page (tests.js)
// ============================================================

class TestsPage {
    constructor() {
        this.allTests      = [];
        this.filteredTests = [];
        this.currentPage   = 1;
        this.testsPerPage  = 12;
        this.currentCategory = 'all';
        this.currentSort   = 'popular';
        this.currentView   = 'grid';
        this.init();
    }

    init() {
        this.generateSampleTests();
        this.filteredTests = [...this.allTests];
        this.renderTests();
        this.renderPagination();
        this.setupEventListeners();
        this.checkSession();
    }

    generateSampleTests() {
        const categories = {
            programming:   { icon: 'fa-code',         color: '#4361ee' },
            gk:            { icon: 'fa-globe',         color: '#4cc9f0' },
            courses:       { icon: 'fa-graduation-cap',color: '#f72585' },
            certification: { icon: 'fa-certificate',   color: '#ff9e00' },
            language:      { icon: 'fa-language',      color: '#7209b7' },
            aptitude:      { icon: 'fa-calculator',    color: '#3a0ca3' }
        };

        const programmingTests = [
            { name:'JavaScript Fundamentals', questions:50, duration:60, difficulty:'easy',         rating:4.8 },
            { name:'Python Programming',      questions:45, duration:45, difficulty:'intermediate', rating:4.7 },
            { name:'Java Certification',      questions:70, duration:120,difficulty:'advanced',     rating:4.9 },
            { name:'C++ Advanced Concepts',   questions:60, duration:90, difficulty:'advanced',     rating:4.6 },
            { name:'Web Development',         questions:55, duration:75, difficulty:'intermediate', rating:4.5 },
            { name:'Data Structures',         questions:40, duration:60, difficulty:'intermediate', rating:4.7 },
            { name:'Algorithms',              questions:65, duration:90, difficulty:'advanced',     rating:4.8 },
            { name:'React.js Mastery',        questions:50, duration:60, difficulty:'intermediate', rating:4.9 },
            { name:'Node.js Backend',         questions:45, duration:60, difficulty:'intermediate', rating:4.6 },
            { name:'Database Design',         questions:35, duration:50, difficulty:'intermediate', rating:4.5 },
            { name:'Mobile Development',      questions:40, duration:60, difficulty:'intermediate', rating:4.4 },
            { name:'DevOps Fundamentals',     questions:30, duration:45, difficulty:'easy',         rating:4.3 },
            { name:'Cloud Computing',         questions:50, duration:75, difficulty:'intermediate', rating:4.7 },
            { name:'Machine Learning',        questions:60, duration:90, difficulty:'advanced',     rating:4.9 },
            { name:'Cybersecurity Basics',    questions:40, duration:60, difficulty:'intermediate', rating:4.8 },
            { name:'Blockchain Concepts',     questions:35, duration:50, difficulty:'advanced',     rating:4.6 },
            { name:'Game Development',        questions:45, duration:75, difficulty:'intermediate', rating:4.4 },
            { name:'UI/UX Design',            questions:30, duration:45, difficulty:'easy',         rating:4.5 },
            { name:'Software Testing',        questions:40, duration:60, difficulty:'intermediate', rating:4.3 },
            { name:'Agile Methodology',       questions:25, duration:30, difficulty:'easy',         rating:4.2 },
        ];

        const gkTests = [
            { name:'Current Affairs 2024',  questions:40, duration:30, difficulty:'easy',         rating:4.6 },
            { name:'World History',         questions:60, duration:75, difficulty:'advanced',     rating:4.7 },
            { name:'Geography Mastery',     questions:50, duration:60, difficulty:'intermediate', rating:4.5 },
            { name:'Science & Technology',  questions:50, duration:40, difficulty:'intermediate', rating:4.8 },
            { name:'Art & Culture',         questions:35, duration:45, difficulty:'easy',         rating:4.4 },
            { name:'Sports Knowledge',      questions:30, duration:30, difficulty:'easy',         rating:4.3 },
            { name:'Economics Basics',      questions:40, duration:50, difficulty:'intermediate', rating:4.2 },
            { name:'Political Science',     questions:45, duration:60, difficulty:'intermediate', rating:4.5 },
            { name:'Environmental Studies', questions:35, duration:45, difficulty:'easy',         rating:4.6 },
            { name:'World Capitals',        questions:50, duration:40, difficulty:'easy',         rating:4.1 },
            { name:'Famous Personalities',  questions:40, duration:45, difficulty:'easy',         rating:4.3 },
            { name:'Literature Classics',   questions:45, duration:60, difficulty:'intermediate', rating:4.7 },
            { name:'Mythology',             questions:35, duration:45, difficulty:'easy',         rating:4.4 },
            { name:'Space Exploration',     questions:40, duration:50, difficulty:'intermediate', rating:4.8 },
            { name:'Human Anatomy',         questions:45, duration:60, difficulty:'intermediate', rating:4.5 },
        ];

        const courseTests = [
            { name:'Database Management', questions:35, duration:50,  difficulty:'intermediate', rating:4.6 },
            { name:'Cyber Security',       questions:55, duration:90,  difficulty:'advanced',     rating:4.9 },
            { name:'Data Science',         questions:60, duration:120, difficulty:'advanced',     rating:4.8 },
            { name:'Artificial Intelligence',questions:50,duration:90, difficulty:'advanced',     rating:4.9 },
            { name:'Digital Marketing',    questions:40, duration:60,  difficulty:'intermediate', rating:4.5 },
            { name:'Project Management',   questions:45, duration:75,  difficulty:'intermediate', rating:4.4 },
            { name:'Business Analytics',   questions:50, duration:80,  difficulty:'intermediate', rating:4.6 },
            { name:'Financial Planning',   questions:40, duration:60,  difficulty:'intermediate', rating:4.3 },
            { name:'Entrepreneurship',     questions:35, duration:50,  difficulty:'easy',         rating:4.2 },
            { name:'Public Speaking',      questions:30, duration:45,  difficulty:'easy',         rating:4.4 },
        ];

        const certificationTests = [
            { name:'AWS Solutions Architect', questions:65, duration:130, difficulty:'advanced',     rating:4.9 },
            { name:'Google Cloud Professional',questions:60,duration:120, difficulty:'advanced',     rating:4.8 },
            { name:'Microsoft Azure Fundamentals',questions:40,duration:60,difficulty:'intermediate',rating:4.7},
            { name:'Cisco CCNA',              questions:55, duration:90,  difficulty:'advanced',     rating:4.8 },
            { name:'CompTIA Security+',       questions:50, duration:90,  difficulty:'intermediate', rating:4.6 },
            { name:'PMP Certification',       questions:60, duration:120, difficulty:'advanced',     rating:4.9 },
            { name:'Scrum Master',            questions:45, duration:60,  difficulty:'intermediate', rating:4.5 },
            { name:'Six Sigma Green Belt',    questions:50, duration:90,  difficulty:'intermediate', rating:4.4 },
            { name:'ITIL Foundation',         questions:40, duration:60,  difficulty:'intermediate', rating:4.3 },
            { name:'CEH Ethical Hacking',     questions:55, duration:120, difficulty:'advanced',     rating:4.9 },
        ];

        const languageTests = [
            { name:'English Proficiency', questions:50, duration:60,  difficulty:'intermediate', rating:4.7 },
            { name:'Spanish Language',    questions:45, duration:60,  difficulty:'intermediate', rating:4.5 },
            { name:'French Grammar',      questions:40, duration:50,  difficulty:'intermediate', rating:4.4 },
            { name:'German Vocabulary',   questions:35, duration:45,  difficulty:'easy',         rating:4.3 },
            { name:'Japanese Basics',     questions:30, duration:40,  difficulty:'easy',         rating:4.2 },
            { name:'Chinese Characters',  questions:40, duration:60,  difficulty:'advanced',     rating:4.6 },
            { name:'Business English',    questions:45, duration:60,  difficulty:'intermediate', rating:4.5 },
            { name:'TOEFL Preparation',   questions:60, duration:120, difficulty:'advanced',     rating:4.8 },
            { name:'IELTS Practice',      questions:55, duration:120, difficulty:'advanced',     rating:4.9 },
            { name:'Grammar Mastery',     questions:40, duration:50,  difficulty:'intermediate', rating:4.4 },
        ];

        const aptitudeTests = [
            { name:'Quantitative Aptitude', questions:50, duration:60, difficulty:'intermediate', rating:4.6 },
            { name:'Logical Reasoning',     questions:45, duration:50, difficulty:'intermediate', rating:4.7 },
            { name:'Verbal Ability',        questions:40, duration:45, difficulty:'easy',         rating:4.5 },
            { name:'Data Interpretation',   questions:35, duration:50, difficulty:'intermediate', rating:4.4 },
            { name:'Critical Thinking',     questions:30, duration:40, difficulty:'easy',         rating:4.3 },
            { name:'Problem Solving',       questions:45, duration:60, difficulty:'intermediate', rating:4.6 },
            { name:'Analytical Skills',     questions:40, duration:50, difficulty:'intermediate', rating:4.5 },
            { name:'Numerical Ability',     questions:50, duration:60, difficulty:'intermediate', rating:4.4 },
            { name:'Spatial Reasoning',     questions:35, duration:45, difficulty:'easy',         rating:4.2 },
            { name:'Abstract Reasoning',    questions:40, duration:50, difficulty:'intermediate', rating:4.3 },
        ];

        let id = 1;
        const addTests = (arr, category) => arr.forEach(t => this.allTests.push({
            id: id++, ...t, category,
            categoryInfo: categories[category],
            participants: Math.floor(Math.random() * 5000) + 500
        }));

        addTests(programmingTests,   'programming');
        addTests(gkTests,            'gk');
        addTests(courseTests,        'courses');
        addTests(certificationTests, 'certification');
        addTests(languageTests,      'language');
        addTests(aptitudeTests,      'aptitude');

        // Pad to 150+
        const extra = ['programming','gk','courses','certification','language','aptitude'];
        const names  = ['Advanced Concepts','Professional Edition','Expert Level','Beginner Guide',
                        'Complete Course','Master Class','Crash Course','Comprehensive Test',
                        'Practice Exam','Skill Assessment'];
        while (this.allTests.length < 150) {
            const cat  = extra[Math.floor(Math.random()*extra.length)];
            const n    = names[Math.floor(Math.random()*names.length)];
            this.allTests.push({
                id: id++,
                name: `${cat.charAt(0).toUpperCase()+cat.slice(1)} ${n}`,
                questions:    Math.floor(Math.random()*40)+20,
                duration:     Math.floor(Math.random()*60)+30,
                difficulty:   ['easy','intermediate','advanced'][Math.floor(Math.random()*3)],
                rating:       +(Math.random()*0.7+4.0).toFixed(1),
                category:     cat,
                categoryInfo: categories[cat],
                participants: Math.floor(Math.random()*2000)+100
            });
        }

        const el = document.getElementById('totalTests');
        if (el) el.textContent = `${this.allTests.length}+`;
    }

    // ─── Rendering ────────────────────────────────────────────
    renderTests() {
        const grid = document.getElementById('testsGrid');
        if (!grid) return;
        const start  = (this.currentPage - 1) * this.testsPerPage;
        const chunk  = this.filteredTests.slice(start, start + this.testsPerPage);

        if (chunk.length === 0) {
            grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;opacity:.7">
                <i class="fas fa-search" style="font-size:3rem;margin-bottom:15px;display:block"></i>
                No tests found. Try a different search or category.
            </div>`;
            return;
        }

        grid.className = this.currentView === 'list' ? 'tests-list' : 'tests-grid';
        grid.innerHTML = this.currentView === 'list'
            ? chunk.map(t => this.createListItem(t)).join('')
            : chunk.map(t => this.createCard(t)).join('');

        this.updateActiveCategoryTab();
    }

    createCard(test) {
        const dc = { easy:'#4cc9f0', intermediate:'#ff9e00', advanced:'#f72585' };
        const c  = test.categoryInfo;
        return `
        <div class="test-card" data-category="${test.category}">
            <div class="test-card-header">
                <div class="test-category" style="background:${c.color}20;color:${c.color};border:1px solid ${c.color}40;padding:4px 10px;border-radius:20px;font-size:.8rem;display:inline-flex;align-items:center;gap:6px">
                    <i class="fas ${c.icon}"></i>
                    <span>${test.category.charAt(0).toUpperCase()+test.category.slice(1)}</span>
                </div>
                <div class="test-rating" style="display:flex;align-items:center;gap:4px;color:#ff9e00">
                    <i class="fas fa-star"></i>
                    <span>${test.rating}</span>
                </div>
            </div>
            <div class="test-card-body">
                <h3 class="test-title">${test.name}</h3>
                <p class="test-description">Test your knowledge with ${test.questions} carefully crafted questions</p>
                <div class="test-meta">
                    <div class="meta-item"><i class="fas fa-question-circle"></i><span>${test.questions} Qs</span></div>
                    <div class="meta-item"><i class="fas fa-clock"></i><span>${test.duration} min</span></div>
                    <div class="meta-item"><i class="fas fa-users"></i><span>${this.fmt(test.participants)}</span></div>
                </div>
                <span class="difficulty-badge" style="background:${dc[test.difficulty]}20;color:${dc[test.difficulty]};border:1px solid ${dc[test.difficulty]}40;padding:3px 10px;border-radius:20px;font-size:.8rem">
                    ${test.difficulty.charAt(0).toUpperCase()+test.difficulty.slice(1)}
                </span>
            </div>
            <div class="test-card-footer">
                <button class="start-test-btn" onclick="startTest(${test.id},'${test.name.replace(/'/g,"\\'")}')">
                    <i class="fas fa-play-circle"></i> Start Test
                </button>
                <button class="view-details-btn" onclick="viewTestDetails(${test.id})">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>`;
    }

    createListItem(test) {
        const dc = { easy:'#4cc9f0', intermediate:'#ff9e00', advanced:'#f72585' };
        const c  = test.categoryInfo;
        return `
        <div class="test-list-item" data-category="${test.category}">
            <div style="display:flex;align-items:center;gap:15px;flex:1;flex-wrap:wrap">
                <div style="width:42px;height:42px;border-radius:10px;background:${c.color}20;display:flex;align-items:center;justify-content:center;color:${c.color};flex-shrink:0">
                    <i class="fas ${c.icon}"></i>
                </div>
                <div style="flex:1;min-width:0">
                    <h3 style="margin:0 0 5px;font-size:1rem">${test.name}</h3>
                    <div style="display:flex;gap:15px;flex-wrap:wrap;font-size:.85rem;opacity:.7">
                        <span><i class="fas fa-question-circle"></i> ${test.questions} Qs</span>
                        <span><i class="fas fa-clock"></i> ${test.duration} min</span>
                        <span><i class="fas fa-users"></i> ${this.fmt(test.participants)}</span>
                        <span><i class="fas fa-star" style="color:#ff9e00"></i> ${test.rating}</span>
                    </div>
                </div>
                <span class="difficulty-badge" style="background:${dc[test.difficulty]}20;color:${dc[test.difficulty]};border:1px solid ${dc[test.difficulty]}40;padding:3px 10px;border-radius:20px;font-size:.8rem;white-space:nowrap">
                    ${test.difficulty.charAt(0).toUpperCase()+test.difficulty.slice(1)}
                </span>
            </div>
            <div style="display:flex;gap:10px;margin-top:10px">
                <button class="start-test-btn" onclick="startTest(${test.id},'${test.name.replace(/'/g,"\\'")}')">
                    <i class="fas fa-play-circle"></i> Start
                </button>
                <button class="view-details-btn" onclick="viewTestDetails(${test.id})">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>`;
    }

    renderPagination() {
        const pag = document.getElementById('pagination');
        if (!pag) return;
        const total = Math.ceil(this.filteredTests.length / this.testsPerPage);
        if (total <= 1) { pag.innerHTML = ''; return; }

        let html = `<button class="page-btn${this.currentPage===1?' disabled':''}" onclick="testsPage.goToPage(${this.currentPage-1})" ${this.currentPage===1?'disabled':''}><i class="fas fa-chevron-left"></i></button>`;

        let s = Math.max(1, this.currentPage - 2);
        let e = Math.min(total, s + 4);
        if (e - s < 4) s = Math.max(1, e - 4);

        for (let i = s; i <= e; i++) {
            html += `<button class="page-btn${i===this.currentPage?' active':''}" onclick="testsPage.goToPage(${i})">${i}</button>`;
        }

        html += `<button class="page-btn${this.currentPage===total?' disabled':''}" onclick="testsPage.goToPage(${this.currentPage+1})" ${this.currentPage===total?'disabled':''}><i class="fas fa-chevron-right"></i></button>`;
        pag.innerHTML = html;
    }

    goToPage(page) {
        const total = Math.ceil(this.filteredTests.length / this.testsPerPage);
        if (page < 1 || page > total) return;
        this.currentPage = page;
        this.renderTests();
        this.renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        this.filteredTests = category === 'all'
            ? [...this.allTests]
            : this.allTests.filter(t => t.category === category);
        this.applySort();
        this.renderTests();
        this.renderPagination();
        this.updateActiveCategoryTab();
    }

    search() {
        const term = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
        if (!term) { this.filterByCategory(this.currentCategory); return; }
        this.filteredTests = this.allTests.filter(t =>
            t.name.toLowerCase().includes(term) || t.category.toLowerCase().includes(term)
        );
        this.currentPage = 1;
        this.renderTests();
        this.renderPagination();
    }

    applySort() {
        const v = document.getElementById('sortSelect')?.value || 'popular';
        const order = { easy:1, intermediate:2, advanced:3 };
        switch (v) {
            case 'popular':    this.filteredTests.sort((a,b) => b.participants - a.participants); break;
            case 'newest':     this.filteredTests.sort((a,b) => b.id - a.id); break;
            case 'name':       this.filteredTests.sort((a,b) => a.name.localeCompare(b.name)); break;
            case 'difficulty': this.filteredTests.sort((a,b) => order[a.difficulty] - order[b.difficulty]); break;
            case 'duration':   this.filteredTests.sort((a,b) => a.duration - b.duration); break;
        }
        this.renderTests();
    }

    changeView(view) {
        this.currentView = view;
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`.view-btn[onclick*="${view}"]`)?.classList.add('active');
        this.renderTests();
    }

    updateActiveCategoryTab() {
        document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.category-tab[data-category="${this.currentCategory}"]`)?.classList.add('active');
    }

    fmt(n) { return n >= 1000 ? (n/1000).toFixed(1)+'k' : String(n); }

    setupEventListeners() {
        document.getElementById('searchInput')?.addEventListener('keypress', e => {
            if (e.key === 'Enter') this.search();
        });
    }

    checkSession() {
        fetch("php/session.php")
            .then(r => r.text())
            .then(data => {
                if (data && data.trim()) {
                    const u = document.getElementById('user');
                    if (u) u.innerText = 'Welcome, ' + data.trim();
                    document.querySelectorAll('.btn-login,.btn-register').forEach(el => el.style.display='none');
                    const lb = document.getElementById('logoutBtn');
                    if (lb) lb.style.display='flex';
                }
            })
            .catch(err => console.error(err));
    }
}

// ─── Init ────────────────────────────────────────────────────
let testsPage;
document.addEventListener('DOMContentLoaded', () => { testsPage = new TestsPage(); });

// ─── Global helpers called from HTML onclick attrs ────────────
function filterTestsByCategory(cat) { testsPage?.filterByCategory(cat); }
function searchTests()              { testsPage?.search(); }
function sortTests()                { testsPage?.applySort(); }
function changeView(v)              { testsPage?.changeView(v); }

function viewTestDetails(testId) {
    const test = testsPage?.allTests.find(t => t.id === testId);
    if (!test) return;
    alert(`📋 ${test.name}\n\nCategory: ${test.category}\nQuestions: ${test.questions}\nDuration: ${test.duration} minutes\nDifficulty: ${test.difficulty}\nRating: ${test.rating}⭐\nParticipants: ${test.participants.toLocaleString()}`);
}

// ─── Auth functions (duplicated here for tests.html standalone) ──
function startTest(testId, testName) {
    fetch("php/session.php")
        .then(r => r.text())
        .then(data => {
            if (data && data.trim()) {
                window.location.href = `test.html?test=${testId}`;
            } else {
                alert('Please login to take the test');
                openLogin();
            }
        })
        .catch(() => openLogin());
}

function openLogin() {
    const o = document.getElementById('loginOverlay');
    if (o) o.style.display = 'flex';
    const r = document.getElementById('registerOverlay');
    if (r) r.style.display = 'none';
}

function openRegister() {
    const o = document.getElementById('registerOverlay');
    if (o) o.style.display = 'flex';
    const l = document.getElementById('loginOverlay');
    if (l) l.style.display = 'none';
}

function closeAll() {
    document.querySelectorAll('.popup-overlay').forEach(el => el.style.display='none');
}

function switchToRegister() { closeAll(); setTimeout(openRegister, 10); }
function switchToLogin()    { closeAll(); setTimeout(openLogin, 10); }

function togglePassword(fieldId) {
    const f = document.getElementById(fieldId);
    const i = f.parentNode.querySelector('.toggle-password');
    if (f.type === 'password') { f.type='text';     i.classList.replace('fa-eye','fa-eye-slash'); }
    else                       { f.type='password'; i.classList.replace('fa-eye-slash','fa-eye'); }
}

function login() {
    const email = document.getElementById('lemail').value.trim();
    const pass  = document.getElementById('lpass').value;
    if (!email || !pass) { alert('Please fill in all fields'); return; }
    fetch("php/login.php", {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`
    }).then(r=>r.text()).then(d => {
        if (d.trim()==='success') { closeAll(); setTimeout(()=>location.reload(),300); }
        else alert('Login failed. Please check your credentials.');
    }).catch(()=>alert('Network error.'));
}

function register() {
    const name  = document.getElementById('rname').value.trim();
    const email = document.getElementById('remail').value.trim();
    const pass  = document.getElementById('rpass').value;
    const conf  = document.getElementById('rcpass')?.value || pass;
    if (!name||!email||!pass||!conf) { alert('Please fill in all fields'); return; }
    if (pass !== conf) { alert('Passwords do not match'); return; }
    if (pass.length < 8) { alert('Password must be at least 8 characters'); return; }
    fetch("php/register.php", {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:`fullname=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`
    }).then(r=>r.text()).then(d => {
        if (d.trim()==='success') { alert('Registered! You can now login.'); closeAll(); setTimeout(openLogin,300); }
        else if (d.trim()==='duplicate') alert('Email already registered.');
        else alert('Registration failed: '+d);
    }).catch(()=>alert('Network error.'));
}

function logout() {
    fetch("php/logout.php").finally(()=>location.reload());
}

// Close on overlay click
document.addEventListener('click', e => {
    document.querySelectorAll('.popup-overlay').forEach(o => { if(e.target===o) closeAll(); });
});
