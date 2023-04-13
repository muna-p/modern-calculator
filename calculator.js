let operators = {
    '+': (a,b) => a + b,
    '-': (a,b) => a - b,
    '*': (a,b) => a * b,
    '/': (a,b) => a / b,
}

let operate = (firstNumber,secondNumber,operator) => operators[operator](firstNumber, secondNumber);

let displaySelect = document.querySelector('#display');

let numberChosen = document.querySelectorAll('.number');
let operatorChosen = document.querySelectorAll('.operator');
let equalChosen = document.querySelectorAll('.equal');
let clearChosen = document.querySelectorAll('.clear');
let periodChosen = document.querySelectorAll('.period');
let deleteChosen = document.querySelectorAll('.delete');

let currentNumber = document.createElement('div');
currentNumber.classList.add('currentNumber');

let tempNumber = 0;
let tempNumberTwo = 0;
let tempNumberThree = 0;
let tempOperator = "";

currentNumber.textContent = 0;
displaySelect.appendChild(currentNumber);

numberChosen.forEach((button) => {
    button.addEventListener('click', () => {
        tempNumber += button.textContent;
        currentNumber.textContent = +tempNumber;
        displaySelect.appendChild(currentNumber);
    });
  });

operatorChosen.forEach((button) => {
    button.addEventListener('click', () => {
        tempOperator += button.textContent;
        if (tempOperator.length > 1) {
            let tempOperatorTwo = tempOperator.slice(tempOperator.length - 2, tempOperator.length - 1);
                
            calculate(tempOperatorTwo);

            tempNumber = 0;
            tempNumberTwo = 0;
        } else {
            tempNumberTwo = tempNumber;
            tempNumber = 0;
        }
    });
  });

equalChosen.forEach((button) => {
    button.addEventListener('click', (event) => {
        if (tempOperator.length > 1) {
            let tempOperatorTwo = tempOperator.slice(tempOperator.length - 1);
            calculate(tempOperatorTwo);
        } else {
            calculate(tempOperator);
        }

        tempNumber = 0;
        tempNumberTwo = 0;    
        tempOperator = "";

    });
  });

clearChosen.forEach((button) => {
    button.addEventListener('click', (event) => {

        tempNumber = 0;
        tempNumberTwo = 0;
        tempNumberThree = 0;
        tempOperator = "";
        
        currentNumber.textContent = 0;
    });
  });  

periodChosen.forEach((button) => {
    button.addEventListener('click', () => {
        tempNumber += button.textContent;
        
        currentNumber.textContent = +tempNumber;
        displaySelect.appendChild(currentNumber);
    });
  });

function calculate(operator) {
    if (tempNumberThree && !tempNumberTwo) {
        if (tempNumber == 0 && operator == "/") {
            currentNumber.textContent = "Error";
        
            tempNumber = 0;
            tempNumberTwo = 0;
            tempNumberThree = 0;    
            tempOperator = "";
        } else {
            let total = operate(+tempNumberThree,+tempNumber,operator);
            currentNumber.textContent = +total.toFixed(3);
            tempNumberThree = total;}
    } else {
        if (tempNumber == 0 && operator == "/") {
            currentNumber.textContent = "Error";
        
            tempNumber = 0;
            tempNumberTwo = 0;
            tempNumberThree = 0;    
            tempOperator = "";
        } else {
            let total = operate(+tempNumberTwo,+tempNumber,operator);
            currentNumber.textContent = +(total.toFixed(3));
            tempNumberThree = total;}
    }
}

document.addEventListener('keydown', (event) => {
    let name = event.key;
    let code = event.code;

    let checkNumber = /\d/;
    let operatorValue = ["/","*","-","+"];

    if(checkNumber.test(name)) {
        for (i in numberChosen) { 
            if (numberChosen[i].textContent == name) {numberChosen[i].click();}
        }
    } else if (name == 'Clear') {
        clearChosen[0].click();
        currentNumber.textContent = 0;
    } else if (operatorValue.includes(name)) {
        for (i in operatorChosen) { 
            if (operatorChosen[i].textContent == name) {operatorChosen[i].click();}
        }
    } else if (name == "=" || name == "Enter") {
        equalChosen[0].click();
    } else if (name == ".") {
        periodChosen[0].click();
    } else if (name == "Backspace" | name == "Delete") { 
        deleteChosen[0].click();
    }

    event.preventDefault();
  }, false);


deleteChosen.forEach((button) => {
    button.addEventListener('click', () => {
        tempNumber = currentNumber.textContent.slice(0,currentNumber.textContent.length-1);

        currentNumber.textContent = tempNumber;

        tempNumberThree = 0;
    });
  });

  