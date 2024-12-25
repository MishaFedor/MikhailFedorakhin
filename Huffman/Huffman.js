let argumentsFromConsole = process.argv;
let typeOfOperation = argumentsFromConsole[2];
let inputFile = argumentsFromConsole[3];
let tableFile = argumentsFromConsole[4];
let outputFile = argumentsFromConsole[5];

try{
    let testTxt = (inputFile.slice(-4) == '.txt');
    const fileSystem = require('fs');
    let input = fileSystem.readFileSync(inputFile, 'utf8');

    if (testTxt && typeOfOperation == 'code'){ //code
        alph = new Object();
        tree = new Array();
        
        function Node(name, freq, used, link, code){
            this.name = name;
            this.freq = freq;
            this.used = used;
            this.link = link;
            this.code = code;
        }

        for (let i = 0; i < input.length; i++){
            if (alph[input.charAt(i)])
                alph[input.charAt(i)] ++;
            else
                alph[input.charAt(i)] = 1;
        }

        alphPower = 0;
        for (let i in alph){
            alphPower++;
            newNode = new Node(i,alph[i],false,undefined,'');
            tree.push(newNode);
        }

        for (let i = 1; i < alphPower; i++){
            el1 = {ind: 0, val: Number.MAX_VALUE};
            el2 = {ind: 0, val: Number.MAX_VALUE};
            for (k = 0; k < tree.length; k++){
                if ((!tree[k].used) & (tree[k].freq < el1.val)){
                    el1.ind=k;
                    el1.val=tree[k].freq;
                }
                else if ((!tree[k].used) & (tree[k].freq <= el2.val)){
                    el2.ind=k;
                    el2.val=tree[k].freq;
                }
            }
            newNode = new Node(tree[el1.ind].name + tree[el2.ind].name, tree[el1.ind].freq + tree[el2.ind].freq, false, undefined, '');
            tree.push(newNode);
            tree[el1.ind].used = true;
            tree[el1.ind].link = k;
            tree[el1.ind].code = '0';
            tree[el2.ind].used = true;
            tree[el2.ind].link = k;
            tree[el2.ind].code = '1';
        }

        function Code(name, code){
            this.name = name;
            this.code = code;
        }

        function makeCode(name, tree){
            let code='';
            let parentLink='';
            let childLink='';
            for(let i = 0; i < tree.length; i++){
                if (tree[i].name == name){
                    childLink=tree[i].link;
                    code += tree[i].code;
                    while (childLink != undefined){
                        parentLink=childLink;
                        childLink=tree[parentLink].link
                        if (childLink != undefined){
                            code = tree[parentLink].code + code;
                        }
                    }
                    return code;
                }
            }
        }

        huffmanTable = new Array();
        for (let i = 0; i < alphPower; i++){
            newCode = new Code(tree[i].name, makeCode(tree[i].name,tree));
            huffmanTable.push(newCode);
        }

        let result='';
        for (let i = 0; i < input.length; i++){
            let letter = input[i];
            let numOfLetter=-1;
            let k=0;
            while (numOfLetter == -1){
                if (huffmanTable[k].name==letter){
                    numOfLetter=k;
                }
                k++;
            }

            result+=huffmanTable[numOfLetter].code;
        }

        //console.log(huffmanTable);
        
        let res = "";
        for (let i = 0; i < alphPower; i++){
            let temp1 = huffmanTable[i].name;
            let temp2 = huffmanTable[i].code;
            res += (temp1+" "+temp2+'\n');
        }

        fileSystem.writeFileSync(outputFile, result);
        fileSystem.writeFileSync(tableFile, res);

        console.log("Кодирование завершено");

    }

    
    else if(testTxt && typeOfOperation == 'decode'){ //decode
        function letter(name,code){
            this.name = name;
            this.code = code;
        }

        let table = fileSystem.readFileSync(tableFile, 'utf8');
        let i = 0;
        tab = new Array();
        let alphPower = 0;
        while(i<table.length){
            let temp = table[i];
            alphPower++;
            i+=2;
            let str = "";
            while(table[i]!='\n'){
                str+=table[i];
                i++;
            }
            newLetter = new letter(temp,str);
            tab.push(newLetter);
            i++;
        }
        //console.log(tab);

        let tempText = '';
        let finalText = '';
        for (let k = 0; k < input.length; k++){
            tempText+=input[k];
            for (let j = 0; j < alphPower; j++){
                if (tab[j].code == tempText){
                    finalText += tab[j].name;
                    tempText = '';
                    break;
                }
            }
        }
        
        fileSystem.writeFileSync(outputFile, finalText);

        console.log("Декодирование завершено");

    }

}
catch(error){
    console.log("ERROR");
    console.log(error.message);
	console.log("Пожалуйста, попробуйте ещё раз");
}