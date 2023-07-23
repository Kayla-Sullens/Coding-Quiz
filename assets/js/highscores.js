var scoreContainer = document.querySelector("#quizContent");
var highScores = document.querySelector("#displayScores");
var backButton = document.querySelector("#back");
var clearButton = document.querySelector("#clear");

backButton.addEventListener("click", function() {
    window.location.replace("index.html");
});

clearButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

var storeHighScores = localStorage.getItem("storeHighScores");
storeHighScores = JSON.parse(storeHighScores);