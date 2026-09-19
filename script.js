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
        name: " أفلام وموسيقى",
        questions: {
            100: {
                question: "فيلم عربي تدور أحداثه حول شاب يعود من الخارج إلى بلده، ويصطدم بالفارق الكبير بين الصورة التي يحملها عن البلد والواقع الذي يجده. الفيلم من بطولة أحمد حلمي. ما الفيلم؟",
                 answer: "عسل أسود"
            },
            200: {
               question: "طفل يبقى وحده في المنزل ويواجه لصين.",
                answer: "Home Alone"
            },
            300: {
                question: "تحدي: سيتم تشغيل أول 10 ثوانٍ من أغنية. على الفريق معرفة اسم الأغنية.",
                answer: "Nano"
            },
            400: {
              question: "من صاحبة أغنية بتونس بيك",
              answer: "وردة الجزائرية"
            },
            500: {
            question: "ما الاسم الحقيقي للفنانة فيروز؟",
                answer: "نهاد حداد"
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
                question: "أنا أول إنسان مشى على سطح القمر. من أنا؟",
                answer: "نيل أرمسترونغ"
            },
            300: {
               
                question: "أنا ممثل سوري اشتهرت بشخصية «أبو شهاب» في باب الحارة. من أنا؟",
                answer: "سامر المصري"
            },
            400: {
                question: "أنا قائد فرنسي، أصبحت إمبراطورًا، خضت معارك عديدة في أوروبا، وانتهى بي الأمر منفياً في جزيرة سانت هيلينا. من أنا؟",
                answer: " Napoleon Bonaparte"
            },
            500: {
                question: "أنا مؤلف مسرحية «روميو وجولييت». من أنا؟",
                answer: "وليام شكسبير"
            }
        }
    },

    {
        name: "الكتاب المقدس",
        questions: {
            100: {
                question: "ما اسم الجبل الذي تلقّى عليه موسى الوصايا العشر؟",
                answer: "جبل سيناء"
            },
            200: {
                question: "من هو الرجل الذي حمل صليب يسوع في الطريق إلى الجلجثة؟",
                answer: "سمعان القيرواني"
            },
            300: {
                question: "ما أسماء أبناء نوح الثلاثة الذين خرجوا معه من الفلك؟",
                answer: "سام، حام، يافث"
            },
            400: {
                question: "من كتب معظم رسائل العهد الجديد؟  ",
                answer: "بولس الرسول"
            },
            500: {
                question: "ما أسماء الشخصين اللذين ظهرا مع يسوع في حادثة التجلي؟",
                answer: "موسى وإيليا"
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
                question: "شيء تملكه أنت، لكن الناس يستخدمونه أكثر منك. ما هو؟",
                answer: "اسمك"
            },
            300: {
                question: "2، 5، 11، 23، 47، ما الرقم التالي في السلسلة: ",
                answer: "95"
            },
            400: {
                question: "في سباق، تجاوزت الشخص الذي في المركز الثاني. في أي مركز أصبحت؟",
                answer: "المركز الثاني"
            },
            500: {
                question: "أمامك 3 صناديق: «تفاح»، «برتقال»، «مختلط». جميع الملصقات خاطئة. يسمح لك بسحب ثمرة واحدة فقط من صندوق واحد. كيف تعرف محتوى الصناديق الثلاثة？",
                answer: "اسحب من الصندوق المكتوب عليه «مختلط»، لأنه بالتأكيد ليس مختلطاً"
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
                question: "تحدي: شخص من الفريق يحاول ان يحزر فريقه كلمة معينة دون التحدث.",
                answer: "تمثيل صامت"
            },
            400: {
                question: "تحدي لجميع الفرق: اسم حيوان جماد بلاد بحرف ال.",
                answer: "كل فريق يكسب 100 نقطة اذا جواب منفرد صحيح، و 50 نقطة اذا اجابوا جميعاً بشكل صحيح."
            },
            500: {
                question: "تحدي الذاكرة: سيظهر أمامكم 15 شيئاً لمدة 20 ثانية. بعد إخفائها، اذكروا أكبر عدد ممكن.",
                answer: "تحدي ذاكرة"
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

// IMPORTANT:
// This remembers the team whose normal turn started the question.
// Example:
// Team 1 selects question
// Team 1 wrong
// Team 3 answers
// Team 3 correct
// Next normal turn = Team 2
let questionStartingTeamIndex = 0;


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


    // IMPORTANT:
    // Remember the team that originally selected
    // the question.
    questionStartingTeamIndex =
        currentTeamIndex;


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
    // The team whose turn it is gets the first attempt.

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
    // It stays open until the host presses X.

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


    // Update display

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
    // It stays open until X is pressed.

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


    // IMPORTANT:
    //
    // Continue the normal turn order from
    // the team that originally selected the question.
    //
    // Example:
    //
    // Team 1 selects
    // Team 1 wrong
    // Team 3 answers correctly
    //
    // Next = Team 2
    //
    // NOT Team 1.
    // NOT Team 3.

    if (questionFinished) {

        currentTeamIndex =
            questionStartingTeamIndex + 1;


        // Wrap around

        if (
            currentTeamIndex >=
            teams.length
        ) {

            currentTeamIndex = 0;
        }


        updateCurrentTurn();
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