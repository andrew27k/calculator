const output = document.querySelector('.output');
const numberButtons = document.querySelectorAll('.numbers button');
const buttons = document.querySelectorAll('button').forEach(btn => {btn.addEventListener('click', () => btn.blur())});
const operatorButtons = document.querySelectorAll('.operator button');


numberButtons.forEach(key => {
    key.addEventListener('click', (e) => {
        let displayContext = output.textContent;
        displayContext = displayContext.split(' ');

       if (e.target.id !== "del") {
            if(e.target.id == "ac"){
                output.textContent = ''
            }else {
                output.textContent += e.target.value;
            }
        } else {
            deleteNumber(displayContext);
        }
    })
})



operatorButtons.forEach(key => {
    key.addEventListener('click', (e) => {
        let displayContext = output.textContent;
        displayContext = displayContext.split(' ');

        if(e.target.value.match(/^[/ + * -]$/)){
            if(displayContext[0] == ""){
                if(e.target.value.match(/^[-]$/)){
                    output.textContent = e.target.value
                    
                }
            } else {
                if(displayContext[1] !== undefined) {
                let num1 = Number(displayContext[0]);
                let oper = displayContext[1];
                let num2 = Number(displayContext[2]);

                operate(num1, oper, num2);
                } else {
                    output.textContent += ' ' + e.target.value + ' '
                }
            }
        }else if(e.target.value.match(/^[=]$/)){
            if(displayContext[0] !== ''){
                if(displayContext[1]!== undefined){
                    let num1 = Number(displayContext[0]);
                    let oper = displayContext[1];
                    let num2 = Number(displayContext[2]);

                    operate(num1, oper, num2);
                }
            }

        }
    })
})



addEventListener('keydown', (e) => {
    let displayContext = output.textContent;
    displayContext = displayContext.split(' ');
    if(e.key.match(/^[0-9]$/)) {
        output.textContent += e.key
    }else if (e.key.match(/^[+ * / -]$/)) {

        if(displayContext[0] == ""){
            if(e.key.match(/^[-]$/)){
                output.textContent = e.key
            }
        } else {
            if(displayContext[1] !== undefined) {
            let num1 = Number(displayContext[0]);
            let oper = displayContext[1];
            let num2 = Number(displayContext[2]);

            operate(num1, oper, num2);
            } else {
                output.textContent += ' ' + e.key + ' '
            }
        }

    }else if(e.key.match(/^[.]$/)) {
        if(displayContext[0].includes('.') === false){
            output.textContent += e.key;
        }else if(displayContext[2].includes('.') === false){
            output.textContent += e.key;
        }
    }else if (e.key == "Enter") {
        if (displayContext[0] == "") {
            alert("You have to enter a number!")
        }else {
            if(displayContext[0] == displayContext) {
                output.textContent = displayContext;
                }else {
                let num1 = Number(displayContext[0]);
                let oper = displayContext[1];
                let num2 = Number(displayContext[2]);
                operate(num1, oper, num2);
            }
        }
    }else if(e.key == "Backspace") {
        deleteNumber(displayContext);
    }
})


let deleteNumber = (charArr) => {
    
    for(let i = charArr.length - 1; i >= 0; i--){
        if(charArr[i].length > 0) {
            charArr[i] = charArr[i].slice(0, -1);

            if(charArr[i] === ""){
                charArr.splice(i, 1)

                if(i>0 && ["-", "+", "*", "/"].includes(charArr[i - 1])){
                    charArr.splice(i -1);
                }
            }else if(charArr[i].trim() === ""){ 
                charArr.splice(i, 1)
            }
            
            break;
        }
    }
        return output.textContent = charArr.join(' ');
}



let operate = (number1, operator, number2) => {
    let sum;

    if(number1 == 0 && number2 == 0) {
        alert("You cant calculate with zero and zero");
        output.textContent = '';
    } else {
        switch(operator){
        case '+': sum = number1 + number2;
            break;
        case '-': sum = number1 - number2;
            break;
        case '*': sum = number1 * number2;
            break;
        case '/': sum = number1 / number2
            break;
        case '%': sum = number1 % number2;
            break;
        }
        
        sum = Math.ceil(sum *100) / 100;

        return output.textContent = sum;
    }
    
}

