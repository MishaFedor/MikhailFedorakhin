function boyerMooreSearch(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;
    const result = [];

    // Функция для создания таблицы плохих символов
    function buildBadCharTable(pattern) {
        const table = {};
        for (let i = 0; i < pattern.length; i++) {
            table[pattern[i]] = i + 1;
        }
        return table;
    }

    // Препроцессинг правила хорошего суффикса, когда мы его находим в шаблоне
function preprocessStrongSuffix(shift, suffixPos, pattern, m) {
    let i = m; //начнем с конца шаблона
    let j = m + 1; //указывает на начало суффикса
    suffixPos[i] = j; //массив, который будет хранить информацию о позициях

    while (i > 0) { // Идем по шаблону с конца.
        // Если суффикс в шаблоне совпадает с его частью, продолжаем двигаться.
        while (j <= m && pattern[i - 1] !== pattern[j - 1]) {
            if (shift[j] === 0) { // Если сдвиг еще не был рассчитан для позиции j.
                shift[j] = j - i; // Записываем сдвиг
            }
            j = suffixPos[j];  // Переход к следующему суффиксу
        }
        i--; // Переходим к следующей позиции в шаблоне.
        j--; // Переходим к следующему суффиксу.
        suffixPos[i] = j;  // Сохраняем позицию текущего суффикса.
    }

    // Вывод таблицы сдвигов для хорошего суффикса
    console.table(shift);  // Выводим таблицу сдвигов
}

// Препроцессинг для случая 2, когда для текущего суффикса не было найдено совпадений
function preprocessCase2(shift, suffixPos, m) {
    let j = suffixPos[0]; // Начинаем с самого длинного суффикса.
    for (let i = 0; i <= m; i++) {
        if (shift[i] === 0) {
            shift[i] = j;  // Заполняем таблицу сдвигов для слабых суффиксов.
        }

        if (i === j) {
            j = suffixPos[j];  // Если достигли конца суффикса, переходим к следующему
        }
    }
}

    const badCharTable = buildBadCharTable(pattern); // Таблица плохих символов

    const shift = new Array(patternLength + 1).fill(0);
    const suffixPos = new Array(patternLength + 1);
    preprocessStrongSuffix(shift, suffixPos, pattern, patternLength);
    preprocessCase2(shift, suffixPos, patternLength);

    console.log("Таблица плохих символов:", badCharTable);
    console.table(shift.map((value, index) => ({ Index: index, Shift: value })));

    let s = 0; // Смещение шаблона относительно текста
    while (s <= textLength - patternLength) {
        let j = patternLength - 1;

        // Сравниваем символы справа налево
        while (j >= 0 && pattern[j] === text[s + j]) {
            j--;
        }

        if (j < 0) { // Найдено совпадение
            result.push(s);
            s += shift[0];
        } else {
            // Используем таблицу плохих символов и правила хорошего суффикса
            const badCharShift = (badCharTable[text[s + j]] ?? 0);
            const goodSuffixShift = shift[j + 1];
            s += Math.max(patternLength - badCharShift - 1, goodSuffixShift);
        }
    }

    return result;
}

// Пример использования
const text = "abcabcabbccabcdabcdabc";
const pattern = "abcdabc";
const result = boyerMooreSearch(text, pattern);
console.log("Позиции совпадений:", result);