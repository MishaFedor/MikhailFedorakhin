input = 'abcd';
alph = new Object();

inLength = input.length;
for(let i = 0; i < input.length; i++){
	if (alph[input.charAt(i)])
		alph[input.charAt(i)]++
	else
		alph[input.charAt(i)] = 1;
}

alphPower = 0;

for(let i in alph){
	alphPower++;
	alph[i] /= inLength;
}

entropy = 0;
if (alphPower > 1){
	for(let i in alph)
		entropy -= alph[i] * Math.log(alph[i]);
	entropy /= Math.log(alphPower);
}

console.log(entropy)