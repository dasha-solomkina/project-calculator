const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let num1;
let num2;
let opr;

// Listen to the operator chosen
operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        // console.log(operator.textContent);
        opr = operator.textContent;

    });
});

// listen to the numeber chosen 
numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        // console.log(number.textContent)
        num1 = number.textContent;
    });
});

// operator function

function operate(numberOne, numberTwo, operation) {
    if (operation == "+") {
        return +numberOne + +numberTwo;
    } else if (operation == "-"){
        return numberOne - numberTwo;
    } else if (operation == "x") {
        return numberOne * numberTwo;
    } else if (operation == "/") {
        return (numberOne / numberTwo).toFixed(2);
    };
};

// console.log(operate("7", "3", "+"))

// function to populate the display number buttons are clicked

