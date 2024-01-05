const digraphs = new Set(["ps","pl","pr","pz","bs","bl","br","bz","ks","kl","kr","kz","gs","gl","gr","gz","ts","tl","tr","tz","ds","dl","dr","dz"])
const states = new Set(["initial", "medium", "final", "isolated"])
const exclude = new Set([" ", ":", ".", "/", ",", ";", "\"", "\'", "\\"])

class letter {
        constructor(char, status) {
            this.char = char;
            this.status = status;
        }
        
        toString() {
            return " " + this.char + ": " + this.status;
        }
}

document.getElementById("button").onclick = function(){
    //separates the text in the textbox into an array of characters
    let char = document.getElementById("text").value.split("");
    //creates empty array for letter objects
    let chars = [];

    for(let i = 0; i < char.length; i++){
        let status = ""
        //if two adjacent characters are in the set of digraphs, the second one is appended into the first and is then removed
        if(digraphs.has(char[i] + char[i+1])){
            char[i] += char[i+1]
            char.splice(i+1,1)
        }
        //if its not in any of the excluded characters it is asigned a status
        if(!exclude.has(char[i])){
            //if the characters before and after are spaces, it is an isolate
            if((char[i+1] == " " && char[i-1] == " ") || (char[i+1] == " " && i == 0) || (char[i-1] == " " && i == char.length-1) ){
                status = "isolate"
            } else if(i == 0 || char[i-1] == " "){
                //if it is the first element in the list or the character before is a space, it is an initial
                status = "initial"
            } else if(i == char.length-1 || char[i+1] == " "){
                //if it is the last character in the list or the character after is a space, it is a final
                status = "final"
            } else {
                //else is a medium
                status = "medium"
            }
            //creates a letter object for the character and adds it to the chars[] array
            chars.push(new letter(char[i], status));
        }
        
    }

    document.getElementById("arr").innerHTML = char;
    
    document.getElementById("objArr").innerHTML =  chars;
}
