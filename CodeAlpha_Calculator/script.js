const screen = document.getElementById("screen");
const preview = document.getElementById("preview");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let isEvaluated = false;

// Helper function to update screen and preview
function updateDisplay(inputVal) {
  screen.value = inputVal || "0";
  preview.textContent = inputVal;
}

// Function handling mathematical evaluation and error handling
function calculateResult() {
  if (!currentInput) return;

  // Advanced Error Handling: Division by Zero check
  if (/\/0(?!\d)/.test(currentInput)) {
    preview.textContent = `${currentInput} =`;
    screen.value = "Cannot divide by 0";
    currentInput = "";
    isEvaluated = true;
    return;
  }

  try {
    const result = eval(currentInput);

    if (!isFinite(result)) {
      preview.textContent = `${currentInput} =`;
      screen.value = "Cannot divide by 0";
      currentInput = "";
    } else {
      preview.textContent = `${currentInput} =`;
      screen.value = result;
      currentInput = String(result);
    }
    isEvaluated = true;
  } catch (error) {
    preview.textContent = currentInput;
    screen.value = "Invalid Syntax";
    currentInput = "";
    isEvaluated = true;
  }
}

// Button Click Event Handler
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      currentInput = "";
      updateDisplay("");
      isEvaluated = false;
    } else if (action === "delete") {
      if (isEvaluated) {
        currentInput = "";
        updateDisplay("");
        isEvaluated = false;
      } else {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
      }
    } else if (action === "calculate") {
      calculateResult();
    } else if (value) {
      if (isEvaluated) {
        if (["+", "-", "*", "/"].includes(value)) {
          isEvaluated = false;
        } else {
          currentInput = "";
          isEvaluated = false;
        }
      }
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});

// Keydown Event Handler
window.addEventListener("keydown", (e) => {
  const key = e.key;

  if ((!isNaN(key) && key !== " ") || ["+", "-", "*", "/", "."].includes(key)) {
    if (isEvaluated) {
      if (["+", "-", "*", "/"].includes(key)) {
        isEvaluated = false;
      } else {
        currentInput = "";
        isEvaluated = false;
      }
    }
    currentInput += key;
    updateDisplay(currentInput);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    if (isEvaluated) {
      currentInput = "";
      updateDisplay("");
      isEvaluated = false;
    } else {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    }
  } else if (key === "Escape") {
    currentInput = "";
    updateDisplay("");
    isEvaluated = false;
  }
});
