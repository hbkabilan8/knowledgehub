// ============================================================
// KnowledgeHub - Test Session (test.js)
// ============================================================

class TestManager {
    constructor() {
        this.currentTest          = null;
        this.questions            = [];
        this.currentQuestionIndex = 0;
        this.userAnswers          = {};
        this.timer                = null;
        this.timeLimit            = 3600;
        this.timeRemaining        = 3600;
        this.init();
    }

    init() {
        const testId = new URLSearchParams(window.location.search).get('test');
        if (!testId) { this.showError('No test specified.'); return; }
        this.loadTest(testId);
    }

    loadTest(testId) {
        const tests = {
            '1': { id:1, name:'JavaScript Mastery',   category:'programming', duration:60, difficulty:'easy' },
            '2': { id:2, name:'Python Programming',   category:'programming', duration:45, difficulty:'intermediate' },
            '3': { id:3, name:'Current Affairs 2024', category:'gk',          duration:30, difficulty:'easy' },
            '4': { id:4, name:'World History',        category:'gk',          duration:75, difficulty:'advanced' },
            '5': { id:5, name:'Database Management',  category:'courses',     duration:50, difficulty:'intermediate' },
            '6': { id:6, name:'Cyber Security',       category:'courses',     duration:90, difficulty:'advanced' },
            '7': { id:7, name:'Machine Learning',     category:'programming', duration:60, difficulty:'advanced' },
            '8': { id:8, name:'Science & Technology', category:'gk',          duration:40, difficulty:'intermediate' },
        };

        this.currentTest = tests[testId] || {
            id: parseInt(testId), name:'General Knowledge Test', category:'gk', duration:30, difficulty:'easy'
        };

        this.loadQuestions(testId);
        this.timeLimit     = this.currentTest.duration * 60;
        this.timeRemaining = this.timeLimit;
        this.renderTest();
        this.startTimer();
    }

    loadQuestions(testId) {
        const bank = {
            '1': [
                { question:'What does JavaScript primarily add to web pages?',         options:['Styling and layout','Interactivity and dynamic behavior','Database connectivity','Server-side processing'], correct:1 },
                { question:'Which keyword declares a block-scoped variable?',           options:['var','let','const','Both let and const'], correct:3 },
                { question:'What is the result of: typeof null?',                       options:['"null"','"object"','"undefined"','"number"'], correct:1 },
                { question:'Which method adds an element to the END of an array?',      options:['push()','pop()','shift()','unshift()'], correct:0 },
                { question:'What does === check?',                                      options:['Value only','Type only','Value AND type','Neither'], correct:2 },
                { question:'Which is NOT a JavaScript framework?',                      options:['React','Angular','Vue','Django'], correct:3 },
                { question:'What is a closure in JavaScript?',                          options:['A function with access to its outer scope','A way to close browser windows','A method to stop execution','A type of variable'], correct:0 },
                { question:'What does JSON stand for?',                                 options:['JavaScript Object Notation','JavaScript Online Network','Java Source Object Notation','JavaScript Oriented Notation'], correct:0 },
                { question:'Which converts a JSON string to a JS object?',             options:['JSON.parse()','JSON.stringify()','JSON.convert()','JSON.toObject()'], correct:0 },
                { question:'What is the purpose of "use strict"?',                     options:['Stricter parsing and error handling','Makes code run faster','Enables new features','Disables deprecated features'], correct:0 },
            ],
            '2': [
                { question:'Which keyword defines a function in Python?',              options:['function','def','func','define'], correct:1 },
                { question:'What is the output of print(type([]))?',                   options:["<class 'list'>",'<list>','list','[]'], correct:0 },
                { question:'How do you create a virtual environment in Python?',        options:['python -m venv env','python venv env','virtualenv create env','python create env'], correct:0 },
                { question:'Which Python data structure uses key-value pairs?',         options:['List','Tuple','Dictionary','Set'], correct:2 },
                { question:'What does PEP 8 define?',                                  options:['Performance optimizations','Style guide for Python code','Package management','Error handling'], correct:1 },
                { question:'Which built-in function returns length of an object?',     options:['size()','len()','count()','length()'], correct:1 },
                { question:'What is a Python decorator?',                              options:['A function that modifies another function','A way to style output','A loop construct','A data type'], correct:0 },
                { question:'How are Python lists different from tuples?',              options:['Lists are faster','Tuples are mutable','Lists are mutable','No difference'], correct:2 },
                { question:'Which module is used for regular expressions?',             options:['regex','re','regexp','pattern'], correct:1 },
                { question:'What does __init__ do in a Python class?',                options:['Deletes an object','Initializes a new object','Copies a class','Imports a module'], correct:1 },
            ],
            '3': [
                { question:'Which country hosted the G20 Summit in 2023?',             options:['Brazil','India','Germany','South Africa'], correct:1 },
                { question:'Who is the UN Secretary-General since 2017?',              options:['Ban Ki-moon','António Guterres','Kofi Annan','Boutros-Ghali'], correct:1 },
                { question:'Which country launched the world\'s first AI news anchor?',options:['USA','China','Japan','South Korea'], correct:1 },
                { question:'The 2024 Summer Olympics are held in?',                    options:['Los Angeles','Tokyo','Paris','London'], correct:2 },
                { question:'Which country was 5th to land on the Moon in 2023?',       options:['China','USA','Russia','India'], correct:3 },
                { question:'ChatGPT was developed by?',                                options:['Google','Microsoft','OpenAI','Meta'], correct:2 },
                { question:'Which country joined NATO in April 2023?',                  options:['Sweden','Finland','Ukraine','Georgia'], correct:1 },
                { question:'The 2023 Cricket World Cup was won by?',                   options:['India','Australia','England','South Africa'], correct:1 },
                { question:'Which platform rebranded to "X" in 2023?',                options:['Facebook','Instagram','Twitter','Snapchat'], correct:2 },
                { question:'Who became President of Argentina in December 2023?',      options:['Alberto Fernández','Javier Milei','Sergio Massa','Mauricio Macri'], correct:1 },
            ],
            '4': [
                { question:'When did World War I begin?',                              options:['1912','1914','1916','1918'], correct:1 },
                { question:'Which civilization built the Great Pyramids?',              options:['Roman','Greek','Egyptian','Mesopotamian'], correct:2 },
                { question:'The French Revolution began in?',                          options:['1776','1789','1799','1804'], correct:1 },
                { question:'Who wrote the Communist Manifesto?',                       options:['Lenin & Stalin','Marx & Engels','Mao & Lenin','Engels & Stalin'], correct:1 },
                { question:'The Berlin Wall fell in?',                                 options:['1987','1988','1989','1991'], correct:2 },
                { question:'The largest empire in history by land area was?',          options:['Roman Empire','British Empire','Mongol Empire','Ottoman Empire'], correct:2 },
                { question:'The Renaissance originated in?',                           options:['France','Germany','Italy','Spain'], correct:2 },
                { question:'Who was the first US President?',                          options:['John Adams','Benjamin Franklin','Thomas Jefferson','George Washington'], correct:3 },
                { question:'The Cold War was primarily between?',                      options:['USA & China','USA & USSR','UK & Germany','France & Russia'], correct:1 },
                { question:'Mahatma Gandhi was assassinated in?',                      options:['1945','1947','1948','1950'], correct:2 },
            ],
            '5': [
                { question:'What does SQL stand for?',                                 options:['Standard Query Language','Structured Query Language','Simple Query Language','System Query Language'], correct:1 },
                { question:'Which SQL clause filters rows?',                           options:['HAVING','ORDER BY','WHERE','GROUP BY'], correct:2 },
                { question:'What is a primary key?',                                   options:['Any column','A unique row identifier','A foreign reference','An index'], correct:1 },
                { question:'Which normal form eliminates transitive dependencies?',    options:['1NF','2NF','3NF','BCNF'], correct:2 },
                { question:'ACID in databases stands for?',                            options:['Atomicity Consistency Isolation Durability','Access Control Index Data','Automatic Consistent Indexed Durable','None'], correct:0 },
                { question:'Which JOIN returns all rows from both tables?',            options:['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL OUTER JOIN'], correct:3 },
                { question:'A foreign key is?',                                        options:['A key from another country','A reference to another table\'s primary key','A duplicate key','An index'], correct:1 },
                { question:'Which command removes ALL rows without logging?',          options:['DELETE','DROP','TRUNCATE','REMOVE'], correct:2 },
                { question:'What does GROUP BY do?',                                   options:['Sorts results','Groups rows by a column','Filters rows','Joins tables'], correct:1 },
                { question:'NoSQL databases are best for?',                            options:['Complex joins','Fixed schemas','Flexible unstructured data','Small datasets only'], correct:2 },
            ],
            '6': [
                { question:'CIA triad in security stands for?',                        options:['Confidentiality Integrity Availability','Control Identity Access','Cyber Intelligence Analysis','None'], correct:0 },
                { question:'What is a phishing attack?',                               options:['A DDoS attack','Deceiving users to reveal sensitive info','Breaking encryption','Physical malware install'], correct:1 },
                { question:'Which protocol encrypts web traffic?',                     options:['HTTP','FTP','HTTPS','SMTP'], correct:2 },
                { question:'A zero-day vulnerability is?',                             options:['An old known exploit','An unpatched vulnerability unknown to vendor','A test vulnerability','A planned patch'], correct:1 },
                { question:'A firewall\'s purpose is to?',                             options:['Speed up the network','Monitor and control network traffic','Encrypt data','Store backups'], correct:1 },
                { question:'2FA stands for?',                                          options:['Two-Factor Authentication','Two-Frame Access','Trusted Firewall Access','None'], correct:0 },
                { question:'Which attack overwhelms a server with traffic?',           options:['Phishing','Man-in-the-middle','DDoS','SQL injection'], correct:2 },
                { question:'Which hashing algorithm is considered broken?',            options:['SHA-256','SHA-3','MD5','bcrypt'], correct:2 },
                { question:'Social engineering in cybersecurity means?',               options:['Programming social apps','Manipulating people to reveal info','Building social networks','None'], correct:1 },
                { question:'A VPN primarily provides?',                                options:['Faster speeds','Encrypted private connection','Free Wi-Fi','Antivirus protection'], correct:1 },
            ],
        };

        this.questions = bank[testId] || bank['1'];
    }

    // ─── Rendering ───────────────────────────────────────────
    renderTest() {
        const c = document.getElementById('testContainer');
        c.innerHTML = `
            <div class="test-header">
                <div class="test-info">
                    <div class="test-title-section">
                        <h1>${this.currentTest.name}</h1>
                        <div class="test-meta">
                            <span><i class="fas fa-question-circle"></i> ${this.questions.length} Questions</span>
                            <span><i class="fas fa-clock"></i> ${this.currentTest.duration} Minutes</span>
                            <span><i class="fas fa-signal"></i> ${this.cap(this.currentTest.difficulty)}</span>
                        </div>
                    </div>
                    <div class="timer-section">
                        <div class="timer" id="timer">${this.formatTime(this.timeRemaining)}</div>
                        <div class="timer-label">Time Remaining</div>
                    </div>
                </div>
            </div>
            <div class="test-content">
                <div class="main-content">
                    <div class="question-section" id="questionSection"></div>
                    <div class="navigation-buttons" id="navigationButtons"></div>
                </div>
                <div class="sidebar">
                    <h3 style="margin:0 0 15px">Question Navigator</h3>
                    <div class="questions-grid" id="questionsGrid"></div>
                    <div class="legend">
                        <div class="legend-item"><div class="legend-color current"></div><span>Current</span></div>
                        <div class="legend-item"><div class="legend-color answered"></div><span>Answered</span></div>
                        <div class="legend-item"><div class="legend-color unanswered"></div><span>Unanswered</span></div>
                    </div>
                    <div style="margin-top:20px;padding:15px;background:rgba(247,37,133,.1);border-radius:10px;border:1px solid rgba(247,37,133,.2);text-align:center">
                        <div style="font-size:.85rem;opacity:.7;margin-bottom:5px">Answered</div>
                        <div id="answeredCount" style="font-size:1.4rem;font-weight:700;color:var(--primary)">0/${this.questions.length}</div>
                    </div>
                </div>
            </div>`;

        this.renderQuestion();
        this.renderIndicators();
        this.renderNavButtons();
    }

    renderQuestion() {
        const el = document.getElementById('questionSection');
        const q  = this.questions[this.currentQuestionIndex];
        if (!el || !q) return;

        el.innerHTML = `
            <div class="question-number">Question ${this.currentQuestionIndex + 1} <span style="opacity:.5">/ ${this.questions.length}</span></div>
            <div class="question-text">${q.question}</div>
            <div class="options-container">
                ${q.options.map((opt, i) => `
                    <div class="option ${this.userAnswers[this.currentQuestionIndex] === i ? 'selected' : ''}"
                         onclick="testManager.selectAnswer(${i})">
                        <div class="option-radio"></div>
                        <div class="option-text"><strong>${String.fromCharCode(65+i)}.</strong> ${opt}</div>
                    </div>`).join('')}
            </div>`;
    }

    renderIndicators() {
        const el = document.getElementById('questionsGrid');
        if (!el) return;
        el.innerHTML = this.questions.map((_,i) => {
            let cls = 'question-indicator';
            if (i === this.currentQuestionIndex) cls += ' current';
            else if (this.userAnswers[i] !== undefined) cls += ' answered';
            return `<div class="${cls}" onclick="testManager.goToQuestion(${i})">${i+1}</div>`;
        }).join('');

        const cnt = document.getElementById('answeredCount');
        if (cnt) cnt.textContent = `${Object.keys(this.userAnswers).length}/${this.questions.length}`;
    }

    renderNavButtons() {
        const el    = document.getElementById('navigationButtons');
        if (!el) return;
        const first = this.currentQuestionIndex === 0;
        const last  = this.currentQuestionIndex === this.questions.length - 1;
        el.innerHTML = `
            <button class="nav-btn" onclick="testManager.prevQuestion()" ${first?'disabled':''}>
                <i class="fas fa-arrow-left"></i> Previous
            </button>
            <span style="flex:1"></span>
            <button class="nav-btn submit-btn" onclick="testManager.confirmSubmit()">
                <i class="fas fa-check-circle"></i> ${last ? 'Submit Test' : 'Finish Early'}
            </button>
            ${!last ? `<button class="nav-btn" onclick="testManager.nextQuestion()" style="margin-left:10px">
                Next <i class="fas fa-arrow-right"></i></button>` : ''}`;
    }

    selectAnswer(idx) {
        this.userAnswers[this.currentQuestionIndex] = idx;
        this.renderQuestion();
        this.renderIndicators();
    }

    goToQuestion(idx) {
        if (idx >= 0 && idx < this.questions.length) {
            this.currentQuestionIndex = idx;
            this.renderQuestion();
            this.renderIndicators();
            this.renderNavButtons();
        }
    }

    prevQuestion() { if (this.currentQuestionIndex > 0) this.goToQuestion(this.currentQuestionIndex - 1); }
    nextQuestion() { if (this.currentQuestionIndex < this.questions.length - 1) this.goToQuestion(this.currentQuestionIndex + 1); }

    startTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            if (this.timeRemaining <= 0) {
                clearInterval(this.timer);
                alert('Time is up! Submitting your test...');
                this.doSubmit();
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const el = document.getElementById('timer');
        if (!el) return;
        el.textContent = this.formatTime(this.timeRemaining);
        if (this.timeRemaining < 300) el.style.color = 'var(--accent)';
    }

    formatTime(s) {
        return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
    }

    confirmSubmit() {
        clearInterval(this.timer);
        const unanswered = this.questions.length - Object.keys(this.userAnswers).length;
        const msg = unanswered > 0
            ? `You have ${unanswered} unanswered question(s).\nSubmit anyway?`
            : 'Submit the test now?';
        if (confirm(msg)) { this.doSubmit(); }
        else { this.startTimer(); }
    }

    doSubmit() {
        clearInterval(this.timer);
        const result   = this.calcScore();
        const timeTaken = this.timeLimit - this.timeRemaining;

        fetch("php/save_test.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                testId: this.currentTest.id,
                score: result.score,
                totalQuestions: result.total,
                percentage: result.pct,
                timeTaken
            })
        }).finally(() => this.showResults(result, timeTaken));
    }

    calcScore() {
        let score = 0;
        this.questions.forEach((q, i) => { if (this.userAnswers[i] === q.correct) score++; });
        return { score, total: this.questions.length, pct: Math.round((score / this.questions.length) * 100) };
    }

    showResults(result, timeTaken) {
        const c    = document.getElementById('testContainer');
        const pct  = result.pct;
        const col  = pct >= 80 ? '#4cc9f0' : pct >= 60 ? '#ff9e00' : pct >= 40 ? '#f72585' : '#e74c3c';
        const msg  = pct >= 80 ? 'Excellent! 🏆' : pct >= 60 ? 'Good Job! 👍' : pct >= 40 ? 'Keep Practicing! 📚' : 'Needs Improvement 💪';

        const review = this.questions.map((q, i) => {
            const ua = this.userAnswers[i];
            const ok = ua === q.correct;
            return `<div style="background:rgba(255,255,255,.05);border-radius:10px;padding:15px 20px;margin-bottom:12px;border-left:4px solid ${ok?'#4cc9f0':'#f72585'}">
                <div style="font-weight:600;margin-bottom:8px">Q${i+1}. ${q.question}</div>
                ${q.options.map((opt,oi)=>{
                    let s='padding:5px 12px;border-radius:6px;margin:2px 0;font-size:.85rem;';
                    if(oi===q.correct) s+='background:rgba(76,201,240,.15);color:#4cc9f0;font-weight:600;';
                    else if(oi===ua&&!ok) s+='background:rgba(247,37,133,.15);color:#f72585;';
                    else s+='opacity:.5;';
                    const icon=oi===q.correct?'✓ ':(oi===ua&&!ok?'✗ ':'');
                    return `<div style="${s}">${icon}${opt}</div>`;
                }).join('')}
                ${ua===undefined?'<div style="color:#ff9e00;font-size:.85rem;margin-top:4px">⚠ Not answered</div>':''}
            </div>`;
        }).join('');

        c.innerHTML = `
            <div class="results-container">
                <div class="results-card">
                    <h1 style="margin-bottom:10px">Test Completed! 🎉</h1>
                    <p style="color:rgba(255,255,255,.7);margin-bottom:30px">${this.currentTest.name}</p>
                    <div style="width:180px;height:180px;border-radius:50%;background:conic-gradient(${col} ${pct}%,rgba(255,255,255,.1) ${pct}%);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;position:relative">
                        <div style="width:140px;height:140px;background:rgba(15,12,41,.95);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;position:absolute">
                            <span style="font-size:2.2rem;font-weight:700;color:${col}">${pct}%</span>
                        </div>
                    </div>
                    <h2 style="color:${col};margin-bottom:25px">${msg}</h2>
                    <div class="results-details">
                        <div class="result-item"><h3>Correct</h3><p>${result.score}/${result.total}</p></div>
                        <div class="result-item"><h3>Wrong</h3><p>${result.total-result.score}</p></div>
                        <div class="result-item"><h3>Time Taken</h3><p>${this.formatTime(timeTaken)}</p></div>
                        <div class="result-item"><h3>Score</h3><p>${result.score*10} pts</p></div>
                    </div>
                    <div class="action-buttons">
                        <button class="action-btn retry-btn" onclick="testManager.retryTest()"><i class="fas fa-redo"></i> Retry</button>
                        <button class="action-btn home-btn" onclick="window.location.href='index.html'"><i class="fas fa-home"></i> Home</button>
                        <button class="action-btn home-btn" onclick="window.location.href='tests.html'" style="background:linear-gradient(45deg,#4cc9f0,#7209b7)"><i class="fas fa-list"></i> All Tests</button>
                    </div>
                    <div style="margin-top:40px;text-align:left">
                        <h3 style="margin-bottom:15px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.1)"><i class="fas fa-clipboard-check"></i> Answer Review</h3>
                        ${review}
                    </div>
                </div>
            </div>`;
    }

    retryTest() {
        this.userAnswers = {};
        this.currentQuestionIndex = 0;
        this.timeRemaining = this.timeLimit;
        this.renderTest();
        this.startTimer();
    }

    showError(msg) {
        const c = document.getElementById('testContainer');
        if (c) c.innerHTML = `<div style="text-align:center;padding:60px;opacity:.7">
            <i class="fas fa-exclamation-triangle" style="font-size:3rem;margin-bottom:15px;display:block;color:var(--accent)"></i>
            ${msg}<br><br>
            <button class="action-btn home-btn" onclick="window.location.href='index.html'" style="margin:auto">Go Home</button></div>`;
    }

    cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

    setupKeyboard() {
        document.addEventListener('keydown', e => {
            if (!this.currentTest) return;
            if (e.key==='ArrowLeft')  this.prevQuestion();
            if (e.key==='ArrowRight') this.nextQuestion();
            if (['1','2','3','4'].includes(e.key)) this.selectAnswer(parseInt(e.key)-1);
        });
    }
}

// Auth helpers for test.html
function openLogin()  { const o=document.getElementById('loginOverlay'); if(o) o.style.display='flex'; }
function closeAll()   { document.querySelectorAll('.popup-overlay').forEach(el=>el.style.display='none'); }
function switchToRegister() { closeAll(); setTimeout(openLogin,10); }
function togglePassword(id) {
    const f=document.getElementById(id); const i=f.parentNode.querySelector('.toggle-password');
    if(f.type==='password'){f.type='text';i.classList.replace('fa-eye','fa-eye-slash');}
    else{f.type='password';i.classList.replace('fa-eye-slash','fa-eye');}
}
function login() {
    const e=document.getElementById('lemail').value.trim(), p=document.getElementById('lpass').value;
    if(!e||!p){alert('Fill in all fields');return;}
    fetch("php/login.php",{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:`email=${encodeURIComponent(e)}&password=${encodeURIComponent(p)}`})
    .then(r=>r.text()).then(d=>{if(d.trim()==='success'){closeAll();location.reload();}else alert('Login failed.');});
}

// Boot
let testManager;
document.addEventListener('DOMContentLoaded', () => {
    testManager = new TestManager();
    testManager.setupKeyboard();
});
