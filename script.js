// =========================
// GAME DATA
// =========================

const pointValues = [100, 200, 300, 400, 500];

// =========================
// SOUNDS
// =========================

const correctSound = new Audio("./sounds/correct.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");

correctSound.preload = "auto";
wrongSound.preload = "auto";

correctSound.volume = 0.8;
wrongSound.volume = 0.8;


// =========================
// SOUND ERROR / LOAD TESTING
// =========================

correctSound.addEventListener("error", () => {
    console.error("❌ Could not load sounds/correct.mp3");
});

wrongSound.addEventListener("error", () => {
    console.error("❌ Could not load sounds/wrong.mp3");
});

correctSound.addEventListener("canplaythrough", () => {
    console.log("✅ Correct sound loaded");
});

wrongSound.addEventListener("canplaythrough", () => {
    console.log("✅ Wrong sound loaded");
});


// =========================
// QUESTIONS
// =========================

const categories = [
    {
        name: "أفلام وموسيقى",
        questions: {
            100: {
                question: "من هي المطربة اللبنانية المعروفة بلقب «جارة القمر»؟",
                answer: "فيروز"
            },
            200: {
                question: "من هو الممثل الذي لعب دور الجوكر في فيلم The Dark Knight؟",
                answer: "هيث ليدجر"
            },
            300: {
                question: "ما اسم الفيلم المصري الذي تدور أحداثه حول أحمد مراد وشخصية يحيى؟",
                answer: "الفيل الأزرق"
            },
            400: {
                question: "ما الاسم الحقيقي للفنانة فيروز؟",
                answer: "نهاد حداد"
            },
            500: {
                question: "تحدي: سيتم تشغيل أول 5 ثوانٍ من أغنية. على الفريق معرفة اسم الأغنية.",
                answer: "تحدي موسيقي"
            }
        }
    },

    {
        name: "من أنا؟",
        questions: {
            100: {
                question: "أنا تلميذ ليسوع، وأنكرت أنني أعرفه ثلاث مرات. من أنا؟",
                answer: "بطرس"
            },
            200: {
                question: "أنا ممثل سوري اشتهرت بشخصية «أبو شهاب» في باب الحارة. من أنا؟",
                answer: "سامر المصري"
            },
            300: {
                question: "أنا زعيم فلسطيني، وُلد عام 1929، وترأست منظمة التحرير الفلسطينية لسنوات طويلة. من أنا؟",
                answer: "ياسر عرفات"
            },
            400: {
                question: "أنا شاعر وكاتب لبناني، من أشهر أعمالي «النبي»، وعشت جزءاً كبيراً من حياتي في الولايات المتحدة. من أنا؟",
                answer: "جبران خليل جبران"
            },
            500: {
                question: "من أنا؟ وُلدت عام 1918، سجنت 27 سنة، ثم أصبحت رئيساً لبلادي وحصلت على جائزة نوبل للسلام.",
                answer: "نيلسون مانديلا"
            }
        }
    },

    {
        name: "الكتاب المقدس",
        questions: {
            100: {
                question: "أكمل الآية: «أما أنا وبيتي فنعبد...»؟",
                answer: "الرب"
            },
            200: {
                question: "من هو الشخص الذي باع بكوريته مقابل طبق من العدس؟",
                answer: "عيسو"
            },
            300: {
                question: "أي نبي صعد إلى السماء في مركبة من نار؟",
                answer: "إيليا"
            },
            400: {
                question: "رتّب الأحداث التالية من الأقدم إلى الأحدث: الطوفان – خروج بني إسرائيل من مصر – بناء هيكل سليمان – ولادة يسوع.",
                answer: "الطوفان → الخروج من مصر → هيكل سليمان → ولادة يسوع"
            },
            500: {
                question: "رجلان ادّعت كل واحدة من امرأتين أنه ابنها. طلب الملك سليمان إحضار سيف ليقسم الطفل بينهما. ماذا فعلت الأم الحقيقية؟",
                answer: "طلبت أن يُعطى الطفل للمرأة الأخرى حتى لا يُقتل"
            }
        }
    },

    {
        name: "ألعاب ذهنية",
        questions: {
            100: {
                question: "كلما أخذتَ مني أكثر، أصبحتُ أكبر. ما أنا؟",
                answer: "الحفرة"
            },
            200: {
                question: "لديك 3 مفاتيح خارج غرفة، وداخل الغرفة 3 مصابيح. كل مفتاح يتحكم بمصباح واحد. يمكنك دخول الغرفة مرة واحدة فقط. كيف تعرف أي مفتاح لأي مصباح؟",
                answer: "شغّل الأول فترة ثم أطفئه، شغّل الثاني، ثم ادخل: المضيء للثاني، الدافئ للأول، والبارد للثالث"
            },
            300: {
                question: "ما الرقم التالي في السلسلة: 1، 11، 21، 1211، 111221، ؟",
                answer: "312211"
            },
            400: {
                question: "لديك 9 كرات متطابقة، واحدة منها أثقل من الباقي. لديك ميزان ذو كفتين ويمكنك استخدامه مرتين فقط. كيف تحدد الكرة الأثقل؟",
                answer: "قسّمها 3-3-3، زن مجموعتين، ثم تابع بالمجموعة الأثقل"
            },
            500: {
                question: "أمامك 3 صناديق: «تفاح»، «برتقال»، «مختلط». جميع الملصقات خاطئة. يسمح لك بسحب ثمرة واحدة فقط من صندوق واحد. كيف تعرف محتوى الصناديق الثلاثة؟",
                answer: "اسحب من الصندوق المكتوب عليه «مختلط»، لأنه بالتأكيد ليس مختلطاً"
            }
        }
    },

    {
        name: "معلومات عامة",
        questions: {
            100: {
                question: "ما هي أكبر قارة في العالم من حيث المساحة؟",
                answer: "آسيا"
            },
            200: {
                question: "ما الدولة التي يظهر على علمها شجرة الأرز؟",
                answer: "لبنان"
            },
            300: {
                question: "كم قلباً لدى الأخطبوط؟",
                answer: "ثلاثة"
            },
            400: {
                question: "ما الرمز الكيميائي للذهب؟",
                answer: "Au"
            },
            500: {
                question: "ما اسم الشبكة العالمية التي يُرمز لها اختصاراً بـ WWW؟",
                answer: "World Wide Web"
            }
        }
    },

    {
        name: "تحدي مجهول",
        questions: {
            100: {
                question: "تحدي: الفريق لديه 20 ثانية ليجد 5 أشياء سوداء في الغرفة.",
                answer: "تحدي سرعة"
            },
            200: {
                question: "تحدي: اختاروا شخصاً يغني لمدة 10 ثوانٍ، وعلى الفريق إكمال الأغنية معه.",
                answer: "تحدي غناء"
            },
            300: {
                question: "تحدي: مثّلوا اسم فيلم بدون استخدام أي كلمة، وعلى الفريق تخمين الفيلم.",
                answer: "تمثيل صامت"
            },
            400: {
                question: "تحدي: شخص من الفريق يغمض عينيه، وشخص آخر يوجهه صوتياً للوصول إلى هدف محدد.",
                answer: "تحدي ثقة"
            },
            500: {
                question: "تحدي الذاكرة: سيظهر أمامكم 15 شيئاً لمدة 20 ثانية. بعد إخفائها، اذكروا أكبر عدد ممكن.",
                answer: "تحدي ذاكرة"
            }
        }
    }
];


// =========================
// GAME STATE
// =========================

let numberOfTeams = 2;

let teams = [
    {
        id: 1,
        name: "Team 1",
        score: 0
    },
    {
        id: 2,
        name: "Team 2",
        score: 0
    }
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


// =========================
// DOM ELEMENTS
// =========================

const setupScreen = document.getElementById("setupScreen");
const gameScreen = document.getElementById("gameScreen");

const teamCountElement = document.getElementById("teamCount");
const teamListElement = document.getElementById("teamList");

const addTeamBtn = document.getElementById("addTeamBtn");
const removeTeamBtn = document.getElementById("removeTeamBtn");
const startGameBtn = document.getElementById("startGameBtn");

const gameBoardElement = document.getElementById("gameBoard");
const scoreboardElement = document.getElementById("scoreboard");


// =========================
// QUESTION MODAL ELEMENTS
// =========================

const questionModal = document.getElementById("questionModal");

const modalCategory = document.getElementById("modalCategory");
const modalPoints = document.getElementById("modalPoints");
const modalQuestion = document.getElementById("modalQuestion");
const modalAnswer = document.getElementById("modalAnswer");

const answerContainer = document.getElementById("answerContainer");

const hostDecision = document.getElementById("hostDecision");

const correctBtn = document.getElementById("correctBtn");
const wrongBtn = document.getElementById("wrongBtn");

const closeQuestionBtn = document.getElementById("closeQuestionBtn");

const currentTurnElement = document.getElementById("currentTurn");


// =========================
// TEAM SELECTION MODAL
// =========================

const teamSelectionModal =
    document.getElementById("teamSelectionModal");

const availableTeamsElement =
    document.getElementById("availableTeams");

const closeTeamSelectionBtn =
    document.getElementById("closeTeamSelectionBtn");


// =========================
// INITIALIZE
// =========================

renderTeamSetup();


// =========================
// ADD TEAM
// =========================

addTeamBtn.addEventListener("click", () => {

    if (numberOfTeams >= 5) {
        return;
    }

    numberOfTeams++;

    teams.push({
        id: numberOfTeams,
        name: `Team ${numberOfTeams}`,
        score: 0
    });

    renderTeamSetup();
});


// =========================
// REMOVE TEAM
// =========================

removeTeamBtn.addEventListener("click", () => {

    if (numberOfTeams <= 1) {
        return;
    }

    numberOfTeams--;

    teams.pop();

    if (currentTeamIndex >= teams.length) {
        currentTeamIndex = 0;
    }

    renderTeamSetup();
});


// =========================
// RENDER TEAM SETUP
// =========================

function renderTeamSetup() {

    teamCountElement.textContent = numberOfTeams;

    teamListElement.innerHTML = "";

    teams.forEach((team, index) => {

        const teamElement =
            document.createElement("div");

        teamElement.className = "team-item";

        teamElement.innerHTML = `
            <span class="team-number">
                Team ${index + 1}
            </span>

            <input
                type="text"
                class="team-name"
                value="${team.name}"
                data-team-id="${team.id}"
                maxlength="20"
            >
        `;

        teamListElement.appendChild(teamElement);
    });

    addTeamBtn.disabled =
        numberOfTeams >= 5;

    removeTeamBtn.disabled =
        numberOfTeams <= 1;
}


// =========================
// START GAME
// =========================

startGameBtn.addEventListener("click", () => {

    const inputs =
        document.querySelectorAll(".team-name");

    inputs.forEach(input => {

        const teamId =
            Number(input.dataset.teamId);

        const team =
            teams.find(t => t.id === teamId);

        if (team) {

            team.name =
                input.value.trim() ||
                `Team ${teamId}`;
        }
    });

    // Team 1 starts
    currentTeamIndex = 0;

    // Switch screens
    setupScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    // Render game
    renderScoreboard();
    renderGameBoard();
    updateCurrentTurn();
});


// =========================
// RENDER SCOREBOARD
// =========================

function renderScoreboard() {

    scoreboardElement.innerHTML = "";

    teams.forEach(team => {

        const scoreElement =
            document.createElement("div");

        scoreElement.className = "score-team";

        scoreElement.innerHTML = `
            <span class="score-team-name">
                ${team.name}
            </span>

            <span class="score-team-points">
                ${team.score}
            </span>
        `;

        scoreboardElement.appendChild(scoreElement);
    });
}


// =========================
// RENDER GAME BOARD
// =========================

function renderGameBoard() {

    gameBoardElement.innerHTML = "";

    categories.forEach(category => {

        const categoryElement =
            document.createElement("div");

        categoryElement.className = "category";


        // Category title

        const titleElement =
            document.createElement("div");

        titleElement.className =
            "category-title";

        titleElement.textContent =
            category.name;

        categoryElement.appendChild(
            titleElement
        );


        // Point tiles

        pointValues.forEach(points => {

            const pointButton =
                document.createElement("button");

            pointButton.className =
                "point-tile";

            pointButton.textContent =
                points;


            pointButton.addEventListener(
                "click",
                () => {

                    if (
                        pointButton.classList.contains(
                            "used"
                        )
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
        });


        gameBoardElement.appendChild(
            categoryElement
        );
    });
}


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


    // Save question

    currentQuestion = {
        category: category.name,
        points: points,
        question: questionData.question,
        answer: questionData.answer
    };


    // Save board tile

    currentPointButton =
        pointButton;


    // Reset attempted teams

    attemptedTeamIds = [
        teams[currentTeamIndex].id
    ];


    // Reset finished state

    questionFinished = false;


    // Fill modal

    modalCategory.textContent =
        category.name;

    modalPoints.textContent =
        points;

    modalQuestion.textContent =
        questionData.question;

    modalAnswer.textContent =
        questionData.answer;


    // Hide answer

    answerContainer.classList.add(
        "hidden"
    );


    // Show host decision

    hostDecision.classList.remove(
        "hidden"
    );


    // Update answering team

    updateAnsweringTeam();


    // Open question popup

    questionModal.classList.remove(
        "hidden"
    );
}


// =========================
// UPDATE ANSWERING TEAM
// =========================

function updateAnsweringTeam() {

    const answeringTeam =
        teams[currentTeamIndex];

    const answeringTeamElement =
        document.getElementById(
            "answeringTeam"
        );

    if (answeringTeamElement) {

        answeringTeamElement.textContent =
            answeringTeam.name;
    }
}


// =========================
// CORRECT ANSWER
// =========================

correctBtn.addEventListener("click", () => {

    if (!currentQuestion) {
        return;
    }


    // Play correct sound

    correctSound.currentTime = 0;

    correctSound.play().catch(error => {
        console.error(
            "Could not play correct sound:",
            error
        );
    });


    const answeringTeam =
        teams[currentTeamIndex];


    // Award points

    answeringTeam.score +=
        currentQuestion.points;


    // Mark question as used

    if (currentPointButton) {

        currentPointButton.classList.add(
            "used"
        );
    }


    // Update scoreboard

    renderScoreboard();


    // Reveal answer

    answerContainer.classList.remove(
        "hidden"
    );


    // Hide CORRECT / WRONG buttons

    hostDecision.classList.add(
        "hidden"
    );


    // Question is finished

    // It stays open until the host
    // presses the X button.

    questionFinished = true;
});


// =========================
// WRONG ANSWER
// =========================

wrongBtn.addEventListener("click", () => {

    if (!currentQuestion) {
        return;
    }


    // Play wrong sound

    wrongSound.currentTime = 0;

    wrongSound.play().catch(error => {
        console.error(
            "Could not play wrong sound:",
            error
        );
    });


    const answeringTeam =
        teams[currentTeamIndex];


    // Make sure this team is recorded

    if (
        !attemptedTeamIds.includes(
            answeringTeam.id
        )
    ) {

        attemptedTeamIds.push(
            answeringTeam.id
        );
    }


    console.log(
        `${answeringTeam.name} answered incorrectly.`
    );


    // Hide host decision

    hostDecision.classList.add(
        "hidden"
    );


    // Check if another team can answer

    openTeamSelection();
});


// =========================
// OPEN TEAM SELECTION
// =========================

function openTeamSelection() {

    if (!teamSelectionModal) {

        handleNoTeamsRemaining();

        return;
    }


    availableTeamsElement.innerHTML = "";


    // Find teams that haven't tried yet

    const availableTeams =
        teams.filter(team =>
            !attemptedTeamIds.includes(
                team.id
            )
        );


    // If nobody remains

    if (availableTeams.length === 0) {

        handleNoTeamsRemaining();

        return;
    }


    // Create button for each available team

    availableTeams.forEach(team => {

        const teamButton =
            document.createElement("button");

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
    });


    // Open selection popup

    teamSelectionModal.classList.remove(
        "hidden"
    );
}


// =========================
// SELECT NEXT TEAM
// =========================

function selectNextTeam(team) {

    // Change current answering team

    currentTeamIndex =
        teams.findIndex(
            t => t.id === team.id
        );


    // Record that this team attempted

    if (
        !attemptedTeamIds.includes(
            team.id
        )
    ) {

        attemptedTeamIds.push(
            team.id
        );
    }


    // Close team selection

    teamSelectionModal.classList.add(
        "hidden"
    );


    // Update answering team display

    updateAnsweringTeam();


    // Show CORRECT / WRONG again

    hostDecision.classList.remove(
        "hidden"
    );


    // Keep current turn display showing
    // the team currently answering

    updateCurrentTurn();
}


// =========================
// EVERYONE WRONG
// =========================

function handleNoTeamsRemaining() {

    console.log(
        "All teams answered incorrectly."
    );


    // Reveal answer

    answerContainer.classList.remove(
        "hidden"
    );


    // Hide decision buttons

    hostDecision.classList.add(
        "hidden"
    );


    // Mark question as used

    if (currentPointButton) {

        currentPointButton.classList.add(
            "used"
        );
    }


    // Question is finished.
    // It will stay open until X is pressed.

    questionFinished = true;
}


// =========================
// NEXT NORMAL TEAM
// =========================

function nextTeam() {

    currentTeamIndex++;


    if (
        currentTeamIndex >=
        teams.length
    ) {

        currentTeamIndex = 0;
    }


    updateCurrentTurn();
}


// =========================
// UPDATE CURRENT TURN
// =========================

function updateCurrentTurn() {

    if (!currentTurnElement) {
        return;
    }


    const currentTeam =
        teams[currentTeamIndex];


    if (!currentTeam) {
        return;
    }


    currentTurnElement.textContent =
        currentTeam.name + "'s Turn";
}


// =========================
// CLOSE QUESTION
// =========================

function closeQuestion() {

    questionModal.classList.add(
        "hidden"
    );


    if (teamSelectionModal) {

        teamSelectionModal.classList.add(
            "hidden"
        );
    }


    // If the question was completed,
    // move to the next normal team.

    if (questionFinished) {

        nextTeam();
    }


    // Clear question state

    currentQuestion = null;

    currentPointButton = null;

    attemptedTeamIds = [];

    questionFinished = false;
}


// =========================
// CLOSE QUESTION BUTTON
// =========================

closeQuestionBtn.addEventListener(
    "click",
    () => {

        closeQuestion();
    }
);


// =========================
// CLOSE TEAM SELECTION
// =========================

if (closeTeamSelectionBtn) {

    closeTeamSelectionBtn.addEventListener(
        "click",
        () => {

            teamSelectionModal.classList.add(
                "hidden"
            );


            /*
                Bring the host back to the
                CORRECT / WRONG decision
                for the current team.
            */

            hostDecision.classList.remove(
                "hidden"
            );
        }
    );
}