// Var with array and object for quiz questions
var questions = [
    {
        question: "How do you add a comment to a CSS or JS file?",
        choices: ["*Comment*", "//Comment", "/*Comment", "--Comment--"],
        answer: "//Comment"
    },
    {
        question: "What is the first index of an array?",
        choices: ["0", "1", "First", "Idk"],
        answer: "0"
    },
    {
        question: "Which CSS property gives something rounded corners?",
        choices: ["corner-round", "rounding", "border-radius", "border"],
        answer: "border-radius"
    },
    {
        question: "What is a short section of code written to complete a task called?",
        choices: ["Function", "Array", "Loop", "Variable"],
        answer: "Function"
    },
    {
        question: "String values must be enclosed with ___",
        choices: ["parenthesis", "quotes", "commas", "curly brackets"],
        answer: "quotes"
    },
];

// Declared variables
var score = 0;
var questionIndex = 0;

// Declared variables and start working code
var currentTimeEl = document.querySelector("#currentTime");
var timerEl = document.querySelector("#startTime");
var questionsEl = document.querySelector("#questions");
var wrapperEl = document.querySelector("#wrapper");

// Timer variables and create a new element 
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// Triggers the timer to start
timerEl.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTimeEl.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTimeEl.textContent = "Out of Time!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and answer choices to the screen
function render(questionIndex) {
    questionsEl.innerHTML = "";
    ulCreate.innerHTML = "";

    //for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].question;
    var userChoices = questions[questionIndex].choices;
    questionsEl.textContent = userQuestion;
    //}

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsEl.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare user choices with correct answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textConten = "Incorrect. The correct answer is: " + questions[questionIndex].answer;
        }

    }
    // Question Index determines which number question the user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got " + score + "/" + questions.length + " correct!";
    } else {
        render(questionIndex);
    }
    questionsEl.appendChild(createDiv);
}

// Function to append the last page
function allDone() {
    questionsEl.innerHTML = "";
    currentTimeEl.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All done!"

    questionsEl.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    questionsEl.appendChild(createP);


    if (secondsLeft >= 0) {
        var timeLeft = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeLeft;

        questionsEl.appendChild(createP2);

        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "createLabel");
        createLabel.textContent = "Enter your intials: ";

        questionsEl.appendChild(createLabel);

        var createInput = document.createElement("input");
        createInput.setAttribute("type", "text");
        createInput.setAttribute("id", "initials");
        createInput.textContent = "";

        questionsEl.appendChild(createInput);

        var createSubmit = document.createElement("button");
        createSubmit.setAttribute("type", "submit");
        createSubmit.setAttribute("id", "submit");
        createSubmit.textContent = "Submit";

        questionsEl.appendChild(createSubmit);

        createSubmit.addEventListener("click", function () {
            var initials = createInput.value;

            if (initials === null) {
                alert("No value entered. Please enter your initials");

            } else {
                var finalScore = {
                    initials: initials,
                    score: timeLeft
                }

                var allScores = localStorage.getItem("allScores");
                if (allScores === null) {
                    allScores = [];
                } else {
                    allScores = JSON.parse(allScores);
                }
                allScores.push(finalScore);
                var newScore = JSON.stringify(allScores);
                localStorage.setItem("allScores", newScore);

                window.location.replace("./highscores.html");
            }
        });
    }
}