let fs = require('fs');
let arg = process.argv;
let inText;
let i = 0, n = 1;
let testString = '';

inText = fs.readFileSync(arg[2], 'utf-8');

inText = inText.toString();
testString = '';

function RLE(inText){
    while (i < inText.length){
        while (inText.charAt(i + 1) == inText.charAt(i)){
            n += 1;
            i += 1;
        }
        if (n > 3){
            testString += "#" + n + inText.charAt(i);
        }
		else{
			testString += inText.slice(i - n + 1, i + 1, 'utf-8');
        }
        i += 1;
		n = 1;
    }
    return testString;
}

let result = RLE(inText);
console.log(result);