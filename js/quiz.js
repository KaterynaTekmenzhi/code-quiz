var timer;
var gameTime = 60;
var timeField = document.getElementById("time");
var timeFieldPrefix = 'Time remaining: ';

// get elements 
var welcomeModal = document.getElementById("welcomeModal");
var gameSection = document.getElementById("gameSection");
var gameDead = document.getElementById("gameDead");
var gameScores = document.getElementById("gameScores");
var scoresList = document.getElementById("scoresList");

var scoresButton = document.getElementById("highScores");
var startButton = document.getElementById("startGame");
var saveScoreBtn = document.getElementById("saveData");
var backButton = document.getElementById("backToGame");
var restartGameBtn = document.getElementById("restartGame");
var resetScoresBtn = document.getElementById("resetScores");

var questionText = document.getElementById("questionText");
var questionChoices = document.getElementById("choices");
var userAnswer = document.getElementById("answer");

var startButtonClick = function() {
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
}

var handleChoiceClick = function (event) {
    console.log(event.target);
    if ( event.target.tagName === 'BUTTON') {
        console.log('You hit a button!!!');
    }
}

var askQuestion = function(question) {
    questionText.innerHTML = question.title;
    console.log(question.choices);
    for (var i = 0; i < question.choices.length; i++) {
        var choice = document.createElement("button");
        choice.innerHTML = question.choices[i];
        questionChoices.append(choice);
    }
    questionChoices.addEventListener("click", handleChoiceClick);
} 


var startGame = function() {
    timer = setInterval(timerBegin, 1000);
    var questionRules = 0;
    askQuestion(questions[questionRules]);
}

scoresButton.addEventListener("click", scoresClick);
