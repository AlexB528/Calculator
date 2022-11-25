let result = 0;
let secondNumStart = 0;
let anotherRound = false;

const first = {
    value: 0,
    started: false,
    entered: false,
    btnType: "number"
  };

const second = {
    value: 0,
    started: false,
    entered: false,
    btnType: "number",
  };

const operator = {
    value: "tbd",
    pressed: false
}

function divide (a,b) {
    return a / b;
}

function multiply (a,b) {
    return a * b;
}

function subtract (a,b) {
    return a - b;
}

function add (a,b) {
    return a + b;
}

const buttons = document.querySelectorAll('button');
const operatorBtns = document.querySelectorAll('button.operator')
const displayResult = document.getElementById('displayResult');
buttons.forEach(button => button.addEventListener('click',buttonclick));

function enterNum (x) {
        if (displayResult.innerText == "-") {
            displayResult.innerText = x;
            first.value = Number(displayResult.innerText);
        } else if (!first.entered) {
            displayResult.innerText += x;
            first.value = Number(displayResult.innerText);
        } else if (secondNumStart == 1) {
            displayResult.innerText = x;
            second.value = Number(displayResult.innerText);
        } else {
            displayResult.innerText += x;
            second.value = Number(displayResult.innerText);
        }
}

function clear () {
    displayResult.innerText = "-";
    first.started = false;
    first.entered = false;
    second.started = false;
    second.entered = false;
    operator.pressed = false;
    secondNumStart = 0;
    anotherRound = false;
    operator.pressed = false;
}

function operation (a,b) {
    if (operator.value == "/") {
        result = divide(a,b);
    } else if (operator.value == "*") {
        result = multiply(a,b);
    } else if (operator.value == "-") {
        result = subtract(a,b);
    } else if (operator.value == "+") {
        result = add(a,b);
    }
    result = Math.round(result*100)/100;
    displayResult.innerText = result;
    first.value = result;
    second.started = false;
    second.entered = false;
    secondNumStart = 0;
    anotherRound = true;
}

function buttonclick (e){
    btntxt = e.target.innerText;
    if (btntxt == "AC") {
        clear();
        return;
    }
    if (e.target.className == "operator" && !first.started) {
        return;
    }
    if (e.target.className == "number" && !first.entered) {
        first.started = true;
        enterNum(btntxt);
    } else if (e.target.className == "operator" && !second.started) {
        first.entered = true;
        operator.value = btntxt;
        if (operator.value == "=") {
            displayResult.innerText = "Error";
            return;
        }
        if (anotherRound) {
            operator.pressed = true;
        }
    } else if (btntxt == "=") {
        operation (first.value,second.value);
        operator.pressed = false;
        
    } else if (e.target.className == "operator" && second.started) {
        second.entered = true;
        operation(first.value,second.value);
        operator.value = btntxt;
        operator.pressed = true;
    } else if (e.target.className =="number" && !operator.pressed && anotherRound) {
        clear();
        first.started = true;
        enterNum(btntxt);
    } else if (e.target.className =="number" && !second.entered) {
        second.started = true;
        secondNumStart += 1;
        enterNum(btntxt);
    } 
}

// Need to be able to do more than two operations before =






    


