function charComparison(string, substring, statistic){      
    for (let i = 0; i < string.length; i++){    
        statistic.SymCompareCount ++;
        if (string[i] === substring[i]){
            continue;
        }
        else{
            return false;
        }
    }
    return true;
}

function bruteForce(string, substring){
    let statistic = {'Time': 0, 'Indices': 0, 'Matching': 0, 'Collisions': 0, 'SymCompareCount': 0};   //объект
    let indices = [];              
    let matching = 0;                   
    let pointer = 0;                    
    let i = 0;                        
    let startTime = performance.now();

    while (i + substring.length <= string.length){          
        if (charComparison(string.slice(i, i+substring.length), substring, statistic)){
            indices[pointer] = i;
            pointer++;
            matching++;
        }
        i++;
    }

    statistic['Time'] = performance.now() - startTime; 
    statistic['Indices'] = indices;          
    statistic['Matching'] = matching; 
    return statistic;                             
}

function hash(string, substring){        
    let statistic = {'Time': 0, 'Indices': 0, 'Matching': 0, 'Collisions': 0, 'SymCompareCount': 0};
    let indices = [];
    let matching = 0;
    let pointer = 0;
    let collisions = 0;
    let hashSum = 0;
    let startTime = performance.now();
    
    for (let i = 0; i < substring.length; i++){     
        hashSum += substring.charCodeAt(i);
    }
    
    let currentHash = 0;            
    let l = 0;
    let r = 0;
    for (r; r < substring.length; r++){
        currentHash += string.charCodeAt(r);
    }

    while (r <= string.length){
        if (currentHash === hashSum){
            if (charComparison(string.slice(l,r), substring, statistic)){
                indices[pointer] = l;
                pointer++;
                matching++;
            }
            else{     
                collisions++;
            }
            
        }

        currentHash = currentHash - string.charCodeAt(l) + string.charCodeAt(r);
        r++;
        l++;
    }
    
    statistic['Time'] = performance.now() - startTime;
    statistic['Indices'] = indices;
    statistic['Matching'] = matching;
    statistic['Collisions'] = collisions;
    return statistic;
}

function RabKarp(string,substring){
    let statistic = {'Time': 0, 'Indices': 0, 'Matching': 0, 'Collisions': 0, 'SymCompareCount': 0};
    let indices = [];
    let matching = 0;
    let pointer = 0;
    let collisions = 0;
    let hashSum = 0;
    let startTime = performance.now();

    for (let i = 0; i < substring.length; i++){             
        hashSum = 2 * (hashSum + substring.charCodeAt(i));  
    }

    let currentHash = 0;
    let l = 0;
    let r = 0;
    for (r; r < substring.length; r++){
        currentHash = 2 * (currentHash + string.charCodeAt(r));    
    } 

    while (r <= string.length){
        if (currentHash === hashSum){         
            if (charComparison(string.slice(l,r),substring, statistic)){
                indices[pointer] = l;      
                pointer++;                     
                matching++;                         
            }
            else{
                collisions++;
            }
            
        }

        let powerTwo = 2;
        for (let i = 1; i < substring.length; i++){
            powerTwo = (powerTwo*2);                
        }

        currentHash = (2 * (currentHash - (string.charCodeAt(l) * powerTwo)) + 2 * string.charCodeAt(r));
        r++;
        l++;
    }

    statistic['Time'] = performance.now() - startTime;
    statistic['Indices'] = indices;
    statistic['Matching'] = matching;
    statistic['Collisions'] = collisions;
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

    console.log("\nBrute Force\n");
    console.log(bruteForce(string, substring));         
    console.log("\nХэши\n");
    console.log(hash(string, substring));
    console.log("\nРабин-Карп\n");
    console.log(RabKarp(string,substring));
    console.log('')
}
catch(error){
    console.log("ERROR")
    console.log(error.message);
}