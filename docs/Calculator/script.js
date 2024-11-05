let currentInput = "";
let operator = "";
let firstNumber = null;

function appendNumber(number) {
    currentInput += number;
    document.getElementById("display").value = currentInput;
}

function setOperator(op) {
    if (firstNumber === null) {
        firstNumber = parseFloat(currentInput);
        currentInput = "";
    }
    operator = op;
}

function calculate() {
    if (firstNumber !== null && operator && currentInput !== "") {
        let secondNumber = parseFloat(currentInput);
        let result;

        switch (operator) {
            case "+":
                result = firstNumber + secondNumber;
                break;
            case "-":
                result = firstNumber - secondNumber;
                break;
            case "*":
                result = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber === 0) {
                    result = "Error";
                } else {
                    result = firstNumber / secondNumber;
                }
                break;
            default:
                result = "Error";
        }

        document.getElementById("display").value = result;
        firstNumber = result;
        currentInput = "";
        operator = "";
    }
}

function clearDisplay() {
    currentInput = "";
    firstNumber = null;
    operator = "";
    document.getElementById("display").value = "";
}
