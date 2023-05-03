// Declaring all variables
let scores = [0, 0]; // [highScore, currentScore]
let highScoreEl = document.getElementById("highScore");
let highScore = 0;
let scoreAfter = 0;
let displayMove = "";
let scoresFromLocalStorage;

if (localStorage.getItem("scores") == "0,0") {
  scoresFromLocalStorage = null;
} else {
  scoresFromLocalStorage = JSON.parse(localStorage.getItem("scores"));
}

if (scoresFromLocalStorage) {
  highScore = parseInt(scoresFromLocalStorage[0]);
  scoreAfter = parseInt(scoresFromLocalStorage[1]);
  highScoreEl.textContent = `High Score:  ${highScore}`;
  document.getElementById("player-score").innerText = scoreAfter;
}

// Function to generate random choices
const choices = ["Rock", "Paper", "Scissors"];

const getComputerChoice = (choices) => {
  return choices[Math.floor(Math.random() * choices.length)];
};

// To set score to zero on loading
const setZero = () => {
  document.getElementById("player-score").innerText = "0";
};

// Function for changing scores after every click

const getResult = (playerChoice, computerChoice) => {
  scoreBefore = document.getElementById("player-score").innerText;
  const playerAndComp = playerChoice + computerChoice;
  switch (playerAndComp) {
    case "RockScissors":
    case "PaperRock":
    case "ScissorsPaper":
      document.getElementById("player-score").innerText++;
      break;
    case "RockPaper":
    case "PaperScissors":
    case "ScissorsRock":
      document.getElementById("player-score").innerText--;
      break;
    case "RockPaper":
    case "PaperScissors":
    case "ScissorsRock":
      break;

    default:
      break;
  }

  scoreAfter = parseInt(document.getElementById("player-score").innerText);
  return scoreBefore, scoreAfter;
};

let finalresult = document.getElementById("result").innerText;

// Function for displaying player and computer choices
const showResult = (scoreBefore, scoreAfter, playerChoice, computerChoice) => {
  document.getElementById("hands").innerText;
  if (playerChoice == "Rock") {
    displayMove = "✊";
  } else if (playerChoice == "Paper") {
    displayMove = "🤚";
  } else {
    displayMove = "✌";
  }
  if (computerChoice == "Rock") {
    document.getElementById("hands").innerText = displayMove + " ✊";
  } else if (computerChoice == "Paper") {
    document.getElementById("hands").innerText = displayMove + " 🤚";
  } else {
    document.getElementById("hands").innerText = displayMove + " ✌";
  }

  // High Score update
  finalresult = document.getElementById("result").innerText;
  if (parseInt(scoreAfter) > highScore) {
    highScore = scoreAfter; // Updating high scores
    scores[0] = highScore;
    highScoreEl.textContent = `High Score:  ${highScore}`;
  }
  scores[1] = scoreAfter;
  scores[0] = highScore;
  localStorage.setItem("scores", JSON.stringify(scores)); // Uploading the new scores into Local Storage

  // Changing result's colors and playing sounds based on Win, Draw or Lose
  if (parseInt(scoreBefore) > parseInt(scoreAfter)) {
    document.getElementById("result").style.color = "red";
    document.getElementById("result").innerText = "You Lose!";
  } else if (parseInt(scoreBefore) < parseInt(scoreAfter)) {
    document.getElementById("result").style.color = "green";
    document.getElementById("result").innerText = "You Won!";
  } else {
    document.getElementById("result").style.color = "yellow";
    document.getElementById("result").innerText = "Draw";
  }
};
const onClickRPS = (playerChoice) => {
  computerChoice = getComputerChoice(choices);
  getResult(playerChoice, computerChoice);

  showResult(scoreBefore, scoreAfter, playerChoice, computerChoice);
};

// Function to play game using R, P and S keys on keyboard
const playGame = () => {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "r":
        onClickRPS("Rock");
        break;
      case "R":
        onClickRPS("Rock");
        break;
      case "p":
        onClickRPS("Paper");
        break;
      case "P":
        onClickRPS("Paper");
        break;
      case "s":
        onClickRPS("Scissors");
        break;
      case "S":
        onClickRPS("Scissors");
        break;

      default:
        break;
    }
  });

  const rpsButtons = document.querySelectorAll(".rpsButton");
  rpsButtons.forEach(
    (rpsButton) =>
      (rpsButton.onclick = () => {
        onClickRPS(rpsButton.value);
      })
  );
};

// End Game function to reset score to zero and keeps high score same
const endGame = () => {
  scores[0] = highScore;
  scores[1] = scoreAfter;
  localStorage.setItem("scores", JSON.stringify(scores));
  highScoreEl.textContent = `High Score:  ${highScore}`;
  const endGameButton = document.getElementById("endGameButton");
  endGameButton.onclick = () => {
    scoreAfter = 0;
    scores[1] = scoreAfter;
    localStorage.setItem("scores", JSON.stringify(scores));
    highScoreEl.textContent = `High Score:  ${highScore}`;
    document.getElementById("player-score").innerText = scoreAfter;
    document.getElementById("result").innerText = "";
    document.getElementById("hands").innerText = "";
  };
};

// Reset Game function to reset score and high score to zero

function resetGame() {
  const resetButton = document.getElementById("resetButton");
  resetButton.onclick = () => {
    highScore = 0;
    scoreAfter = 0;
    scores[0] = highScore;
    scores[1] = scoreAfter;
    localStorage.setItem("scores", JSON.stringify(scores));
    highScoreEl.textContent = `High Score:  ${highScore}`;
    document.getElementById("player-score").innerText = scoreAfter;
    document.getElementById("result").innerText = "";
    document.getElementById("hands").innerText = "";
  };
}

// Calling out functions which are not attached to buttons
playGame();
endGame();
resetGame();
