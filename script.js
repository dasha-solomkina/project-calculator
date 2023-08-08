const numbers = document.querySelectorAll(".number"); // needed? 
const operators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".key");
const result = document.querySelector(".result");

let num1 = "";
let num2 = "";
let opr;
let continueLoop1 = true;
let continueLoop2 = true;


// Stop remembering the first number when the operator is pressed
operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        continueLoop1 = false;
        opr = operator.innerHTML;
    });
});

// Stop remembering the second number when the = is pressed
result.addEventListener("click", (e) => {
    continueLoop2 = false;
});

// Function to unity everything WIP
keys.forEach(key => {
    key.addEventListener("click", (e) => {
        if (continueLoop1 == true) {
            num1 += key.innerHTML;
            console.log(num1);
        } else if (continueLoop2 == true) {
            if(!key.className.includes("operator")) {
                num2 += key.innerHTML;
                console.log(num2);
            };
        } else {
            console.log(operate(num1, num2, opr));
        }
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


// function to populate the display number buttons are clicked
// const display = document.querySelector("#screen");
// function updateDisplay(one) {
//     display.textContent += one;
// }