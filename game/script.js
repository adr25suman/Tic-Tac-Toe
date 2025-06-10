let msgContainer = document.querySelector("#msg-btn");
let msg = document.querySelector("#msg");
let gameContainer = document.querySelector(".container");

let turn0 = true; // true -> player '0', false -> player 'X'

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  msg.innerText = ""; // Clear message on reset
};

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "") return; // Prevent overwriting moves

    box.innerText = turn0 ? "0" : "X";
    box.disabled = true;
    turn0 = !turn0;

    checkWinner();
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkDraw = () => {
  return [...boxes].every((box) => box.innerText !== "");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let pos1Val = boxes[a].innerText;
    let pos2Val = boxes[b].innerText;
    let pos3Val = boxes[c].innerText;

    if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
      showWinner(pos1Val);
      return;
    }
  }

  if (checkDraw()) {
    msg.innerText = `It's a draw!`;
    msgContainer.classList.remove("hide");
  }
};

document.querySelector("#new-btn").addEventListener("click", resetGame);
document.querySelector("#reset-btn").addEventListener("click", resetGame);
