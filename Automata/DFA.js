function automata(string, substring){
    let statistic = {'Time': 0, 'Indices': 0};
    let indices = [];
    let pointer = 0;
    let startTime = performance.now();

    let len = substring.length;
    let alph = new Array();
    
    for (let i = 0; i < len; i++){
        alph[substring.charAt(i)]=0;
    }
        
    let del = new Array(len+1);
    for (let j = 0; j <= len; j++){
        del[j]=new Array();
    }
        
    for(let i in alph){
        del[0][i]=0;
    }
        
    for(let j = 0; j < len; j++){
        let prev = del[j][substring.charAt(j)];
        del[j][substring.charAt(j)] = j + 1;
        for(let i in alph){
            del[j + 1][i] = del[prev][i];
        }
    }
    
    for(let j = 0; j <= len; j++){
        out = '';
        for(i in alph){
            out += del[j][i] + ' ';
        }          
    }
    
    let state = 0;
    for (let i = 0; i < string.length; i++){
        if (string.charAt(i) in alph){
            state = del[state][string.charAt(i)];
        }            
        else{
            state = 0;
        }            
        if (state == len){
            indices[pointer] = (i-len+1);      
            pointer++;
        }
    }

    statistic['Time'] = performance.now() - startTime;
    statistic['Indices'] = indices;
    return statistic;

}



let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];
let codeWord = argumentsFromConsole[3];

try{
    const fs = require('fs');
    let inputFirst = fs.readFileSync(inputFile, 'utf8');
    let string = inputFirst.toString();  
    let inputSecond = fs.readFileSync(codeWord, 'utf8');
    let substring = inputSecond.toString();

    console.log(automata(string, substring));    
    console.log("Выполнение закончилось.")
}
catch(error){
    console.log("ERROR");
    console.log(error.message);
}