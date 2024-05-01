const input = document.getElementById("input");
const sumBtn = document.getElementById("sum");
const subtractBtn = document.getElementById("subtract");
const divideBtn = document.getElementById("divide");
const multiplyBtn = document.getElementById("multiply");
const decimalBtn = document.getElementById("decimal-dot");
const clearBtn = document.getElementById("clear");
const resultBtn = document.getElementById("result");

let operation = "";

// When numbers are clicked from 0-9 they get displayed in input.
for (let i = 0; i <= 9; i++) {
    const numBtn = document.getElementById(`button${i}`);
    numBtn.addEventListener("click", () => {
        const inputValue = numBtn.innerText;
        input.value += inputValue;
    })
};

sumBtn.addEventListener("click", () => {
    operation = "+";
    input.value += operation;
});

subtractBtn.addEventListener("click", () => {
    operation = "-";
    input.value += operation;
});

divideBtn.addEventListener("click", () => {
    operation = "/";
    input.value += operation;
});

multiplyBtn.addEventListener("click", () => {
    operation = "*";
    input.value += operation;
});

decimalBtn.addEventListener("click", () => {
    const lastOperation = input.value.split(/[\+\-\*\/]/).pop();
    if (!lastOperation.includes(".")) {
    input.value += ".";
    }
});

clearBtn.addEventListener("click", () => {
    input.value = "";
});

const calculate = (expression) => {
    if (isNaN(expression[0]) && expression[0] !== '-' && expression[0] !== '+' || /[\+\-\*\/]{2,}/.test(expression)) {
        return "Syntax Error";
    }
    const operands = expression.split(operation);
    const num1 = parseFloat(operands[0]);
    const num2 = parseFloat(operands[1]);
    let result;
    switch (operation) {
    case "":
        return expression;
        break;
    case "+":
        result = num1 + num2;
        break;
    case "-":
        result = num1 - num2;
        break;
    case "/":
        if (num2 !== 0) {
            result = num1 / num2;
        } else {
            return "Error: Can't Divide By 0"
        }
        break;
    case "*":
        result = num1 * num2;
        break;
    default:
        result = "0";            
    }
    return result;
};

resultBtn.addEventListener("click", () => {
    const currentResult = calculate(input.value);
    input.value = currentResult;
    operation = "";
});

//Problems if -6-6/+6+6 = NaN or 6/-5|5/+4 = Syntax Error

//IDEA!!! click on input to copy to clipboard