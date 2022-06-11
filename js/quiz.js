var timer;
var GAMETIME = 60;
var gameTime = GAMETIME;
var questionIndex = 0;
var penalty = 5;
var score = 0;
var timeField = document.getElementById("time");
var timeFieldPrefix = 'Time remaining: ';
var answerOList = document.createElement("ol");


// get elements 
var mainSection = document.getElementById("mainSection");
var welcomeModal = document.getElementById("welcomeModal");
var gameSection = document.getElementById("gameSection");
var gameDead = document.getElementById("gameDead");
var gameScores = document.getElementById("gameScores");
var scoresList = document.getElementById("scoresList");
var showScores = document.getElementById("showScores");

var scoresButton = document.getElementById("highScores");
var startButton = document.getElementById("startGame");
var saveScoreBtn = document.getElementById("saveData");
var backButton = document.getElementById("backToGame");
var restartGameBtn = document.getElementById("restartGame");
var resetScoresBtn = document.getElementById("resetScores");

var questionText = document.getElementById("questionText");
var questionChoices = document.getElementById("choices");
var userAnswer = document.getElementById("answer");

var init = function() {
    gameScores.hidden = true;
    mainSection.hidden = false;
    timeField.innerHTML = timeFieldPrefix + gameTime;
    highScores = JSON.parse(localStorage.getItem("highScores"));
}

var startButtonClick = function() {
    gameTime = GAMETIME;
    scoresButton.disabled = true;
    welcomeModal.hidden = true;
    gameSection.hidden = false;
    startGame();
}

var scoresClick = function() {

    welcomeModal.hidden = true;
    gameSection.hidden = true;
    gameDead.hidden = false;
}

var backButtonClick = function() {
    welcomeModal.hidden = false;
    gameDead.hidden = true;
}

var timerBegin = function() {
    gameTime--;
    timeField.innerHTML = timeFieldPrefix + gameTime;
    if (gameTime <= 0) {
        clearInterval(timer);
        gameOver();
    }
}

var scoresClicked = function() {
    if (confirm("Are you sure you want to reset the scores?")) {
        highScores = [];
        localStorage.setItem("highScores", JSON.stringify(highScores));
        scoresClick();
    }
}

var handleChoiceClick = function (event) {
    if ( event.target.tagName === 'BUTTON') {
        if (event.target.innerHTML === questions[questionIndex].answer) {
            userAnswer.innerHTML = "Correct!";
            score++;
        } else {
            userAnswer.innerHTML = "Wrong!";
            if ((gameTime - penalty) > 0) {
                gameTime = 0;
                timeField.innerHTML = timeFieldPrefix + gameTime;
                endGame();
            }
        }
        if (questionIndex >= (questions.length - 1)) {
            clearInterval(timer);
            endGame();
        } else {
            questionIndex++;
            askQuestion(questions[questionIndex]);
        }
    }
}

var askQuestion = function(question) {
    answerOList.innerHTML = "";
    questionText.innerHTML = question.title;
    console.log(question.choices);
    for (var i = 0; i < question.choices.length; i++) {
        var answerItem = document.createElement("li");
        var choice = document.createElement("button");
        choice.innerHTML = question.choices[i];
        answerItem.append(choice);
        answerOList.append(answerItem);
    }
    questionChoices.append(answerOList);
    questionChoices.addEventListener("click", handleChoiceClick);
} 


var startGame = function() {
    questionIndex = 0;
    score = 0;
    timer = setInterval(timerBegin, 1000);
    askQuestion(questions[0]);
}

var endGame = function() {
    gameSection.hidden = true;
    gameDead.hidden = false;
    showScores.textContent = "Your score is " + score;
    console.log(gameDead);
}

scoresButton.addEventListener("click", scoresClick);
backButton.addEventListener("click", backButtonClick);
startButton.addEventListener("click", startButtonClick);

init();
