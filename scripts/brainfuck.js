const prompt = require("prompt-sync")({ sigint: true });

brainfuck();


function brainfuck(){
    document.getElementById("output").innerHTML = "";
    //un-comment if you wanna input your text through an html element:
    let inputText = document.getElementById("bf-input").value;
    
    //un-comment if you wanna input your own text through the terminal:
    //let inputText = prompt(": ");

    //un-comment if you wanna input your text through a variable:
    //let inputText = ",[.,]";
    
    let instructions = inputText.split("");
    //console.log(instructions);
    let stack = [0];
    let currentIndex = 0;

    let inputStr = document.getElementById("text-input").value;
    let inputStrIndx = 0;


    let brackets = getBrackets(instructions);

    for(let i = 0; i < instructions.length; i++){
        switch(instructions[i]){
            case ">": //moves onto the next value
                if(currentIndex+1 == stack.length){
                    stack.push(0);
                }
                currentIndex = currentIndex + 1;
                break;
            case "<": //moves back onto the previous value
                currentIndex--;
                break;
            case "[": //starts a loop, executes instructions inbetween brackets if current value is not == 0
                if(stack[currentIndex] == 0){
                    i = brackets.get(i)
                }
                break;
            case "]": //restarts the loop, goes back to [ if current value is not == 0
                if(!stack[currentIndex] == 0){
                    i = brackets.get(i)
                }
                break;
            case ".": //outputs value as ASCII char
                let toChar = String.fromCharCode(stack[currentIndex]);
                document.getElementById("output").innerHTML += toChar; 
                console.log(toChar);
                break;
            case ",":
                stack[currentIndex] = inputStr.charCodeAt(inputStrIndx);
                inputStrIndx++;
                break;
            case "+": //increases current value by 1
                stack[currentIndex]++;
                if(stack[currentIndex] == 256){
                    stack[currentIndex] = 0;
                }
                break;
            case "-": //decreases current value by 1
                if(stack[currentIndex] == 0){
                    stack[currentIndex] = 255;
                } else {
                    stack[currentIndex]--;
                }("+"*97)
                break;
            default:
                continue;
        }
    }
}

//pre: list with bf instructions, ordered.
//post: map with each left and right bracket marked;
function getBrackets(instructions){
    let brackets = new Map();
    for(let i = 0; i < instructions.length; i++){
        if(instructions[i] == "["){
            for(let j = i; j < instructions.length; j++){
                if(instructions[j] == "]" && !Array.from(brackets.values()).includes(j)){
                    brackets.set(i,j);
                    brackets.set(j,i);
                }
            }
        }
    }

    return brackets;
}