// const numbers = document.querySelectorAll(".number"); // needed? 
const operators = document.querySelectorAll(".operator");
const keys = document.querySelectorAll(".key");
const result = document.querySelector(".result");
const deleteButton = document.querySelector("#delete");
const clear = document.querySelector("#clear");


let num1 = "";
let num2 = "";
let opr;
let subtotal;
let continueLoop1 = true;
let continueLoop2 = true;


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
            // continueLoop2 = true;
            num1 = operate(num1, num2, opr);
            opr = operator.innerHTML;
            updateDisplay(opr);
            num2 = "";
        }
    });
});

// Function to unity everything
keys.forEach(key => {
    key.addEventListener("click", (e) => {
        if (continueLoop1 == true) {
            num1 += key.innerHTML;
            updateDisplay(key.innerHTML);
        } else if (continueLoop2 == true) {
            if(!key.className.includes("operator")) {
                num2 += key.innerHTML;
                updateDisplay(key.innerHTML);
            };
        } else {
            subtotal = operate(num1, num2, opr);
            updateDisplaySum(subtotal)
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
    } else if (operation == "/" && numberTwo == 0) {
        alert("You cannot devide by 0");
        return "∞"
    } else if (operation == "/") {
        return (numberOne / numberTwo).toFixed(2);
    };
};


// function to populate the display number buttons are clicked
const display = document.querySelector("#culcScreen");
function updateDisplay(one) {
    display.textContent += one;
}

// function to populate the SUM display number buttons are clicked
const displaySum = document.querySelector("#sumScreen");
function updateDisplaySum(one) {
    displaySum.textContent += one;
}

// Clean everything 
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



// Stop remembering the first number when the operator is pressed(KEYSSSSS)

document.addEventListener("keydown", (event) => {
    if (event.key == "/" || event.key == "*" || event.key == "+" || event.key == "-") {
        if (num2 == "") {
            continueLoop1 = false;
            opr = event.key; ///// change
            updateDisplay(opr);
        } else {
            // continueLoop2 = true;
            num1 = operate(num1, num2, opr);
            opr = event.key; ///// change
            updateDisplay(opr);
            num2 = "";
        };
    };
});



// testing key
const myArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "/", "*", "+", "-", "Enter"];
document.addEventListener("keydown", handleInteraction);

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
    };
};

