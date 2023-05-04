// Declaring all variables
let highScoreEl = document.getElementById("highScore");
let scores = [0, 0];
let highScore = 0;
let scoreAfter = 0;
let displayMove = "";
let scoresFromLocalStorage;

const choices = ["Rock", "Paper", "Scissors"];

const getComputerChoice = (choices) => {
  return choices[Math.floor(Math.random() * choices.length)];
};

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

// Function for sounds on button click
function playSound(e) {
  if (e == "_gameover2") var audio = new Audio("sounds/" + e + ".wav");
  if (e == "Win3") var audio = new Audio("sounds/" + e + ".wav");
  if (e == "Draw2") var audio = new Audio("sounds/" + e + ".wav");
  if (e == "tada") var audio = new Audio("sounds/" + e + ".wav");
  if (e == "reset") var audio = new Audio("sounds/" + e + ".wav");

  audio.play();
}

const setZero = () => {
  document.getElementById("player-score").innerText = "0";
};

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
    playSound("_gameover2");
    document.getElementById("result").innerText = "You Lose!";
  } else if (parseInt(scoreBefore) < parseInt(scoreAfter)) {
    document.getElementById("result").style.color = "green";
    playSound("Win3");
    document.getElementById("result").innerText = "You Won!";
  } else {
    document.getElementById("result").style.color = "yellow";
    playSound("Draw2");
    document.getElementById("result").innerText = "Draw";
  }
};
const onClickRPS = (playerChoice) => {
  computerChoice = getComputerChoice(choices);
  getResult(playerChoice, computerChoice);

  showResult(scoreBefore, scoreAfter, playerChoice, computerChoice);
};

// Function to play on keyboard
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

// End Game
const endGame = () => {
  scores[0] = highScore;
  scores[1] = scoreAfter;
  localStorage.setItem("scores", JSON.stringify(scores));
  highScoreEl.textContent = `High Score:  ${highScore}`;
  const endGameButton = document.getElementById("endGameButton");

  endGameButton.onclick = () => {
    playSound("tada");
    scoreAfter = 0;
    scores[1] = scoreAfter;
    localStorage.setItem("scores", JSON.stringify(scores));
    highScoreEl.textContent = `High Score:  ${highScore}`;
    document.getElementById("player-score").innerText = scoreAfter;
    document.getElementById("result").innerText = "";
    document.getElementById("hands").innerText = "";
  };
};

// Reset Game

function resetGame() {
  const resetButton = document.getElementById("resetButton");

  resetButton.onclick = () => {
    playSound("reset");
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

// Calling the functions
playGame();
endGame();
resetGame();
