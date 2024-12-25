let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];

try {
	let testTxt = (inputFile.slice(-4) == '.jpp');

	if (testTxt) {
		const fs = require('fs');
		const readlineSync = require('readline-sync');
		let mem = new Array();
		const prog = fs.readFileSync(inputFile, { encoding: 'utf8', flag: 'r' });
		mem = prog.split(/ |\r\n/);
		ip = 0;

		while (mem[ip] != 'exit')
			switch (mem[ip]) {

				case 'jin': // jin arg1 - аналог cin
					in_num = readlineSync.question("input a number: ");
					mem[mem[ip + 1]] = parseInt(in_num);
					ip += 2
					break

				case 'jout': // jout arg1 - аналог cout
					console.log((mem[mem[ip + 1]]));
					ip += 2;
					break;

				case 'set': // set arg1 arg2 - значение arg2 положить в arg1
					mem[mem[ip + 1]] = parseInt(mem[ip + 2]);
					ip += 3;
					break;

				case 'mov': // mov arg1 arg2 - значение arg2 скопировать в arg1
					mem[mem[ip + 1]] = mem[mem[ip + 2]];
					ip += 3;
					break;

				case 'add': // add arg1 arg2 arg3 - сложение (arg3 - адрес суммы)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
					ip += 4;
					break;

				case 'sub': // sub arg1 arg2 arg3 - умножение (arg3 - адрес произведения)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
					ip += 4;
					break;

				case 'mod': // mod arg1 arg2 arg3 - остаток (arg3 - адрес остатка)
					mem[mem[ip + 3]] = mem[mem[ip + 1]] % mem[mem[ip + 2]];
					ip += 4;
					break;

				case 'cmpj': // cmpj arg1 arg2 arg3 arg4
					if (mem[mem[ip + 1]] < mem[mem[ip + 2]]) {
						// Если значение в arg1 меньше значения в arg2, сместиться на адрес arg3
						ip = parseInt(mem[ip + 3]);
					} 
                    else {
						// Иначе прыгнуть на адрес arg4
						ip = parseInt(mem[ip + 4]);
					}
					break;
		    }
	}
}

catch (error) {
	console.log("ERROR");
	console.log(error.message);
	console.log("Пожалуйста, попробуйте ещё раз");
}