const readline = require('readline');

function findOccurrencesBruteForce(S, T) { // Brute Force
    let n = S.length;
    let m = T.length;
    let positions = [];

    for (let i = 0; i <= n - m; i++) {
        let match = true;
        for (let j = 0; j < m; j++) {
            if (S[i + j] !== T[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            positions.push(i + 1); // Индексация с 1
        }
    }

    return positions;
}

function findOccurrencesWithHash(S, T) {    // Хэши
    let n = S.length;
    let m = T.length;

    let targetHash = 0;
    for (let i = 0; i < m; i++) {
        targetHash += T.charCodeAt(i);  // Сумма кодов символов в строке T
    }

    let currentHash = 0;
    for (let i = 0; i < m; i++) {
        currentHash += S.charCodeAt(i);  // Сумма кодов символов для первого фрагмента
    }

    let positions = [];

    for (let i = 0; i <= n - m; i++) {
        if (currentHash === targetHash) {
            let match = true;
            for (let j = 0; j < m; j++) {
                if (S[i + j] !== T[j]) {
                    match = false;
                    break;
                }
            }

            if (match) {
                positions.push(i + 1);  // Позиция с индексом с 1
            }
        }

        if (i < n - m) {
            currentHash -= S.charCodeAt(i);
            currentHash += S.charCodeAt(i + m);
        }
    }

    return positions;
}

// Пример использования
let S1 = "abcabdecab";
let T1 = "cab";
console.log(findOccurrencesBruteForce(S1, T1));  // Вывод: [3, 8]
console.log(findOccurrencesWithHash(S1, T1));  // Вывод: [3, 8]

let S2 = "abababacaba";
let T2 = "aba";
console.log(findOccurrencesBruteForce(S2, T2));  // Вывод: [1, 3, 5, 9]
console.log(findOccurrencesWithHash(S2, T2));  // Вывод: [1, 3, 5, 9]

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
