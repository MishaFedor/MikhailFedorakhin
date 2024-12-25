let argumentsFromConsole = process.argv;
let typeOfOperation = argumentsFromConsole[2];
let inputFile = argumentsFromConsole[3];
let outputFile = argumentsFromConsole[4];
let testNotNan = inputFile && typeOfOperation && outputFile;

if (testNotNan){
    let testTxt = (inputFile.slice(-4) == '.txt' && outputFile.slice(-4) == '.txt');
    let testOperation = (typeOfOperation == 'code' || typeOfOperation == 'decode');

    if (testTxt && testOperation){

        const fileSystem = require('fs');
        let inputData = fileSystem.readFileSync(inputFile, 'utf8');
        let code = '';



        if (typeOfOperation == 'code'){  // code
            inputData += ' ';
            let count = 1;

            for (let i = 0; i < inputData.length - 1; i++){

                if (inputData[i] == inputData[i+1]){
                    count++;
                }

                else{

                    if (count>3 && inputData[i] != '#'){

                        if (count < 256){
                            code += '#' + String.fromCharCode(count) + inputData[i];
                        }

                        else{
                            code += `#ÿ${inputData[i]}`.repeat(count / 255) + ('#' + String.fromCharCode(count%255) + inputData[i]);
                        }
        
                    }

                    else if (inputData[i] == '#'){

                        if (count < 256){
                            code += '#' + String.fromCharCode(count) + inputData[i];
                        }

                        else{
                            code += `#ÿ${inputData[i]}`.repeat(count / 255) + ('#' + String.fromCharCode(count%255) + inputData[i]);
                        }

                    }
                    
                    else{
                        code += inputData[i].repeat(count);
                    }

                    count = 1;
                }
            }

            fileSystem.writeFileSync(outputFile, code);
            let compression = (inputData.length-1)/code.length;
            console.log("Коэффицент сжатия =",compression);


        }



        else{                // decode
            let i = 0;

            while (i < inputData.length - 2){

                if (inputData[i] == '#'){
                    let charCode = inputData.charCodeAt(i+1);
                    code += inputData[i+2].repeat(charCode);
                    i+=3;
                }

                else{
                    code += inputData[i];
                    i++;
                }

            }

            while (i < inputData.length){
                code += inputData[i];
                i++;
            }

            fileSystem.writeFileSync(outputFile, code);
        }

    }

    else{
        console.log('Неправильно поданы данные, повторите ещё раз.');
        console.log('Сначала надо ввести вид операции (code или decode), после этого надо ввести имена двух файлов c расширением txt.');
        console.log('Первый файл - это файл из которого считываются данные, второй - в который записываются.')
    }
}

else{
    console.log('Неправильно поданы данные, повторите ещё раз.');
    console.log('Сначала надо ввести вид операции (code или decode), после этого надо ввести имена двух файлов c расширением txt.');
    console.log('Первый файл - это файл из которого считываются данные, второй - в который записываются.')
}