const numberInput = document.getElementById("number-input");
const guessScreen = document.getElementById("guess-screen");
const helpBtn = document.getElementById("help-btn");
const helpContainer = document.getElementById("help-container");
const scoreBoard = document.getElementById("scoreboard");
const guess = document.getElementById("guess");
const reset = document.getElementById("reset");
const plusTen = document.getElementById("plus-ten");
const minusTen = document.getElementById("minus-ten");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

let answer = Math.floor(Math.random() * 101);
console.log("Answer:", answer);
let score = 0;
let tries = 6;
let showContainer;

guessScreen.innerHTML = `<span id="guess-number">0</span>Press the <strong>Guess</strong> button to start!<div id="emoji">(•̀ᴗ•́ )و</div>`;

const guessLogic = () => {
  const numVal = numberInput.value;
  if (numVal == answer) {
    guessScreen.innerHTML = `<span id="guess-number">${numVal}</span>Congratulations! You guessed it!<div id="emoji">٩(^ᗜ^ )و ´-</div>`;
    winLogic();
    score++;
  } else if (numVal < answer) {
    guessScreen.innerHTML = `<span id="guess-number">${numVal}</span>Try a higher number!<div id="emoji">( • ᴖ • ｡)</div>`;
  } else if (numVal < answer - 20) {

  } else if (numVal > answer) {
    guessScreen.innerHTML = `<span id="guess-number">${numVal}</span>Try a lower number!<div id="emoji">( • ᴖ • ｡)</div>`;
  }
};

const winLogic = () => {
  //Confetti Config
  const defaults = {
  spread: 360,
  ticks: 100,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["circle", "square", "triangle"],
  colors: ["ff99c8", "fcf6bd", "d0f4de", "a9def9", "e4c1f9"],
};

confetti({
  ...defaults,
  particleCount: 50,
  scalar: 1,
});

confetti({
  ...defaults,
  particleCount: 25,
  scalar: 2,
});

confetti({
  ...defaults,
  particleCount: 10,
  scalar: 1.5,
});

guess.style.display = "none";
reset.style.display = "block";
};

const updateScore = () => {
  scoreBoard.innerHTML = `<div id="score"><span id="score-title">SCORE</span>${score}</div><div id="tries"><span id="tries-title">TRIES</span>${tries}</div>`;
};

helpBtn.addEventListener("click", () => {
  showContainer = !showContainer;
  showContainer ? helpContainer.style.display = "block" : helpContainer.style.display = "none";
});

guess.addEventListener("click", () => {
  if (tries === 0) {
    guessScreen.innerHTML = `<span id="guess-number">-1</span>Oops, better luck next time!<div id="emoji">ദ്ദി ༎ຶ‿༎ຶ )</div>`
    guess.style.display = "none";
    score--;
    reset.style.display = "block";
  } else if (tries === 6 && numberInput.value == answer) {
    guessScreen.innerHTML = `<span id="guess-number">${numberInput.value}</span><span id="rainbow-text">First try! Triple Points!</span><div id="emoji">٩(^ᗜ^ )و ´-</div>`;
    winLogic();
    score += 3;
  } else {
    tries--;
    guessLogic();
  }
  updateScore();
});

reset.addEventListener("click", () => {
  answer = Math.floor(Math.random() * 101);
  guessScreen.innerHTML = `<span id="guess-number">0</span>Keep going! Good luck!<div id="emoji">ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧</div>`;
  reset.style.display = "none";
  guess.style.display = "block";
  numberInput.value = 0;
  tries = 6;
  updateScore();
});

plus.addEventListener("click", () => {
  minus.disabled = false;
  if (numberInput.value == 100) {
    plus.disabled = true;
  } else {
    numberInput.value++;
  }
});

minus.addEventListener("click", () => {
  plus.disabled = false;
  if (numberInput.value == 0) {
    minus.disabled = true;
  } else {
    numberInput.value--;
  }
});

plusTen.addEventListener("click", () => {
  minusTen.disabled = false;
  if (numberInput.value >= 91) {
    plusTen.disabled = true;
  } else {
    numberInput.value = parseFloat(numberInput.value) + 10;
  }
});

minusTen.addEventListener("click", () => {
  plusTen.disabled = false;
  if (numberInput.value <= 9) {
    minusTen.disabled = true;
  } else {
    numberInput.value = parseFloat(numberInput.value) - 10;
  }
});