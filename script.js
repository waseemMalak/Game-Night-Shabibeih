// =========================================================
// 🍬 من سيربح البونبون؟ — script.js
// =========================================================


// =========================
// CONFIG
// =========================

const pointValues = [100, 200, 300, 400, 500];

const MIN_TEAMS = 1;
const MAX_TEAMS = 5;

const DEFAULT_TIME = 30;


// =========================================================
// 🧠 MEMORY CHALLENGE IMAGE
// =========================================================

const MEMORY_IMAGE_PATH = "./images/memory-object.png";


// =========================
// ARABIC UI TEXT
// =========================

const TEXT = {
    setupSubtitle: "إعداد اللعبة",
    teams: "فرق",
    startGame: "ابدأ اللعبة",
    answer: "الإجابة",
    challengeLabel: "نوع التحدي",
    scoringRule: "قاعدة النقاط",
    correct: "✓ صحيح",
    wrong: "✕ خطأ",
    wrongTitle: "إجابة خاطئة",
    chooseTeam: "اختاروا فريقاً ليحصل على الفرصة التالية.",
    nobody: "لا أحد يعرف الإجابة",
    allTeams: "كل الفرق",
    confirmPoints: "✓ تأكيد النقاط",
    timerStart: "▶ ابدأ المؤقت",
    timerPause: "⏸ إيقاف",
    timerRestart: "↻ إعادة",
    close: "إغلاق",

    memoryRemembering:
        "🧠 احفظوا أكبر عدد ممكن من الأشياء!",

    memoryFinished:
        "⏰ انتهى الوقت! اذكروا الأشياء التي تذكرونها.",

    teamLabel: n => `Team ${n}`,

    turn: name => `${name}'s Turn`
};


// =========================
// SOUNDS
// =========================

const correctSound =
    new Audio("./sounds/correct.mp3");

const wrongSound =
    new Audio("./sounds/wrong.mp3");

correctSound.preload = "auto";
wrongSound.preload = "auto";

correctSound.volume = 0.8;
wrongSound.volume = 0.8;

correctSound.addEventListener("error", () => {
    console.error(
        "❌ Could not load sounds/correct.mp3"
    );
});

wrongSound.addEventListener("error", () => {
    console.error(
        "❌ Could not load sounds/wrong.mp3"
    );
});

function playSound(sound) {

    sound.currentTime = 0;

    sound.play().catch(error => {
        console.error(
            "Could not play sound:",
            error
        );
    });
}


// =========================
// TIMER BEEP
// =========================

function beep() {

    try {

        const AudioCtx =
            window.AudioContext ||
            window.webkitAudioContext;

        const ctx =
            new AudioCtx();

        const osc =
            ctx.createOscillator();

        const gain =
            ctx.createGain();

        osc.frequency.value = 880;
        gain.gain.value = 0.15;

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();

        osc.stop(
            ctx.currentTime + 0.45
        );

        osc.onended = () => ctx.close();

    } catch (error) {

        console.error(
            "Could not play beep:",
            error
        );
    }
}


// =========================================================
// QUESTIONS
// =========================================================

const categories = [

    // =====================================================
    // 🎬 أفلام وموسيقى
    // =====================================================

    {
        name: "أفلام وموسيقى",

        questions: {

            100: {
                question:
                    "فيلم عربي تدور أحداثه حول شاب يعود من الخارج إلى بلده، ويصطدم بالفارق الكبير بين الصورة التي يحملها عن البلد والواقع الذي يجده. الفيلم من بطولة أحمد حلمي. ما الفيلم؟",
                answer: "عسل أسود"
            },

            200: {
                question:
                    "طفل يبقى وحده في المنزل ويواجه لصّين.",
                answer: "Home Alone"
            },

            300: {
                question:
                    "تحدي: سيتم تشغيل أول 10 ثوانٍ من أغنية. على الفريق معرفة اسم الأغنية.",
                answer: "Nano"
            },

            400: {
                question:
                    "من صاحبة أغنية بتونس بيك",
                answer: "وردة الجزائرية"
            },

            500: {
                question:
                    "ما الاسم الحقيقي للفنانة فيروز؟",
                answer: "نهاد حداد"
            }
        }
    },


    // =====================================================
    // 👤 من أنا؟
    // =====================================================

    {
        name: "من أنا؟",

        questions: {

            100: {
                question:
                    "أنا تلميذ ليسوع، وأنكرت أنني أعرفه ثلاث مرات. من أنا؟",
                answer: "بطرس"
            },

            200: {
                question:
                    "أنا أول إنسان مشى على سطح القمر. من أنا؟",
                answer: "نيل أرمسترونغ"
            },

            300: {
                question:
                    "أنا ممثل سوري اشتهرت بشخصية «أبو شهاب» في باب الحارة. من أنا؟",
                answer: "سامر المصري"
            },

            400: {
                question:
                    "أنا قائد فرنسي، أصبحت إمبراطورًا، خضت معارك عديدة في أوروبا، وانتهى بي الأمر منفياً في جزيرة سانت هيلينا. من أنا؟",
                answer: "نابليون بونابرت"
            },

            500: {
                question:
                    "أنا مؤلف مسرحية «روميو وجولييت». من أنا؟",
                answer: "وليام شكسبير"
            }
        }
    },


    // =====================================================
    // 📖 الكتاب المقدس
    // =====================================================

    {
        name: "الكتاب المقدس",

        questions: {

            100: {
                question:
                    "ما اسم الجبل الذي تلقّى عليه موسى الوصايا العشر؟",
                answer: "جبل سيناء"
            },

            200: {
                question:
                    "من هو الرجل الذي حمل صليب يسوع في الطريق إلى الجلجثة؟",
                answer: "سمعان القيرواني"
            },

            300: {
                question:
                    "ما أسماء أبناء نوح الثلاثة الذين خرجوا معه من الفلك؟",
                answer: "سام، حام، يافث"
            },

            400: {
                question:
                    "من كتب معظم رسائل العهد الجديد؟",
                answer: "بولس الرسول"
            },

            500: {
                question:
                    "ما أسماء الشخصين اللذين ظهرا مع يسوع في حادثة التجلي؟",
                answer: "موسى وإيليا"
            }
        }
    },


    // =====================================================
    // 🧠 ألعاب ذهنية
    // =====================================================

    {
        name: "ألعاب ذهنية",

        questions: {

            100: {
                question:
                    "كلما أخذتَ مني أكثر، أصبحتُ أكبر. ما أنا؟",
                answer: "الحفرة"
            },

            200: {
                question:
                    "شيء تملكه أنت، لكن الناس يستخدمونه أكثر منك. ما هو؟",
                answer: "اسمك"
            },

            300: {
                question:
                    "2، 5، 11، 23، 47، ما الرقم التالي في السلسلة؟",
                answer: "95"
            },

            400: {
                question:
                    "في سباق، تجاوزت الشخص الذي في المركز الثاني. في أي مركز أصبحت؟",
                answer: "المركز الثاني"
            },

            500: {
                question:
                   "لديك 9 عملات متطابقة بالشكل، واحدة منها مزيفة ووزنها أخف من العملات الأصلية معك ميزان ذو كفتين. **ما أقل عدد من مرات استخدام الميزان التي تحتاجها بالتأكيد لمعرفة العملة المزيفة؟ وكيف؟**",
                answer: "مرتان",
            }
        }
    },


    // =====================================================
    // 🎯 تحدي مجهول
    // =====================================================

    {
        name: "تحدي مجهول",

        questions: {

            100: {
                type: "challenge",
                time: 10,
                question:
                    "تحدي: اختاروا شخصاً يغني لمدة 10 ثوانٍ، وعلى الفريق إكمال الأغنية معه.",
                answer: "تحدي غناء"
            },

            200: {
                type: "challenge",
                time: 30,
                question:
                    "تحدي: الفريق لديه 30 ثانية ليجد 5 أشياء سوداء في الغرفة ويحضرهم عندي.",
                answer: "تحدي سرعة"
            },

            300: {
                type: "challenge",
                time: 60,
                question:
                    "تحدي: شخص من الفريق يحاول أن يُحزِّر فريقه 6 كلمات دون التحدث",
                answer: "تمثيل صامت"
            },

            400: {
                type: "mystery",
                time: 30,
                question:
                    "لعبة حبل المشنقة: على الفريق تخمين كلمة مكونة من 6 أحرف. كل حرف خاطئ يضيف جزءاً من المشنقة.",
                answer: "عنكبوت"
            },

            500: {
                type: "challenge",
                time: 10,
                question:
                    "تحدي الذاكرة: سيظهر أمامكم 15 شيئاً لمدة 10 ثواني. بعد إخفائها، اذكروها كلها.",
                answer: "تحدي ذاكرة"
            }
        }
    },


    // =====================================================
    // 🎲 ???
    // =====================================================

    {
        name: "???",

        isMystery: true,

        questions: {

            // ---------------------------------------------
            // 100 = -200
            // ---------------------------------------------

            100: {
                type: "mystery",
                time: 25,

                reward: -200,

                question:
                    "🎉 ألف مبروك!! خسرتو 200 نقطة. 😱",

                answer:
                    "-200"
            },


            // ---------------------------------------------
            // 200 = +300
            // ---------------------------------------------

            200: {
                type: "mystery",
                time: 30,

                reward: 300,

                question:
                    "🎭 اختاروا شخصاً من الفريق. عنده 30 ثانية ليمثل مهنة معينة رح احكيله اياها بدون كلام، والفريق لازم يخمنها.",

                answer:
                    "+300"
            },


            // ---------------------------------------------
            // 300 = +200
            // ---------------------------------------------

            300: {
                type: "mystery",
                time: 20,

                reward: 200,

                question:
                    "😎 حظاً أوفر! ربحتوا 200 نقطة!",

                answer:
                    "+200"
            },


            // ---------------------------------------------
            // 400 = اسم / حيوان / نبات / جماد / بلاد
            // ---------------------------------------------

            400: {
                type: "allTeams",

                specialScoring:
                    "nameAnimalPlantObjectCountry",

                time: 60,

                question:
                    "📝 تحدي اسم، حيوان، نبات، جماد، بلاد! رح نعطيكم حرف وكل فريق لازم يكتب إجابة لكل فئة.",

                answer:
                    "لكل فئة: إجابة صحيحة وفريدة = 100 نقطة، نفس الإجابة الصحيحة للفريقين = 50 نقطة لكل فريق، ولا إجابة صحيحة = 0."
            },


            // ---------------------------------------------
            // 500 = +300
            // ---------------------------------------------

            500: {
                type: "mystery",
                time: 15,

                reward: 300,

                question:
                    "⚡ تحدي السرعة: خلال 15 ثانية، على الفريق ذكر 7 أشياء تبدأ بحرف «م». ممنوع تكرار أي إجابة.",

                answer:
                    "+300"
            }
        }
    }
];


// =========================================================
// GAME STATE
// =========================================================

function defaultTeamName(id) {
    return `Team ${id}`;
}


function createTeam(id) {

    return {
        id: id,
        name: defaultTeamName(id),
        score: 0
    };
}


let teams = [
    createTeam(1),
    createTeam(2)
];


// Normal turn
let currentTeamIndex = 0;


// Current question
let currentQuestion = null;


// Current board tile
let currentPointButton = null;


// Teams that attempted current question
let attemptedTeamIds = [];


// Question completed?
let questionFinished = false;


// Team that originally selected question
let questionStartingTeamIndex = 0;


// Normal all-teams awards
let allTeamsAwards = {};


// Special category awards
let allTeamsCategoryAwards = {};


// Timer
let timerInterval = null;
let timeLeft = 0;
let timeTotal = 0;


// Mystery
let currentMysteryReward = 0;


// =========================================================
// DOM ELEMENTS
// =========================================================

const setupScreen =
    document.getElementById("setupScreen");

const gameScreen =
    document.getElementById("gameScreen");

const teamCountElement =
    document.getElementById("teamCount");

const teamListElement =
    document.getElementById("teamList");

const addTeamBtn =
    document.getElementById("addTeamBtn");

const removeTeamBtn =
    document.getElementById("removeTeamBtn");

const startGameBtn =
    document.getElementById("startGameBtn");

const gameBoardElement =
    document.getElementById("gameBoard");

const scoreboardElement =
    document.getElementById("scoreboard");

const currentTurnElement =
    document.getElementById("currentTurn");


// =========================================================
// QUESTION MODAL
// =========================================================

const questionModal =
    document.getElementById("questionModal");

const questionCard =
    questionModal.querySelector(".question-card");

const modalCategory =
    document.getElementById("modalCategory");

const modalPoints =
    document.getElementById("modalPoints");

const modalQuestion =
    document.getElementById("modalQuestion");

const modalAnswer =
    document.getElementById("modalAnswer");

const answeringTeamElement =
    document.getElementById("answeringTeam");

const answerContainer =
    document.getElementById("answerContainer");

const answerLabel =
    answerContainer.querySelector(".answer-label");

const hostDecision =
    document.getElementById("hostDecision");

const correctBtn =
    document.getElementById("correctBtn");

const wrongBtn =
    document.getElementById("wrongBtn");

const closeQuestionBtn =
    document.getElementById("closeQuestionBtn");


// =========================================================
// TEAM SELECTION MODAL
// =========================================================

const teamSelectionModal =
    document.getElementById("teamSelectionModal");

const availableTeamsElement =
    document.getElementById("availableTeams");

const closeTeamSelectionBtn =
    document.getElementById("closeTeamSelectionBtn");


// =========================================================
// EXTRA CSS
// =========================================================

const extraStyle =
    document.createElement("style");

extraStyle.textContent = `

    .question-card {
        max-height: 94vh;
        overflow-y: auto;
    }


    /* =========================
       TIMER
    ========================= */

    .timer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        max-width: 520px;
        margin: 0 auto 28px;
    }

    .timer-bar {
        flex: 1;
        height: 10px;
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;
    }

    .timer-fill {
        height: 100%;
        width: 100%;
        background: var(--green);
        transition:
            width 1s linear,
            background 0.3s ease;
    }

    .timer-text {
        min-width: 56px;
        font-size: 28px;
        font-weight: 900;
        color: var(--gold);
        text-align: center;
    }

    .timer.low .timer-fill {
        background: var(--red);
    }

    .timer.low .timer-text {
        color: var(--red);
    }

    .timer-btn {
        border: 1px solid var(--border);
        background: var(--bg-card-light);
        color: white;
        border-radius: 10px;
        padding: 9px 14px;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        white-space: nowrap;
    }

    .timer-btn:hover {
        background: var(--primary);
    }


    /* =========================
       MEMORY CHALLENGE
    ========================= */

    .memory-challenge-box {
        width: 100%;
        margin: 0 auto 30px;
        padding: 0 35px;
        text-align: center;
    }

    .memory-image-wrapper {
        width: 100%;
        max-width: 760px;
        margin: 0 auto;
        padding: 12px;

        background:
            linear-gradient(
                145deg,
                rgba(99, 102, 241, 0.18),
                rgba(251, 191, 36, 0.08)
            );

        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 18px;

        box-shadow:
            0 15px 40px rgba(0, 0, 0, 0.3);
    }

    .memory-challenge-image {
        display: block;
        width: 100%;
        max-height: 440px;
        object-fit: contain;
        border-radius: 12px;
        background: #0b1020;

        transition:
            opacity 0.25s ease,
            transform 0.25s ease;
    }

    .memory-status {
        margin-top: 15px;
        font-size: 21px;
        font-weight: 900;
        color: var(--gold-light);
        text-align: center;
        direction: rtl;
    }

    .memory-status.finished {
        color: #86efac;
        animation:
            memoryStatusIn 0.3s ease;
    }

    @keyframes memoryStatusIn {

        from {
            opacity: 0;
            transform: translateY(8px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }


    /* =========================
       NOBODY BUTTON
    ========================= */

    .nobody-btn {
        width: 100%;
        margin-top: 18px;
        padding: 16px;

        border: 1px dashed rgba(255, 255, 255, 0.25);
        border-radius: 11px;

        background: transparent;
        color: var(--text-secondary);

        font-size: 18px;
        font-weight: 800;

        cursor: pointer;

        transition:
            background 0.18s ease,
            color 0.18s ease;
    }

    .nobody-btn:hover {
        background: rgba(255, 255, 255, 0.06);
        color: white;
    }


    /* =========================
       ALL TEAMS
    ========================= */

    .all-teams-panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 0 40px 40px;
    }

    .all-team-row {
        display: flex;
        align-items: center;
        gap: 10px;

        padding: 10px 14px;

        border: 1px solid var(--border);
        border-radius: 12px;

        background: rgba(11, 16, 32, 0.6);
    }

    .all-team-name {
        flex: 1;
        font-size: 18px;
        font-weight: 800;
    }

    .award-btn {
        min-width: 64px;
        padding: 10px 14px;

        border: 1px solid var(--border);
        border-radius: 9px;

        background: var(--bg-card-light);
        color: var(--text-secondary);

        font-size: 17px;
        font-weight: 900;

        cursor: pointer;
    }

    .award-btn.selected {
        background:
            linear-gradient(
                135deg,
                var(--primary),
                #7c3aed
            );

        color: white;
        border-color: transparent;
    }

    .all-team-confirm {
        margin-top: 6px;
        padding: 17px;

        border: none;
        border-radius: 11px;

        background:
            linear-gradient(
                135deg,
                #22c55e,
                #15803d
            );

        color: white;

        font-size: 19px;
        font-weight: 900;

        cursor: pointer;
    }


    /* =========================
       SPECIAL 400 ROUND
       اسم / حيوان / نبات / جماد / بلاد
    ========================= */

    .category-score-panel {
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 0 30px 35px;
    }

    .category-score-intro {
        padding: 14px 18px;

        border-radius: 12px;

        background: rgba(99, 102, 241, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.1);

        color: var(--text-secondary);

        font-size: 16px;
        font-weight: 700;

        line-height: 1.7;
        text-align: center;
        direction: rtl;
    }

    .category-score-row {
        display: flex;
        flex-direction: column;
        gap: 10px;

        padding: 15px;

        border: 1px solid var(--border);
        border-radius: 14px;

        background: rgba(11, 16, 32, 0.65);
    }

    .category-score-title {
        font-size: 22px;
        font-weight: 1000;

        color: var(--gold);

        text-align: center;
        direction: rtl;
    }

    .category-score-teams {
        display: grid;
        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap: 12px;
    }

    .category-team-score {
        padding: 12px;

        border: 1px solid var(--border);
        border-radius: 11px;

        background: rgba(255, 255, 255, 0.03);
    }

    .category-team-name {
        margin-bottom: 9px;

        font-size: 16px;
        font-weight: 900;

        text-align: center;
    }

    .category-score-buttons {
        display: flex;
        justify-content: center;
        gap: 7px;
    }

    .category-award-btn {
        flex: 1;

        padding: 9px 8px;

        border: 1px solid var(--border);
        border-radius: 8px;

        background: var(--bg-card-light);
        color: var(--text-secondary);

        font-size: 15px;
        font-weight: 900;

        cursor: pointer;
    }

    .category-award-btn.selected {
        background:
            linear-gradient(
                135deg,
                var(--primary),
                #7c3aed
            );

        color: white;
        border-color: transparent;
    }

    .category-total-row {
        display: grid;

        grid-template-columns:
            repeat(2, minmax(0, 1fr));

        gap: 12px;

        margin-top: 5px;
    }

    .category-total {
        padding: 15px;

        border-radius: 12px;

        background:
            linear-gradient(
                135deg,
                rgba(34, 197, 94, 0.16),
                rgba(21, 128, 61, 0.12)
            );

        border: 1px solid rgba(34, 197, 94, 0.25);

        color: white;

        text-align: center;
        font-size: 18px;
        font-weight: 800;
    }

    .category-total strong {
        display: block;

        margin-top: 4px;

        font-size: 25px;
        color: #86efac;
    }


    /* =========================
       SCOREBOARD
    ========================= */

    .score-team.active {
        border-color: var(--gold);

        box-shadow:
            0 0 0 2px rgba(251, 191, 36, 0.35),
            0 5px 15px rgba(0, 0, 0, 0.18);
    }


    /* =========================
       MYSTERY
    ========================= */

    .mystery-board-tile {
        font-size: 30px !important;
        font-weight: 1000 !important;
        letter-spacing: 3px;
    }

    .mystery-reward {
        display: inline-flex;

        align-items: center;
        justify-content: center;

        margin-top: 18px;
        padding: 10px 22px;

        border-radius: 12px;

        background:
            linear-gradient(
                135deg,
                var(--gold),
                var(--gold-dark)
            );

        color: #211600;

        font-size: 24px;
        font-weight: 1000;
    }

    .mystery-reward.negative {
        background:
            linear-gradient(
                135deg,
                #ef4444,
                #991b1b
            );

        color: white;
    }

    .mystery-reward.zero {
        background:
            linear-gradient(
                135deg,
                #64748b,
                #334155
            );

        color: white;
    }


    /* =========================
       MOBILE
    ========================= */

    @media (max-width: 750px) {

        .memory-challenge-box {
            padding: 0 20px;
        }

        .memory-challenge-image {
            max-height: 350px;
        }

        .memory-status {
            font-size: 18px;
        }

        .category-score-teams {
            grid-template-columns: 1fr;
        }

        .category-total-row {
            grid-template-columns: 1fr;
        }
    }


    @media (max-width: 500px) {

        .all-teams-panel,
        .category-score-panel {
            padding: 0 18px 22px;
        }

        .all-team-row {
            flex-wrap: wrap;
        }

        .all-team-name {
            flex-basis: 100%;
        }

        .memory-challenge-box {
            padding: 0 12px;
        }

        .memory-image-wrapper {
            padding: 7px;
            border-radius: 13px;
        }

        .memory-challenge-image {
            max-height: 280px;
            border-radius: 8px;
        }

        .memory-status {
            font-size: 16px;
        }

        .category-score-panel {
            padding: 0 12px 22px;
        }
    }
`;

document.head.appendChild(extraStyle);


// =========================================================
// TIMER UI
// =========================================================

const timerBox =
    document.createElement("div");

timerBox.className = "timer";


const timerBar =
    document.createElement("div");

timerBar.className = "timer-bar";


const timerFill =
    document.createElement("div");

timerFill.className = "timer-fill";

timerBar.appendChild(timerFill);


const timerText =
    document.createElement("div");

timerText.className = "timer-text";


const timerBtn =
    document.createElement("button");

timerBtn.type = "button";
timerBtn.className = "timer-btn";


timerBox.append(
    timerBar,
    timerText,
    timerBtn
);


// Put timer before question
modalQuestion.parentNode.insertBefore(
    timerBox,
    modalQuestion
);


// =========================================================
// 🧠 MEMORY CHALLENGE UI
// =========================================================

const memoryChallengeBox =
    document.createElement("div");

memoryChallengeBox.className =
    "memory-challenge-box hidden";

memoryChallengeBox.innerHTML = `

    <div class="memory-image-wrapper">

        <img
            class="memory-challenge-image"
            src="${MEMORY_IMAGE_PATH}"
            alt="Memory Challenge"
        >

    </div>

    <div class="memory-status">
        ${TEXT.memoryRemembering}
    </div>
`;


modalQuestion.parentNode.insertBefore(
    memoryChallengeBox,
    modalQuestion
);


const memoryChallengeImage =
    memoryChallengeBox.querySelector(
        ".memory-challenge-image"
    );

const memoryStatus =
    memoryChallengeBox.querySelector(
        ".memory-status"
    );


// =========================================================
// MEMORY HELPERS
// =========================================================

function isMemoryChallenge() {

    return (
        currentQuestion &&
        currentQuestion.category === "تحدي مجهول" &&
        currentQuestion.points === 500 &&
        currentQuestion.type === "challenge"
    );
}


function resetMemoryChallengeUI() {

    memoryChallengeBox.classList.add(
        "hidden"
    );

    memoryChallengeImage.style.display =
        "block";

    memoryStatus.textContent =
        TEXT.memoryRemembering;

    memoryStatus.classList.remove(
        "finished"
    );
}


function showMemoryChallenge() {

    memoryChallengeBox.classList.remove(
        "hidden"
    );

    memoryChallengeImage.style.display =
        "block";

    memoryStatus.textContent =
        TEXT.memoryRemembering;

    memoryStatus.classList.remove(
        "finished"
    );
}


function finishMemoryChallenge() {

    memoryChallengeImage.style.display =
        "none";

    memoryStatus.textContent =
        TEXT.memoryFinished;

    memoryStatus.classList.add(
        "finished"
    );
}


// =========================================================
// ALL TEAMS PANEL
// =========================================================

const allTeamsPanel =
    document.createElement("div");

allTeamsPanel.className =
    "all-teams-panel hidden";

questionCard.appendChild(
    allTeamsPanel
);


// =========================================================
// NOBODY KNOWS BUTTON
// =========================================================

const nobodyBtn =
    document.createElement("button");

nobodyBtn.type = "button";

nobodyBtn.className =
    "nobody-btn";

teamSelectionModal
    .querySelector(".selection-body")
    .appendChild(nobodyBtn);


// =========================================================
// STATIC TEXT
// =========================================================

function applyStaticText() {

    const setupSubtitle =
        document.querySelector(
            "#setupScreen .subtitle"
        );

    if (setupSubtitle) {
        setupSubtitle.textContent =
            TEXT.setupSubtitle;
    }


    const teamSmall =
        document.querySelector(
            "#setupScreen .team-count small"
        );

    if (teamSmall) {
        teamSmall.textContent =
            TEXT.teams;
    }


    startGameBtn.textContent =
        TEXT.startGame;


    answerLabel.textContent =
        TEXT.answer;


    correctBtn.textContent =
        TEXT.correct;


    wrongBtn.textContent =
        TEXT.wrong;


    const selectionTitle =
        document.querySelector(
            "#teamSelectionModal .selection-header h2"
        );

    if (selectionTitle) {
        selectionTitle.textContent =
            TEXT.wrongTitle;
    }


    const selectionText =
        document.querySelector(
            "#teamSelectionModal .selection-body p"
        );

    if (selectionText) {
        selectionText.textContent =
            TEXT.chooseTeam;
    }


    nobodyBtn.textContent =
        TEXT.nobody;


    closeQuestionBtn.setAttribute(
        "aria-label",
        TEXT.close
    );


    closeTeamSelectionBtn.setAttribute(
        "aria-label",
        TEXT.close
    );


    questionModal.setAttribute(
        "role",
        "dialog"
    );

    questionModal.setAttribute(
        "aria-modal",
        "true"
    );


    teamSelectionModal.setAttribute(
        "role",
        "dialog"
    );

    teamSelectionModal.setAttribute(
        "aria-modal",
        "true"
    );
}


// =========================================================
// INITIALIZE
// =========================================================

applyStaticText();

renderTeamSetup();


// =========================================================
// ADD TEAM
// =========================================================

addTeamBtn.addEventListener(
    "click",
    () => {

        if (teams.length >= MAX_TEAMS) {
            return;
        }

        teams.push(
            createTeam(
                teams.length + 1
            )
        );

        renderTeamSetup();
    }
);


// =========================================================
// REMOVE TEAM
// =========================================================

removeTeamBtn.addEventListener(
    "click",
    () => {

        if (teams.length <= MIN_TEAMS) {
            return;
        }

        teams.pop();

        renderTeamSetup();
    }
);


// =========================================================
// RENDER TEAM SETUP
// =========================================================

function renderTeamSetup() {

    teamCountElement.textContent =
        teams.length;

    teamListElement.innerHTML =
        "";


    teams.forEach(
        (team, index) => {

            const item =
                document.createElement("div");

            item.className =
                "team-item";


            const label =
                document.createElement("span");

            label.className =
                "team-number";

            label.textContent =
                TEXT.teamLabel(
                    index + 1
                );


            const input =
                document.createElement("input");

            input.type = "text";

            input.className =
                "team-name";

            input.maxLength = 20;

            input.value =
                team.name;


            input.addEventListener(
                "input",
                () => {

                    team.name =
                        input.value;
                }
            );


            item.append(
                label,
                input
            );


            teamListElement.appendChild(
                item
            );
        }
    );


    addTeamBtn.disabled =
        teams.length >= MAX_TEAMS;

    removeTeamBtn.disabled =
        teams.length <= MIN_TEAMS;
}


// =========================================================
// START GAME
// =========================================================

startGameBtn.addEventListener(
    "click",
    () => {

        teams.forEach(
            team => {

                team.name =
                    team.name.trim() ||
                    defaultTeamName(
                        team.id
                    );
            }
        );


        currentTeamIndex = 0;


        setupScreen.classList.add(
            "hidden"
        );


        gameScreen.classList.remove(
            "hidden"
        );


        renderGameBoard();

        updateCurrentTurn();
    }
);


// =========================================================
// RENDER SCOREBOARD
// =========================================================

function renderScoreboard() {

    scoreboardElement.innerHTML =
        "";


    teams.forEach(
        (team, index) => {

            const scoreElement =
                document.createElement("div");

            scoreElement.className =
                "score-team";


            if (
                index === currentTeamIndex
            ) {

                scoreElement.classList.add(
                    "active"
                );
            }


            const nameElement =
                document.createElement("span");

            nameElement.className =
                "score-team-name";

            nameElement.textContent =
                team.name;


            const pointsElement =
                document.createElement("span");

            pointsElement.className =
                "score-team-points";

            pointsElement.textContent =
                team.score;


            scoreElement.append(
                nameElement,
                pointsElement
            );


            scoreboardElement.appendChild(
                scoreElement
            );
        }
    );
}


// =========================================================
// RENDER GAME BOARD
// =========================================================

function renderGameBoard() {

    gameBoardElement.innerHTML =
        "";


    categories.forEach(
        category => {

            const categoryElement =
                document.createElement("div");

            categoryElement.className =
                "category";


            const titleElement =
                document.createElement("div");

            titleElement.className =
                "category-title";

            titleElement.textContent =
                category.name.trim();


            categoryElement.appendChild(
                titleElement
            );


            pointValues.forEach(
                points => {

                    const pointButton =
                        document.createElement(
                            "button"
                        );

                    pointButton.className =
                        "point-tile";


                    if (category.isMystery) {

                        pointButton.textContent =
                            "???";

                        pointButton.classList.add(
                            "mystery-board-tile"
                        );

                    } else {

                        pointButton.textContent =
                            points;
                    }


                    pointButton.addEventListener(
                        "click",
                        () => {

                            if (
                                pointButton.disabled
                            ) {
                                return;
                            }


                            openQuestion(
                                category,
                                points,
                                pointButton
                            );
                        }
                    );


                    categoryElement.appendChild(
                        pointButton
                    );
                }
            );


            gameBoardElement.appendChild(
                categoryElement
            );
        }
    );
}


// =========================================================
// MYSTERY REWARD UI
// =========================================================

function showMysteryReward(
    reward
) {

    const rewardElement =
        document.createElement("div");

    rewardElement.className =
        "mystery-reward";


    if (reward < 0) {

        rewardElement.classList.add(
            "negative"
        );

        rewardElement.textContent =
            `⚠️ ${reward} POINTS`;

    } else if (reward === 0) {

        rewardElement.classList.add(
            "zero"
        );

        rewardElement.textContent =
            "😶 0 POINTS";

    } else {

        rewardElement.textContent =
            `🏆 +${reward} POINTS`;
    }


    modalQuestion.parentNode.insertBefore(
        rewardElement,
        modalQuestion.nextSibling
    );


    currentQuestion.rewardElement =
        rewardElement;
}


// =========================================================
// TIMER
// =========================================================

function updateTimerUI() {

    timerText.textContent =
        timeLeft;


    timerFill.style.width =
        (
            timeTotal > 0
                ? (
                    timeLeft /
                    timeTotal
                ) * 100
                : 0
        ) + "%";


    timerBox.classList.toggle(
        "low",
        timeTotal > 0 &&
        timeLeft <= 5
    );


    if (timerInterval) {

        timerBtn.textContent =
            TEXT.timerPause;

    } else if (timeLeft <= 0) {

        timerBtn.textContent =
            TEXT.timerRestart;

    } else {

        timerBtn.textContent =
            TEXT.timerStart;
    }
}


function stopTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;
    }


    updateTimerUI();
}


function resetTimer() {

    stopTimer();

    timeLeft =
        timeTotal;

    updateTimerUI();
}


function toggleTimer() {

    // Running -> pause
    if (timerInterval) {

        stopTimer();

        return;
    }


    // Finished -> restart
    if (timeLeft <= 0) {

        timeLeft =
            timeTotal;


        if (isMemoryChallenge()) {

            showMemoryChallenge();

            hostDecision.classList.add(
                "hidden"
            );
        }
    }


    timerInterval =
        setInterval(
            () => {

                timeLeft--;


                if (timeLeft <= 0) {

                    timeLeft = 0;

                    stopTimer();

                    beep();


                    if (isMemoryChallenge()) {

                        finishMemoryChallenge();


                        hostDecision.classList.remove(
                            "hidden"
                        );
                    }


                    return;
                }


                updateTimerUI();

            },
            1000
        );


    updateTimerUI();
}


timerBtn.addEventListener(
    "click",
    toggleTimer
);


// =========================================================
// OPEN QUESTION
// =========================================================

function openQuestion(
    category,
    points,
    pointButton
) {

    const questionData =
        category.questions[points];


    if (!questionData) {
        return;
    }


    // Remember starting team
    questionStartingTeamIndex =
        currentTeamIndex;


    // =====================================================
    // IMPORTANT:
    // NO RANDOM MYSTERY POINTS
    //
    // If reward exists, use it.
    // Otherwise reward = 0.
    // =====================================================

    if (
        category.isMystery &&
        typeof questionData.reward === "number"
    ) {

        currentMysteryReward =
            questionData.reward;

    } else {

        currentMysteryReward =
            0;
    }


    currentQuestion = {

        category:
            category.name.trim(),

        points:
            category.isMystery
                ? currentMysteryReward
                : points,

        type:
            questionData.type ||
            "normal",

        question:
            questionData.question,

        answer:
            questionData.answer,

        awards:
            questionData.awards ||
            [100, 50],

        specialScoring:
            questionData.specialScoring ||
            null,

        isMystery:
            !!category.isMystery,

        rewardElement:
            null
    };


    currentPointButton =
        pointButton;


    // First attempt belongs to current team
    attemptedTeamIds = [
        teams[currentTeamIndex].id
    ];


    questionFinished =
        false;


    // =====================================================
    // FILL MODAL
    // =====================================================

    modalCategory.textContent =
        currentQuestion.category;


    if (currentQuestion.isMystery) {

        modalPoints.textContent =
            "???";

    } else {

        modalPoints.textContent =
            points;
    }


    modalQuestion.textContent =
        currentQuestion.question;


    modalAnswer.textContent =
        currentQuestion.answer;


    // Remove old reward
    const oldMysteryReward =
        questionCard.querySelector(
            ".mystery-reward"
        );

    if (oldMysteryReward) {
        oldMysteryReward.remove();
    }


    // Reset memory
    resetMemoryChallengeUI();


    // Show fixed mystery reward
    if (
        currentQuestion.isMystery &&
        currentQuestion.type !== "allTeams"
    ) {

        showMysteryReward(
            currentMysteryReward
        );
    }


    // =====================================================
    // TIMER
    // =====================================================

    timeTotal =
        questionData.time ||
        DEFAULT_TIME;

    timeLeft =
        timeTotal;


    timerBox.classList.remove(
        "hidden"
    );


    stopTimer();


    // =====================================================
    // RESET ALL-TEAMS
    // =====================================================

    allTeamsPanel.classList.add(
        "hidden"
    );

    allTeamsPanel.innerHTML =
        "";

    allTeamsPanel.classList.remove(
        "category-score-panel"
    );

    allTeamsPanel.classList.add(
        "all-teams-panel"
    );


    // =====================================================
    // MEMORY CHALLENGE
    // =====================================================

    if (isMemoryChallenge()) {

        showMemoryChallenge();

        answerLabel.textContent =
            TEXT.challengeLabel;

        answerContainer.classList.add(
            "hidden"
        );

        hostDecision.classList.add(
            "hidden"
        );

        updateAnsweringTeam();


    // =====================================================
    // SPECIAL 400
    // =====================================================

    } else if (
        currentQuestion.type ===
            "allTeams" &&
        currentQuestion.specialScoring ===
            "nameAnimalPlantObjectCountry"
    ) {

        answerLabel.textContent =
            TEXT.scoringRule;


        answerContainer.classList.remove(
            "hidden"
        );


        hostDecision.classList.add(
            "hidden"
        );


        answeringTeamElement.textContent =
            TEXT.allTeams;


        buildNameAnimalPlantPanel();


        allTeamsPanel.classList.remove(
            "hidden"
        );


    // =====================================================
    // NORMAL ALL TEAMS
    // =====================================================

    } else if (
        currentQuestion.type ===
        "allTeams"
    ) {

        answerLabel.textContent =
            TEXT.scoringRule;


        answerContainer.classList.remove(
            "hidden"
        );


        hostDecision.classList.add(
            "hidden"
        );


        answeringTeamElement.textContent =
            TEXT.allTeams;


        buildAllTeamsPanel(
            currentQuestion.awards
        );


        allTeamsPanel.classList.remove(
            "hidden"
        );


    // =====================================================
    // NORMAL QUESTION / CHALLENGE / MYSTERY
    // =====================================================

    } else {

        answerLabel.textContent =
            currentQuestion.type ===
            "challenge"
                ? TEXT.challengeLabel
                : TEXT.answer;


        answerContainer.classList.add(
            "hidden"
        );


        hostDecision.classList.remove(
            "hidden"
        );


        updateAnsweringTeam();
    }


    questionCard.scrollTop = 0;


    questionModal.classList.remove(
        "hidden"
    );


    // =====================================================
    // AUTO START MEMORY TIMER
    // =====================================================

    if (isMemoryChallenge()) {

        setTimeout(
            () => {

                if (
                    currentQuestion &&
                    isMemoryChallenge() &&
                    !questionFinished
                ) {

                    toggleTimer();
                }

            },
            150
        );
    }
}


// =========================================================
// UPDATE ANSWERING TEAM
// =========================================================

function updateAnsweringTeam() {

    if (!teams[currentTeamIndex]) {
        return;
    }

    answeringTeamElement.textContent =
        teams[currentTeamIndex].name;
}


// =========================================================
// FINISH QUESTION
// =========================================================

function finishQuestion() {

    if (currentPointButton) {

        currentPointButton.classList.add(
            "used"
        );

        currentPointButton.disabled =
            true;
    }


    answerContainer.classList.remove(
        "hidden"
    );


    hostDecision.classList.add(
        "hidden"
    );


    stopTimer();

    timerBox.classList.add(
        "hidden"
    );


    questionFinished =
        true;


    renderScoreboard();
}


// =========================================================
// CORRECT
// =========================================================

correctBtn.addEventListener(
    "click",
    () => {

        if (
            !currentQuestion ||
            questionFinished
        ) {
            return;
        }


        playSound(correctSound);


        teams[currentTeamIndex].score +=
            currentQuestion.points;


        finishQuestion();
    }
);


// =========================================================
// WRONG
// =========================================================

wrongBtn.addEventListener(
    "click",
    () => {

        if (
            !currentQuestion ||
            questionFinished
        ) {
            return;
        }


        playSound(wrongSound);


        const answeringTeam =
            teams[currentTeamIndex];


        if (
            !attemptedTeamIds.includes(
                answeringTeam.id
            )
        ) {

            attemptedTeamIds.push(
                answeringTeam.id
            );
        }


        stopTimer();


        hostDecision.classList.add(
            "hidden"
        );


        openTeamSelection();
    }
);


// =========================================================
// NORMAL ALL-TEAMS PANEL
// =========================================================

function buildAllTeamsPanel(
    awardValues
) {

    allTeamsPanel.innerHTML =
        "";

    allTeamsAwards =
        {};


    teams.forEach(
        team => {

            allTeamsAwards[
                team.id
            ] = 0;


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "all-team-row";


            const name =
                document.createElement(
                    "div"
                );

            name.className =
                "all-team-name";

            name.textContent =
                team.name;


            row.appendChild(name);


            const buttons = [];


            [
                0,
                ...awardValues
            ].forEach(
                value => {

                    const btn =
                        document.createElement(
                            "button"
                        );

                    btn.type = "button";

                    btn.className =
                        "award-btn" +
                        (
                            value === 0
                                ? " selected"
                                : ""
                        );


                    btn.textContent =
                        value === 0
                            ? "0"
                            : `+${value}`;


                    btn.addEventListener(
                        "click",
                        () => {

                            allTeamsAwards[
                                team.id
                            ] = value;


                            buttons.forEach(
                                b => {

                                    b.classList.toggle(
                                        "selected",
                                        b === btn
                                    );
                                }
                            );
                        }
                    );


                    buttons.push(btn);

                    row.appendChild(btn);
                }
            );


            allTeamsPanel.appendChild(
                row
            );
        }
    );


    appendAllTeamsConfirmButton();
}


// =========================================================
// SPECIAL 400
// اسم / حيوان / نبات / جماد / بلاد
// =========================================================

const nameAnimalPlantCategories = [
    "اسم",
    "حيوان",
    "نبات",
    "جماد",
    "بلاد"
];


function buildNameAnimalPlantPanel() {

    allTeamsPanel.classList.remove(
        "all-teams-panel"
    );

    allTeamsPanel.classList.add(
        "category-score-panel"
    );


    allTeamsPanel.innerHTML =
        "";


    allTeamsAwards =
        {};

    allTeamsCategoryAwards =
        {};


    // Initialize scores
    teams.forEach(
        team => {

            allTeamsAwards[
                team.id
            ] = 0;

            allTeamsCategoryAwards[
                team.id
            ] = {};


            nameAnimalPlantCategories.forEach(
                categoryName => {

                    allTeamsCategoryAwards[
                        team.id
                    ][categoryName] = 0;
                }
            );
        }
    );


    // Intro
    const intro =
        document.createElement(
            "div"
        );

    intro.className =
        "category-score-intro";

    intro.textContent =
        "لكل فئة اختاروا النقاط لكل فريق: 100 للإجابة الصحيحة والمختلفة، 50 إذا كانت الإجابتان نفس الإجابة الصحيحة، و0 إذا لم تكن الإجابة صحيحة.";


    allTeamsPanel.appendChild(
        intro
    );


    // Each category
    nameAnimalPlantCategories.forEach(
        categoryName => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "category-score-row";


            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "category-score-title";

            title.textContent =
                categoryName;


            row.appendChild(title);


            const teamContainer =
                document.createElement(
                    "div"
                );

            teamContainer.className =
                "category-score-teams";


            teams.forEach(
                team => {

                    const teamBox =
                        document.createElement(
                            "div"
                        );

                    teamBox.className =
                        "category-team-score";


                    const teamName =
                        document.createElement(
                            "div"
                        );

                    teamName.className =
                        "category-team-name";

                    teamName.textContent =
                        team.name;


                    teamBox.appendChild(
                        teamName
                    );


                    const buttonsContainer =
                        document.createElement(
                            "div"
                        );

                    buttonsContainer.className =
                        "category-score-buttons";


                    const buttons = [];


                    // 0 / 50 / 100
                    [
                        0,
                        50,
                        100
                    ].forEach(
                        value => {

                            const btn =
                                document.createElement(
                                    "button"
                                );

                            btn.type =
                                "button";

                            btn.className =
                                "category-award-btn" +
                                (
                                    value === 0
                                        ? " selected"
                                        : ""
                                );


                            btn.textContent =
                                value === 0
                                    ? "0"
                                    : `+${value}`;


                            btn.addEventListener(
                                "click",
                                () => {

                                    allTeamsCategoryAwards[
                                        team.id
                                    ][
                                        categoryName
                                    ] = value;


                                    buttons.forEach(
                                        button => {

                                            button.classList.toggle(
                                                "selected",
                                                button === btn
                                            );
                                        }
                                    );


                                    updateNameAnimalPlantTotals();
                                }
                            );


                            buttons.push(btn);

                            buttonsContainer.appendChild(
                                btn
                            );
                        }
                    );


                    teamBox.appendChild(
                        buttonsContainer
                    );

                    teamContainer.appendChild(
                        teamBox
                    );
                }
            );


            row.appendChild(
                teamContainer
            );


            allTeamsPanel.appendChild(
                row
            );
        }
    );


    // Totals
    const totalsRow =
        document.createElement(
            "div"
        );

    totalsRow.className =
        "category-total-row";

    totalsRow.id =
        "categoryTotals";


    allTeamsPanel.appendChild(
        totalsRow
    );


    updateNameAnimalPlantTotals();


    appendAllTeamsConfirmButton();
}


// =========================================================
// UPDATE SPECIAL 400 TOTALS
// =========================================================

function updateNameAnimalPlantTotals() {

    const totalsElement =
        document.getElementById(
            "categoryTotals"
        );


    if (!totalsElement) {
        return;
    }


    totalsElement.innerHTML =
        "";


    teams.forEach(
        team => {

            let total = 0;


            nameAnimalPlantCategories.forEach(
                categoryName => {

                    total +=
                        allTeamsCategoryAwards[
                            team.id
                        ]?.[
                            categoryName
                        ] || 0;
                }
            );


            allTeamsAwards[
                team.id
            ] = total;


            const totalElement =
                document.createElement(
                    "div"
                );

            totalElement.className =
                "category-total";


            totalElement.innerHTML =
                `
                    ${team.name}
                    <strong>
                        ${total} نقطة
                    </strong>
                `;


            totalsElement.appendChild(
                totalElement
            );
        }
    );
}


// =========================================================
// CONFIRM ALL TEAMS
// =========================================================

function appendAllTeamsConfirmButton() {

    const confirmBtn =
        document.createElement(
            "button"
        );

    confirmBtn.type =
        "button";

    confirmBtn.className =
        "all-team-confirm";

    confirmBtn.textContent =
        TEXT.confirmPoints;


    confirmBtn.addEventListener(
        "click",
        finishAllTeamsQuestion
    );


    allTeamsPanel.appendChild(
        confirmBtn
    );
}


// =========================================================
// FINISH ALL-TEAMS QUESTION
// =========================================================

function finishAllTeamsQuestion() {

    if (
        !currentQuestion ||
        questionFinished
    ) {
        return;
    }


    // Make sure special round totals
    // are completely updated.
    if (
        currentQuestion.specialScoring ===
        "nameAnimalPlantObjectCountry"
    ) {

        updateNameAnimalPlantTotals();
    }


    let totalAwarded = 0;


    teams.forEach(
        team => {

            const pts =
                allTeamsAwards[
                    team.id
                ] || 0;


            team.score += pts;

            totalAwarded += pts;
        }
    );


    if (totalAwarded > 0) {

        playSound(
            correctSound
        );
    }


    allTeamsPanel.classList.add(
        "hidden"
    );


    finishQuestion();
}


// =========================================================
// OPEN TEAM SELECTION
// =========================================================

function openTeamSelection() {

    availableTeamsElement.innerHTML =
        "";


    const availableTeams =
        teams.filter(
            team =>
                !attemptedTeamIds.includes(
                    team.id
                )
        );


    // Nobody left
    if (
        availableTeams.length === 0
    ) {

        handleNoTeamsRemaining();

        return;
    }


    availableTeams.forEach(
        team => {

            const teamButton =
                document.createElement(
                    "button"
                );


            teamButton.className =
                "available-team-btn";


            teamButton.textContent =
                team.name;


            teamButton.addEventListener(
                "click",
                () => {

                    selectNextTeam(team);
                }
            );


            availableTeamsElement.appendChild(
                teamButton
            );
        }
    );


    teamSelectionModal.classList.remove(
        "hidden"
    );
}


// =========================================================
// SELECT NEXT TEAM
// =========================================================

function selectNextTeam(team) {

    currentTeamIndex =
        teams.findIndex(
            t => t.id === team.id
        );


    if (
        !attemptedTeamIds.includes(
            team.id
        )
    ) {

        attemptedTeamIds.push(
            team.id
        );
    }


    teamSelectionModal.classList.add(
        "hidden"
    );


    updateAnsweringTeam();


    hostDecision.classList.remove(
        "hidden"
    );


    // Fresh timer for next team
    resetTimer();


    updateCurrentTurn();
}


// =========================================================
// NOBODY KNOWS
// =========================================================

function handleNoTeamsRemaining() {

    teamSelectionModal.classList.add(
        "hidden"
    );


    finishQuestion();
}


nobodyBtn.addEventListener(
    "click",
    handleNoTeamsRemaining
);


// =========================================================
// UPDATE CURRENT TURN
// =========================================================

function updateCurrentTurn() {

    const currentTeam =
        teams[currentTeamIndex];


    if (!currentTeam) {
        return;
    }


    currentTurnElement.textContent =
        TEXT.turn(
            currentTeam.name
        );


    renderScoreboard();
}


// =========================================================
// CLOSE QUESTION
// =========================================================

function closeQuestion() {

    stopTimer();


    questionModal.classList.add(
        "hidden"
    );


    teamSelectionModal.classList.add(
        "hidden"
    );


    allTeamsPanel.classList.add(
        "hidden"
    );


    allTeamsPanel.innerHTML =
        "";


    allTeamsPanel.classList.remove(
        "category-score-panel"
    );

    allTeamsPanel.classList.add(
        "all-teams-panel"
    );


    // Reset memory
    resetMemoryChallengeUI();


    // Remove mystery reward
    const mysteryRewardElement =
        questionCard.querySelector(
            ".mystery-reward"
        );


    if (mysteryRewardElement) {

        mysteryRewardElement.remove();
    }


    // =====================================================
    // IMPORTANT TURN LOGIC
    //
    // Team 1 picks
    // Team 1 wrong
    // Team 3 steals
    // Next normal turn = Team 2
    // =====================================================

    if (questionFinished) {

        currentTeamIndex =
            (
                questionStartingTeamIndex +
                1
            ) % teams.length;

    } else {

        currentTeamIndex =
            questionStartingTeamIndex;
    }


    updateCurrentTurn();


    // Clear question state
    currentQuestion =
        null;

    currentPointButton =
        null;

    attemptedTeamIds =
        [];

    questionFinished =
        false;

    allTeamsAwards =
        {};

    allTeamsCategoryAwards =
        {};

    currentMysteryReward =
        0;
}


closeQuestionBtn.addEventListener(
    "click",
    closeQuestion
);


// =========================================================
// CLOSE TEAM SELECTION
// =========================================================

closeTeamSelectionBtn.addEventListener(
    "click",
    () => {

        teamSelectionModal.classList.add(
            "hidden"
        );


        hostDecision.classList.remove(
            "hidden"
        );
    }
);