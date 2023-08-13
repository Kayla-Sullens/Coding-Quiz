// Declared variables
var score = 0;
var questionIndex = 0;
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#begin");
var quizQuestions = document.querySelector("#quizQuestions");
var container = document.querySelector("#container");

var secondsLeft = 60;
var interval = 0;
var penalty = 10;

var createUl = document.createElement("ul");
createUl.setAttribute("id", "questionsUl")

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

// Triggers the timer to start
startBtn.addEventListener("click", function () {
    if (interval === 0) {
        interval = setInterval(function () {
            secondsLeft--;
            timer.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(interval);
                allDone();
                timer.textContent = "Out of Time!";
            }
        }, 1000);
    }
    nextQuestion(questionIndex);
});

// Displays questions and answer choices to the screen
function nextQuestion(questionIndex) {
    quizQuestions.innerHTML = "";
    createUl.innerHTML = "";
    var showQuestion = document.createElement("h3");

    for (var i = 0; i < questions.length; i++) {
    showQuestion.innerHTML = questions[questionIndex].question;
    var showChoices = questions[questionIndex].choices;
    quizQuestions.appendChild(showQuestion);
    }

    showChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.innerHTML += "<button>" + newItem + "</button>";
        quizQuestions.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAnswer));
    })
}

// Event to compare user choices with correct answer
function checkAnswer(event) {
    var userChoice = event.target;

    if (userChoice.matches("li")) {
        var answerFeedback = document.createElement("div");
        answerFeedback.setAttribute("id", "createDiv");

        if (userChoice.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! 🥳";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect 😔";
        }

    }

    // Function to append the last page
function allDone() {
    quizQuestions.innerHTML = "";
    timer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All done!"
    quizQuestions.appendChild(createH1);


    if (secondsLeft >= 0) {
        score = timer;
        clearInterval(interval);
        var createNewP = document.createElement("p");
        createNewP.textContent = "Your final score is: " + score;
        quizQuestions.appendChild(createNewP);
    } else {
        score = 0;
        var timeIsUp = document.createElement("p");
        timeIsUp.textContent = "Time's up! Your final score is" + score;
        quizQuestions.appendChild(createNewP)
    }

    // Determine whether to continue quiz or end quiz
    function continueQuiz(event) {
        questionIndex++;
        if (questionIndex <= questions.length) {
            nextQuestion(questionIndex);
        } else {
            allDone();
        }
    }
}

// Input box and button for user to enter and submit initials
var enterInitials = document.createElement("label");
enterInitials.setAttribute("id", "initialsBox");
enterInitials.textContent = "Enter your intials: ";
quizQuestions.appendChild(enterInitials);

var userInput = document.createElement("input");
userInput.setAttribute("type", "text");
userInput.setAttribute("id", "initials");
userInput.textContent = "";
quizQuestions.appendChild(userInput);

var submitBtn = document.createElement("button");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("id", "submit");
submitBtn.textContent = "Submit";
quizQuestions.appendChild(createSubmit);
var submitBtn = document.querySelector("#submit");
// Event listener for the initials submit button
        submitBtn.addEventListener("click", function () {
            var initials = userInput.value;

            if (initials === "") {
                window.alert("Please enter your initials");

            } else {
                var finalScore = {
                    initials: initials,
                    score: score
                }
// Local storage to store past high scores
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

var highScore = document.querySelector("#highScores");
var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#clear");



// Get local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}
// Event listener to go back to index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});

// Event listener to clear the score
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});