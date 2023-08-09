// const numbers = document.querySelectorAll(".number"); // needed? 
const operators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".key");
const result = document.querySelector(".result");
const deleteButton = document.querySelector("#delete");
const clear = document.querySelector("#clear");
const display = document.querySelector("#culcScreen");
const displaySum = document.querySelector("#sumScreen");

let num1 = "";
let num2 = "";
let opr;
let subtotal;
let continueLoop1 = true;
let continueLoop2 = true;

// populate the display
function updateDisplay(one) {
    display.textContent += one;
};

// populate the SUM display
function updateDisplaySum(one) {
    displaySum.textContent += one;
};


// Stop remembering the second number when the = is pressed
result.addEventListener("click", (e) => {
    continueLoop2 = false;
});

document.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        continueLoop2 = false;
    };
});


// Stop remembering the first number when the operator is pressed
operators.forEach(operator => {
    operator.addEventListener("click", (e) => {
        if (num2 == "") {
            continueLoop1 = false;
            opr = operator.innerHTML;
            updateDisplay(opr);
        } else {
            num1 = operate(num1, num2, opr);
            opr = operator.innerHTML;
            updateDisplay(opr);
            num2 = "";
        }
    });
});


document.addEventListener("keydown", (event) => {
    if (event.key == "/" || event.key == "*" || event.key == "+" || event.key == "-") {
        if (num2 == "") {
            continueLoop1 = false;
            opr = event.key;
            updateDisplay(opr);
        } else {
            num1 = operate(num1, num2, opr);
            opr = event.key;
            updateDisplay(opr);
            num2 = "";
        };
    };
});


// operator function
function operate(numberOne, numberTwo, operation) {
    if (operation == "+") {
        return +numberOne + +numberTwo;
    } else if (operation == "-"){
        return numberOne - numberTwo;
    } else if (operation == "x") {
        return numberOne * numberTwo;
    } else if (operation == "/" && numberTwo == 0) {
        alert("You cannot devide by 0");
        return "∞"
    } else if (operation == "/") {
        return (numberOne / numberTwo).toFixed(2);
    };
};


// Clean everything -------when number is clicked after the sum------------ ADD BACKSPACE LATER
clear.addEventListener("click", (e) => {
    num1 = "";
    num2 = "";
    opr = null;
    subtotal = null;
    continueLoop1 = true;
    continueLoop2 = true;
    display.textContent = "";
    displaySum.textContent = "";
});


// run calculator with keyboard or clicks
const myArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "*", "+", "-", "Enter", "."];
document.addEventListener("keydown", handleInteraction);
keys.forEach(key => key.addEventListener("click", handleInteraction));


function handleInteraction(event) {
    if (event.type === "keydown") {
        if(myArray.includes(event.key)){
            if (continueLoop1 == true) {
                num1 += event.key; 
                updateDisplay(event.key);
            } else if (continueLoop2 == true) {
                if(event.key !== "/" && event.key !== "*" && event.key !== "+" && event.key !== "-") {
                    num2 += event.key; 
                    updateDisplay(event.key);
                };
            } else {
                subtotal = operate(num1, num2, opr);
                updateDisplaySum(subtotal)
            };
        };
    } else if (event.type === "click") {
        if (continueLoop1 == true) {
            num1 += event.target.innerHTML;
            updateDisplay(event.target.innerHTML);
        } else if (continueLoop2 == true) {
            if(!event.target.className.includes("operator")) {
                num2 += event.target.innerHTML;
                updateDisplay(event.target.innerHTML);
            };
        } else {
            subtotal = operate(num1, num2, opr);
            updateDisplaySum(subtotal)
        }
    };
};

