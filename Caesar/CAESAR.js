let argumentsFromConsole = process.argv;
let typeOfOperation = argumentsFromConsole[2];
let inputFile = argumentsFromConsole[3];

try{
    const fileSystem = require('fs');
    let inputData = fileSystem.readFileSync(inputFile, 'utf8').toString();

    if (typeOfOperation == 'code'){ //кодирование
        let FF_ENG = new Object();
        let len = 26;

        let alph = new Object();
        let engAlph = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        for (let element of engAlph) {
            alph[element] = 1;
        }
    
        let shift = parseInt(argumentsFromConsole[5]);
    
        let i = 0;
        for(let symbol in alph){
            let index = (i+shift)%len;
            FF_ENG[symbol] = engAlph[index];
            i++;
        }

        function isLetter(char){
            return /^[a-zA-Z]$/.test(char);
        }
        function isCapital(char){
            return /^[A-Z]$/.test(char);
        }

        let code = '';
        for (let i = 0; i < inputData.length; i++){
            if(isLetter(inputData[i])){
                if (isCapital(inputData[i])){
                    code += FF_ENG[inputData[i].toLowerCase()].toUpperCase();
                }
                else{
                    code += FF_ENG[inputData[i].toLowerCase()];
                }
            }
            else{
                code += inputData[i];
            }
        }

        console.log(FF_ENG);
        let outputFile = argumentsFromConsole[4];
        fileSystem.writeFileSync(outputFile, code);
        console.log('Выполнение завершено.')
    }

    else if (typeOfOperation == 'hack'){ //взлом
        let freq_ENG = [0.0804, 0.0154, 0.0306, 0.0399, 0.1251, 0.0230, 0.0196, 0.0549, 0.0726, 0.0016, 0.0067, 0.0414, 0.0253, 0.0709, 0.0760, 0.0200, 0.0011, 0.0612, 0.0654, 0.0925, 0.0271, 0.0099, 0.0192, 0.0019, 0.0173, 0.0009];
        let bing = new Array();
        let len = 26;
        for(let j = 0; j < len; j++){
            bing[j]=0;
        }
        
        let alph = new Object();
        let engAlph = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
        for (let element of engAlph) {
            alph[element] = 1;
        }

        let totalLenght = 0;
        for(let element in inputData){
            let symbol = inputData[element].toLowerCase();
            if(alph[symbol]){
                alph[symbol]++;
                totalLenght++;
            }
        }
        for(let element of engAlph){
            alph[element]--;
            alph[element]/=totalLenght;
        }

        let shift = 0;
        let min = 10000000;

        for(let k = 0; k < len; k++){
            for(let i = 0; i < len; i++){
                bing[k] += ((freq_ENG[i] - alph[engAlph[(i + k)%len]])*(freq_ENG[i] - alph[engAlph[(i + k)%len]]));
            }
            if (bing[k] < min){
                min = bing[k];
                shift = k;
            }
        }
    
        console.log(shift);
    }
    
}
catch(error){
    console.log("Возникла ошибка:");
    console.log(error.message);
}