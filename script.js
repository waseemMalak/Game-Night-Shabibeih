// =========================================================
// 🍬 من سيربح البونبون؟  —  script.js
// =========================================================


// =========================
// CONFIG
// =========================

const pointValues = [100, 200, 300, 400, 500];

const MIN_TEAMS = 1;
const MAX_TEAMS = 5;

// Default seconds per question
const DEFAULT_TIME = 30;


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

    // Team names are intentionally in English
    teamLabel: n => `Team ${n}`,

    // Turn text is intentionally in English
    turn: name => `${name}'s Turn`
};


// =========================
// SOUNDS
// =========================

const correctSound = new Audio("./sounds/correct.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

correctSound.preload = "auto";
wrongSound.preload = "auto";

correctSound.volume = 0.8;
wrongSound.volume = 0.8;

correctSound.addEventListener("error", () => {
    console.error("❌ Could not load sounds/correct.mp3");
});

wrongSound.addEventListener("error", () => {
    console.error("❌ Could not load sounds/wrong.mp3");
});

function playSound(sound) {
    sound.currentTime = 0;

    sound.play().catch(error => {
        console.error("Could not play sound:", error);
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

        const ctx = new AudioCtx();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.value = 880;
        gain.gain.value = 0.15;

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.45);

        osc.onended = () => ctx.close();

    } catch (error) {
        console.error("Could not play beep:", error);
    }
}


// =========================
// MYSTERY REWARD POOL
// =========================
//
// IMPORTANT:
// The visible board shows ???.
// When a mystery tile is opened,
// one of these rewards is randomly selected.
//
// Rewards are NOT connected to difficulty.
//
// Some are intentionally risky:
// 0 points
// negative points
// jackpot rewards
//

const mysteryRewardPool = [
    50,
    100,
    150,
    200,
    300,
    400,
    500,
    0,
    -100
];


// =========================
// QUESTIONS
// =========================

const categories = [

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
                    "أمامك 3 صناديق: «تفاح»، «برتقال»، «مختلط». جميع الملصقات خاطئة. يسمح لك بسحب ثمرة واحدة فقط من صندوق واحد. كيف تعرف محتوى الصناديق الثلاثة؟",
                answer:
                    "اسحب من الصندوق المكتوب عليه «مختلط» لأنه بالتأكيد ليس مختلطاً. فإذا خرجت تفاحة فهو «تفاح»، وعندها المكتوب عليه «برتقال» هو «مختلط»، والمكتوب عليه «تفاح» هو «برتقال»."
            }
        }
    },


    {
        name: "تحدي مجهول",

        questions: {

            100: {
                type: "challenge",
                time: 20,
                question:
                    "تحدي: الفريق لديه 20 ثانية ليجد 5 أشياء سوداء في الغرفة.",
                answer: "تحدي سرعة"
            },

            200: {
                type: "challenge",
                time: 10,
                question:
                    "تحدي: اختاروا شخصاً يغني لمدة 10 ثوانٍ، وعلى الفريق إكمال الأغنية معه.",
                answer: "تحدي غناء"
            },

            300: {
                type: "challenge",
                time: 60,
                question:
                    "تحدي: شخص من الفريق يحاول أن يُحزِّر فريقه كلمة معينة دون التحدث.",
                answer: "تمثيل صامت"
            },

            400: {
                type: "allTeams",
                time: 30,
                awards: [100, 50],
                question:
                    "تحدي لجميع الفرق: اسم حيوان جماد بلاد بحرف ال.",
                answer:
                    "كل فريق يكسب 100 نقطة إذا كان جوابه منفرداً وصحيحاً، و 50 نقطة إذا أجاب الجميع بشكل صحيح."
            },

            500: {
                type: "challenge",
                time: 20,
                question:
                    "تحدي الذاكرة: سيظهر أمامكم 15 شيئاً لمدة 20 ثانية. بعد إخفائها، اذكروا أكبر عدد ممكن.",
                answer: "تحدي ذاكرة"
            }
        }
    },


    // =====================================================
    // 🎲 MYSTERY CATEGORY
    // =====================================================

    {
        name: "???",

        isMystery: true,

        questions: {

            100: {
                type: "mystery",
                time: 25,
                question:
                    "🧠 تحدي الذاكرة: أمامكم 12 كلمة لمدة 15 ثانية. بعدها سيتم إخفاؤها. حاولوا تذكر أكبر عدد ممكن.",
                answer:
                    "تحدي ذاكرة"
            },

            200: {
                type: "mystery",
                time: 20,
                question:
                    "🎭 اختاروا شخصاً من الفريق. عنده 20 ثانية ليمثل مهنة معينة بدون كلام، والفريق لازم يخمنها.",
                answer:
                    "تمثيل صامت"
            },

            300: {
                type: "mystery",
                time: 20,
                question:
                    "👀 انظروا جيداً حولكم. خلال 20 ثانية، يجب على الفريق إيجاد 4 أشياء في الغرفة تشترك في صفة واحدة يحددها المضيف.",
                answer:
                    "تحدي ملاحظة"
            },

            400: {
                type: "mystery",
                time: 15,
                question:
                    "⚡ تحدي السرعة: خلال 15 ثانية، على الفريق ذكر 7 أشياء تبدأ بحرف «م». ممنوع تكرار أي إجابة.",
                answer:
                    "تحدي سرعة"
            },

            500: {
                type: "mystery",
                time: 30,
                question:
                    "🎲 مخاطرة! اختاروا شخصاً من الفريق ليجيب على سؤال غريب يختاره المضيف. إذا أقنع المضيف بإجابته، تحصلون على المكافأة. إذا فشل، تخسرونها.",
                answer:
                    "قرار المضيف"
            }
        }
    }
];


// =========================
// GAME STATE
// =========================

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


// Teams that already attempted the current question
let attemptedTeamIds = [];


// Whether the current question has been completed
let questionFinished = false;


// The team whose normal turn started the question
let questionStartingTeamIndex = 0;


// "allTeams" questions
let allTeamsAwards = {};


// Timer state
let timerInterval = null;
let timeLeft = 0;
let timeTotal = 0;


// Mystery state
let currentMysteryReward = 0;


// =========================
// DOM ELEMENTS
// =========================

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


// Question modal
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


// Team selection modal
const teamSelectionModal =
    document.getElementById("teamSelectionModal");

const availableTeamsElement =
    document.getElementById("availableTeams");

const closeTeamSelectionBtn =
    document.getElementById("closeTeamSelectionBtn");


// =========================
// EXTRA UI
// =========================

const extraStyle =
    document.createElement("style");

extraStyle.textContent = `

    .question-card {
        max-height: 94vh;
        overflow-y: auto;
    }

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

    .score-team.active {
        border-color: var(--gold);

        box-shadow:
            0 0 0 2px rgba(251, 191, 36, 0.35),
            0 5px 15px rgba(0, 0, 0, 0.18);
    }

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

    .mystery-question-label {
        display: block;
        margin-bottom: 10px;
        font-size: 15px;
        font-weight: 900;
        color: var(--gold);
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    @media (max-width: 500px) {

        .all-teams-panel {
            padding: 0 18px 22px;
        }

        .all-team-row {
            flex-wrap: wrap;
        }

        .all-team-name {
            flex-basis: 100%;
        }
    }
`;

document.head.appendChild(extraStyle);


// =========================
// TIMER UI
// =========================

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


// Put timer between team badge and question
modalQuestion.parentNode.insertBefore(
    timerBox,
    modalQuestion
);


// =========================
// ALL-TEAMS SCORING PANEL
// =========================

const allTeamsPanel =
    document.createElement("div");

allTeamsPanel.className =
    "all-teams-panel hidden";

questionCard.appendChild(
    allTeamsPanel
);


// =========================
// NOBODY KNOWS BUTTON
// =========================

const nobodyBtn =
    document.createElement("button");

nobodyBtn.type = "button";
nobodyBtn.className = "nobody-btn";

teamSelectionModal
    .querySelector(".selection-body")
    .appendChild(nobodyBtn);


// =========================
// STATIC TEXT
// =========================

function applyStaticText() {

    document
        .querySelector("#setupScreen .subtitle")
        .textContent =
        TEXT.setupSubtitle;


    document
        .querySelector("#setupScreen .team-count small")
        .textContent =
        TEXT.teams;


    startGameBtn.textContent =
        TEXT.startGame;


    answerLabel.textContent =
        TEXT.answer;


    correctBtn.textContent =
        TEXT.correct;


    wrongBtn.textContent =
        TEXT.wrong;


    document
        .querySelector(
            "#teamSelectionModal .selection-header h2"
        )
        .textContent =
        TEXT.wrongTitle;


    document
        .querySelector(
            "#teamSelectionModal .selection-body p"
        )
        .textContent =
        TEXT.chooseTeam;


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


// =========================
// INITIALIZE
// =========================

applyStaticText();

renderTeamSetup();


// =========================
// ADD TEAM
// =========================

addTeamBtn.addEventListener(
    "click",
    () => {

        if (teams.length >= MAX_TEAMS) {
            return;
        }

        teams.push(
            createTeam(teams.length + 1)
        );

        renderTeamSetup();
    }
);


// =========================
// REMOVE TEAM
// =========================

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


// =========================
// RENDER TEAM SETUP
// =========================

function renderTeamSetup() {

    teamCountElement.textContent =
        teams.length;

    teamListElement.innerHTML = "";


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
                TEXT.teamLabel(index + 1);


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


// =========================
// START GAME
// =========================

startGameBtn.addEventListener(
    "click",
    () => {

        teams.forEach(
            team => {

                team.name =
                    team.name.trim() ||
                    defaultTeamName(team.id);
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


// =========================
// RENDER SCOREBOARD
// =========================

function renderScoreboard() {

    scoreboardElement.innerHTML = "";


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


// =========================
// RENDER GAME BOARD
// =========================

function renderGameBoard() {

    gameBoardElement.innerHTML = "";


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


                    // =========================
                    // MYSTERY TILES
                    // =========================

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


// =========================
// GET RANDOM MYSTERY REWARD
// =========================

function getRandomMysteryReward() {

    const randomIndex =
        Math.floor(
            Math.random() *
            mysteryRewardPool.length
        );

    return mysteryRewardPool[randomIndex];
}


// =========================
// MYSTERY REWARD UI
// =========================

function showMysteryReward(reward) {

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


// =========================
// TIMER
// =========================

function updateTimerUI() {

    timerText.textContent =
        timeLeft;


    timerFill.style.width =
        (
            timeTotal > 0
                ? (timeLeft / timeTotal) * 100
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
    }


    timerInterval =
        setInterval(
            () => {

                timeLeft--;


                if (timeLeft <= 0) {

                    timeLeft = 0;

                    stopTimer();

                    beep();

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


// =========================
// OPEN QUESTION
// =========================

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


    // =========================
    // MYSTERY REWARD
    // =========================

    if (category.isMystery) {

        currentMysteryReward =
            getRandomMysteryReward();

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


    // =========================
    // FILL MODAL
    // =========================

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


    // Remove old mystery reward element
    const oldMysteryReward =
        questionCard.querySelector(
            ".mystery-reward"
        );

    if (oldMysteryReward) {
        oldMysteryReward.remove();
    }


    // Reveal mystery reward
    if (currentQuestion.isMystery) {

        showMysteryReward(
            currentMysteryReward
        );
    }


    // =========================
    // TIMER
    // =========================

    timeTotal =
        questionData.time ||
        category.time ||
        DEFAULT_TIME;


    timeLeft =
        timeTotal;


    timerBox.classList.remove(
        "hidden"
    );


    stopTimer();


    // =========================
    // RESET PANELS
    // =========================

    allTeamsPanel.classList.add(
        "hidden"
    );


    allTeamsPanel.innerHTML =
        "";


    if (
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
}


// =========================
// UPDATE ANSWERING TEAM
// =========================

function updateAnsweringTeam() {

    answeringTeamElement.textContent =
        teams[currentTeamIndex].name;
}


// =========================
// FINISH QUESTION
// =========================

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


// =========================
// CORRECT ANSWER
// =========================

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


// =========================
// WRONG ANSWER
// =========================

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


// =========================
// ALL-TEAMS QUESTION
// =========================

function buildAllTeamsPanel(
    awardValues
) {

    allTeamsPanel.innerHTML = "";

    allTeamsAwards = {};


    teams.forEach(
        team => {

            allTeamsAwards[team.id] =
                0;


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


            [0, ...awardValues].forEach(
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


function finishAllTeamsQuestion() {

    if (
        !currentQuestion ||
        questionFinished
    ) {
        return;
    }


    let totalAwarded = 0;


    teams.forEach(
        team => {

            const pts =
                allTeamsAwards[team.id] ||
                0;


            team.score += pts;

            totalAwarded += pts;
        }
    );


    if (totalAwarded > 0) {

        playSound(correctSound);
    }


    allTeamsPanel.classList.add(
        "hidden"
    );


    finishQuestion();
}


// =========================
// OPEN TEAM SELECTION
// =========================

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


// =========================
// SELECT NEXT TEAM
// =========================

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


    // New team gets fresh timer
    resetTimer();


    updateCurrentTurn();
}


// =========================
// NOBODY KNOWS / EVERYONE WRONG
// =========================

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


// =========================
// UPDATE CURRENT TURN
// =========================

function updateCurrentTurn() {

    const currentTeam =
        teams[currentTeamIndex];


    if (!currentTeam) {
        return;
    }


    // Example:
    // Team 1's Turn
    // Team 2's Turn
    // Sharks's Turn

    currentTurnElement.textContent =
        TEXT.turn(
            currentTeam.name
        );


    renderScoreboard();
}


// =========================
// CLOSE QUESTION
// =========================

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


    // Remove mystery reward UI
    const mysteryRewardElement =
        questionCard.querySelector(
            ".mystery-reward"
        );

    if (mysteryRewardElement) {

        mysteryRewardElement.remove();
    }


    if (questionFinished) {

        // Normal order continues
        // from the team that picked:
        //
        // Team 1 picks
        // Team 1 wrong
        // Team 3 answers
        // Next normal turn = Team 2

        currentTeamIndex =
            (
                questionStartingTeamIndex +
                1
            ) % teams.length;

    } else {

        // Closed before completion:
        // return turn to original team

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

    currentMysteryReward =
        0;
}


closeQuestionBtn.addEventListener(
    "click",
    closeQuestion
);


// =========================
// CLOSE TEAM SELECTION
// =========================

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