class Calculator {
    constructor(primaryDisplay, secondaryDisplay) {
        this.primaryScreen = primaryDisplay;
        this.secondaryScreen = secondaryDisplay;
        this.secondaryOperand = "";
        this.primaryOperand = "0";
        this.operator = undefined;
        this.update();
    }

    appendNumber(digit) {
        if(digit === "." && this.primaryOperand.includes(".")) return;
        if(this.primaryOperand === "0") {
            if(parseInt(digit) === 0) return;
            else {
                this.primaryOperand = digit.toString();
                this.update();
                return;
            }
        }
        this.primaryOperand = this.primaryOperand.toString() + digit.toString();
        this.update();
    }

    allClear() {
        this.secondaryOperand = "";
        this.primaryOperand = "0";
        this.operator = undefined;
        this.update();
    }

    delete() {
        this.primaryOperand = this.primaryOperand.toString().slice(0, -1);
        this.update();
    }

    calculate() {
        const num1 = parseFloat(this.secondaryOperand);
        const num2 = parseFloat(this.primaryOperand);
        if(this.operator === undefined) return;
        let result;
        switch (this.operator) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "x":
                result = num1 * num2;
                break;
            case "÷":
                if(num2 === 0) return;
                result = num1 / num2;
                break;
        
            default:
                break;
        }
        this.primaryOperand = result.toString();
        this.secondaryOperand = "";
        this.operator = undefined;
        this.update();
    }

    addOperator(operation) {
        if(this.primaryOperand === "") return;
        if(this.operator !== undefined)
            this.calculate();
        this.operator = operation;
        this.secondaryOperand = this.primaryOperand;
        this.primaryOperand = "0";
        this.update();
    }

    update() {
        this.primaryScreen.innerText = `${this.primaryOperand}`;
        if(this.operator) this.secondaryScreen.innerText = `${this.secondaryOperand}  ${this.operator}`;
        else this.secondaryScreen.innerText = `${this.secondaryOperand}`;
    }

}

const digits = document.querySelectorAll("[btn-number]");
const operators = document.querySelectorAll("[btn-operation]");
const btnClearAll = document.querySelector("[btn-clear-all]");
const btnDelete = document.querySelector("[btn-delete]");
const btnEqualsTo = document.querySelector("[btn-equalTo]");
const secondaryDisplay = document.getElementById("secondary-output");
const primaryDisplay = document.getElementById("primary-output");

const cal = new Calculator(primaryDisplay, secondaryDisplay);

digits.forEach((button) => {
    button.addEventListener("click", () => {
        cal.appendNumber(button.innerText);
    });
});

btnClearAll.addEventListener("click", () => {
    cal.allClear();
});

btnDelete.addEventListener("click", () => {
    cal.delete();
});

btnEqualsTo.addEventListener("click", () => {
    cal.calculate();
});

operators.forEach((button) => {
    button.addEventListener("click", () => {
        cal.addOperator(button.innerText);
    });
});