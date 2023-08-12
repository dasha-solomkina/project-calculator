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
let continueLoop3 = true;
let operatorArray = ["/", "*", "+", "-"];


// Delete function
function deleteInput(event) {
    if (event.type == "click") {
        if (continueLoop1 == true) {
            num1 = num1.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        } else if (continueLoop2 == true) {
            num2 = num2.slice(0, -1);
            display.textContent = display.textContent.slice(0, -1);
        };
    } else {
        if (event.key == "Backspace") {
            if (continueLoop1 == true) {
                num1 = num1.slice(0, -1);
                display.textContent = display.textContent.slice(0, -1);
            } else if (continueLoop2 == true) {
                num2 = num2.slice(0, -1);
                display.textContent = display.textContent.slice(0, -1);
            };
        };
    };
};

// execute detele when a button or a backspace are clicked
deleteButton.addEventListener("click", deleteInput);
document.addEventListener("keydown", deleteInput)


// populate the display
function updateDisplay(one) {
    display.textContent += one;
};

// replace operator when clicked several times
function replaceDisplay(one) {
    display.textContent = display.textContent.slice(0, -1) + one;
};

// populate the SUM display
function updateDisplaySum(one) {
    displaySum.textContent += one;
    continueLoop3 = false;
};

// make the result number pretty 
function trimResult (number) {
    return parseFloat(Number(number.toFixed(2)))
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
            if (operatorArray.includes(display.textContent.slice(-1))) {
                replaceDisplay(opr);
            } else {
                updateDisplay(opr);
            };
        } else if (!subtotal == "") {
            updateDisplay(opr);
            opr = operator.innerHTML;
        } else {
            num1 = operate(num1, num2, opr);
            opr = operator.innerHTML;
            updateDisplay(opr);
            num2 = "";   
        };
    });
});


document.addEventListener("keydown", (event) => {
    if (event.key == "/" || event.key == "*" || event.key == "+" || event.key == "-") {
        if (num2 == "") {
            continueLoop1 = false;
            opr = event.key;
            if(operatorArray.includes(display.textContent.slice(-1))) {
                replaceDisplay(opr);
            } else {
                updateDisplay(opr);
            };
        } else if (!subtotal == "") {
            updateDisplay(opr);
            opr = event.key;
        }else {
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
        return trimResult(+numberOne + +numberTwo);
    } else if (operation == "-"){
        return trimResult(numberOne - numberTwo);
    } else if (operation == "*") {
        return trimResult(numberOne * numberTwo);
    } else if (operation == "/" && numberTwo == 0) {
        alert("You cannot devide by 0");
        return "∞";
    } else if (operation == "/") {
        return trimResult(numberOne / numberTwo);
    };
};


// Clean everything ------when number is clicked after the sum
clear.addEventListener("click", startOver);

function startOver() {
    num1 = "";
    num2 = "";
    opr = null;
    subtotal = null;
    continueLoop1 = true;
    continueLoop2 = true;
    continueLoop3 = true;
    display.textContent = "";
    displaySum.textContent = "";
};


// run calculator with keyboard or clicks
const myArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "*", "+", "-", "Enter", "."];
document.addEventListener("keydown", handleInteraction);
keys.forEach(key => key.addEventListener("click", handleInteraction));


function handleInteraction(event) {
    if (event.type === "keydown") {
        if(myArray.includes(event.key)){
            if (continueLoop1 == true) {
                if (event.key == "." && num1.includes(".")) {
                    num1;
                } else {
                    num1 += event.key; 
                    updateDisplay(event.key);
                };
            } else if (continueLoop2 == true) {
                if(event.key !== "/" && event.key !== "*" && event.key !== "+" && event.key !== "-") {
                    if (event.key == "." && num2.includes(".")) {
                        num1;
                    } else {
                        num2 += event.key; 
                    updateDisplay(event.key);
                    };
                };
            } else if (continueLoop3 == true) {
                subtotal = operate(num1, num2, opr);
                updateDisplaySum(subtotal);
            } else if (operatorArray.includes(event.key)) {
                num1 = subtotal;
                num2 = "";
                displaySum.textContent = null;
                display.textContent = num1 + opr;
                continueLoop2 = true;
                continueLoop3 = true;
                subtotal = "";
            } else {
                startOver();
                num1 += event.key;
                updateDisplay(num1);
                continueLoop1 = true;
                continueLoop2 = true;
                continueLoop3 = true;
            }
        };
    } else if (event.type === "click") {
        if (continueLoop1 == true) {
            if (event.target.innerHTML == "." && num1.includes(".")) {
                num1;
            } else {
                num1 += event.target.innerHTML; 
                updateDisplay(event.target.innerHTML);
            };
        } else if (continueLoop2 == true) {
            if(!event.target.className.includes("operator")) {
                if (event.target.innerHTML == "." && num2.includes(".")) {
                    num2;
                } else {
                    num2 += event.target.innerHTML; 
                    updateDisplay(event.target.innerHTML);
                };
            };
        } else if (continueLoop3 == true) {
            subtotal = operate(num1, num2, opr);
            updateDisplaySum(subtotal);
        } else if (operatorArray.includes(event.target.innerHTML)) {
            num1 = subtotal;
            num2 = "";
            displaySum.textContent = null;
            display.textContent = num1 + opr;
            continueLoop2 = true;
            continueLoop3 = true;
            subtotal = "";
        } else {
            startOver();        
            num1 += event.target.innerHTML;
            updateDisplay(num1);
            continueLoop1 = true;
            continueLoop2 = true;
            continueLoop3 = true;
        }
    };
};


