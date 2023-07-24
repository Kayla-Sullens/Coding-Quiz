var highScore = document.querySelector("#highScores");
var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#clear");

// Event listener to clear the score
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// Get local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !=== null) {
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