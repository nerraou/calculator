let runningTotal = 0;
let buffer = "0";
let previousOperetor = 0;
const screen = document.querySelector(".screen");

document
  .querySelector(".calc-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handlSymbol(value);
  } else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}

function handlSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperetor = null;
      break;
    case "=":
      if (previousOperetor === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperetor = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handelMath(value);
      break;
  }
}

function handelMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperetor = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperetor === "+") {
    runningTotal += intBuffer;
  } else if (previousOperetor === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperetor === "✖️") {
    runningTotal *= intBuffer;
  } else {
    runningTotal /= intBuffer;
  }
}

function rerender() {
  screen.innerText = buffer;
}
