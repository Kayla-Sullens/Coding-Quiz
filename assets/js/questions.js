// Var with array and object for quiz questions
var questions=[
    {
        question:"How do you add a comment to a CSS or JS file?",
        Choices:["*Comment*","//Comment","/*Comment","--Comment--"],
        Answer:"//Comment"
    },
    {
        question:"What is the first index of an array?",
        Choices:["0","1","First","Idk"],
        Answer:"0"
    },
    {
        question:"Which CSS property gives something rounded corners?",
        Choices:["corner-round","rounding","border-radius","border"],
        Answer:"border-radius"
    },
    {
        question:"What is a short section of code written to complete a task called?",
        Choices:["Function","Array","Loop","Variable"],
        Answer:"Function"
    },
    {
        question:"String values must be enclosed with ___",
        Choices:["parenthesis","quotes","commas","curly brackets"],
        Answer:"quotes"
    }
];
// Declared variables
var score = 0;
var questionIndex = 0;

// Declared variables and start working code
var time = document.querySelector("#time");
var start = document.querySelector("#startQuiz");
var questions = document.querySelector("#questions");
var wrapper = document.querySelector("#wrapper");

// Timer variables and create a new element 
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// Triggers the timer to start
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setINteval(function () {
            secondsLeft--;
            time.textContent = "Time: " + secondsLeft;

            if (secondsLeft <=0) {
                clearInterval(holdInterval);
                allDone();
                time.textContent = "Out of Time!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// Renders questions and answer choices to the screen
function render(questionIndex) {
    questions.innerHTML = "";
    ulCreate.innerHTML = "";

    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[question.Index].choices;
        questions.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questions.appendChild(ulCreate);
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
    questionsDiv.appendChild(createDiv);
}

function allDone() {
    
}