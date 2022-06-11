var timer;
const GAMETIME = 60;
var gameTime = GAMETIME;
var timeout;
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
var showScores = document.getElementById("showScore");

// buttons
var scoresButton = document.getElementById("highScores");
var startButton = document.getElementById("startGame");
var saveScoreBtn = document.getElementById("saveData");
var backButton = document.getElementById("backToGame");
var restartGameBtn = document.getElementById("restartGame");
var resetScoresBtn = document.getElementById("resetScores");

// game flow
var questionText = document.getElementById("questionText");
var questionChoices = document.getElementById("choices");
var userAnswer = document.getElementById("answer");

// initialize game
var init = function() {
    gameScores.hidden = true;
    mainSection.hidden = false;
    timeField.innerHTML = timeFieldPrefix + gameTime;
    highScores = JSON.parse(localStorage.getItem("highScores")) || [];
}

// start game
var startButtonClick = function() {
    gameTime = GAMETIME;
    timeField.innerHTML = timeFieldPrefix + gameTime;
    scoresButton.disabled = true;
    welcomeModal.hidden = true;
    gameScores.hidden = true;
    gameSection.hidden = false;
    userAnswer.innerHTML = "";
    startGame();
}

// display high scores
var scoresClick = function() {
    scoresList.innerHTML = "";
    scoresButton.disabled = true;
    welcomeModal.hidden = true;
    gameSection.hidden = true;
    gameDead.hidden = true;
    gameScores.hidden = false;
    var scoresHeader = document.createElement("h2");
    var scoresUL = document.createElement("ol");
    scoresHeader.innerHTML = "High Scores";
    scoresUL.setAttribute('style', 'display: flex; flex-direction: column; justify-content: center; align-items: center;');

    highScores.sort((a, b)  => {
        return b.score - a.score;
    });
    for (var i = 0; i < highScores.length; i++) {
        var scoresLI = document.createElement("li");
        scoresLI.innerHTML = highScores[i].name + ": " + highScores[i].score;
        scoresUL.append(scoresLI);
    }
}
// button saving score to local storage
var saveScoreClick = function() {
    var highScore = {
        name: document.getElementById("name").value || "Anonymous",
        score: score
    };
    highScores.push(highScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    scoresClick();
}

// button comes back to welcome modal
var backButtonClick = function() {
    welcomeModal.hidden = false;
    gameDead.hidden = true;
}

// timer
var timerBegin = function() {
    gameTime--;
    timeField.innerHTML = timeFieldPrefix + gameTime;
    if (gameTime <= 0) {
        clearInterval(timer);
        endGame();
    }
}

// reset scores
var scoresClicked = function() {
    if (confirm("Are you sure you want to reset the scores?")) {
        highScores = [];
        localStorage.setItem("highScores", JSON.stringify(highScores));
        scoresClick();
    }
}

// random question generator
var shuffle = function(array) {
    array.sort(() => Math.random() - 0.5);
}

// handle users choice click and check if correct
// if correct, add to score
// if wrong, subtract time
// if time is 0, game over
// if question is last, end game
var handleChoiceClick = function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        userAnswer.innerHTML = "";
    }, 2000);
    if ( event.target.tagName === 'BUTTON') {
        if (event.target.innerHTML === questions[questionIndex].answer) {
            userAnswer.innerHTML = "Correct!";
            score++;
        } else {
            userAnswer.innerHTML = "Wrong!";
            if ((gameTime - penalty) <= 0) {
                gameTime = 0;
                timeField.innerHTML = timeFieldPrefix + gameTime;
                endGame();
            } else {
                gameTime -= penalty;
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

// ask question
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
    shuffle(questions);
    askQuestion(questions[0]);
}

var endGame = function() {
    if (gameTime < 0) {
        gameTime = 0;
        timeField.innerHTML = timeFieldPrefix + gameTime;
    }
    
    var showScore = document.getElementById("showScore");
    gameSection.hidden = true;
    gameDead.hidden = false;
    showScore.innerHTML = "Your score is " + score;
    scoresButton.disabled = false;
    console.log(gameDead);
}

scoresButton.addEventListener("click", scoresClick);
backButton.addEventListener("click", backButtonClick);
startButton.addEventListener("click", startButtonClick);
resetScoresBtn.addEventListener("click", scoresClicked);
saveScoreBtn.addEventListener("click", saveScoreClick);
restartGameBtn.addEventListener("click", startButtonClick);

init();
