let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];
let testNotNan = inputFile;

if (testNotNan){
    let testTxt = (inputFile.slice(-4) == '.txt');

    if (testTxt){
        const fileSystem = require('fs');
        let input = fileSystem.readFileSync(inputFile, 'utf8');
        let alph = new Object(); 
        let alphPower = 0;
        let entropy = 0;
        let inputLength = input.length;

        for (let i = 0; i < inputLength; i++){
            if (alph[input.charAt(i)])
                alph[input.charAt(i)] ++;
            else
                alph[input.charAt(i)] = 1;
        }

        for (let i in alph){
            alphPower++;
            alph[i] /= inputLength;  
        }

        if (alphPower>1){
            for (let i in alph)
                entropy -= alph[i] * Math.log(alph[i]);
            entropy /= Math.log(alphPower);
        }

        console.log("Энтропия данного текста =", entropy);
        console.log("\nАлфавит с частотами");
        console.log(alph);
    }

    else{
        console.log("ERROR");
    }
    
}
else{
    console.log("ERROR");
}
