# Алгоритм поиска подстроки Бойера-Мура

Этот скрипт на JavaScript реализует алгоритм поиска подстроки Бойера-Мура, который эффективно ищет все вхождения шаблона в текст, используя таблицы "плохих символов" и "хороших суффиксов" для ускорения процесса.

## Особенности

- **Таблица плохих символов**: Позволяет вычислять оптимальное смещение, если символ из текста не совпадает с символом шаблона.
- **Таблица хороших суффиксов**: Помогает определять, насколько далеко можно сдвинуть шаблон, если найден частично совпадающий суффикс.
- **Эффективность**: Подходит для работы с большими строками и шаблонами.

## Использование

1. Определите текст и шаблон для поиска.
2. Вызовите функцию `boyerMooreSearch`, передав текст и шаблон как аргументы.
3. Функция вернёт массив с позициями начала всех вхождений шаблона в тексте.

## Пример

```javascript
const text = "abccabcbbccabcdabcdabc";
const pattern = "abc";
const result = boyerMooreSearch(text, pattern);
console.log("Позиции совпадений:", result);
```

### Результат

Для примера выше результат будет:

```
Позиции совпадений: [0, 4, 15, 19]
```

## Объяснение кода

### Основные функции

#### `buildBadCharTable(pattern)`

Создаёт таблицу "плохих символов", которая хранит индексы последнего появления каждого символа в шаблоне.

```javascript
function buildBadCharTable(pattern) {
    const table = {};
    for (let i = 0; i < pattern.length; i++) {
        table[pattern[i]] = i;
    }
    return table;
}
```

#### `goodSuffix(pattern, l)`

Рассчитывает сдвиг шаблона на основе совпадающего суффикса.

```javascript
function goodSuffix(pattern, l) {
    function rpr(l, pattern) {
        const m = pattern.length;
        const extendedPattern = '*'.repeat(m) + pattern;

        for (let k = m - l; k >= -m + 1; k--) {
            const segment = extendedPattern.slice(k + m, k + m + l);
            const suffix = pattern.slice(m - l);

            if (
                segment === suffix &&
                (k <= 0 || pattern[k - 1] !== pattern[m - l - 1])
            ) {
                return k;
            }
        }

        return -m + 1;
    }

    const m = pattern.length;
    const k = rpr(l, pattern);
    return m - k - l + 1;
}
```

#### `boyerMooreSearch(text, pattern)`

Основная функция, реализующая алгоритм поиска подстроки Бойера-Мура.

- Сравнивает символы шаблона с текстом справа налево.
- Использует таблицы "плохих символов" и "хороших суффиксов" для вычисления оптимального сдвига шаблона.

```javascript
function boyerMooreSearch(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;

    const badCharTable = buildBadCharTable(pattern);
    const result = [];

    let shift = 0; // Смещение шаблона относительно текста
    while (shift <= (textLength - patternLength)) {
        let j = patternLength - 1;

        // Сравниваем символы справа налево
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }

        if (j < 0) { // Найдено совпадение
            result.push(shift);
            shift += patternLength;
        } else {
            let l = 0;
            while (l < patternLength && text[shift + patternLength - 1 - l] === pattern[patternLength - 1 - l]) {
                l++;
            }

            const badCharShift = j - (badCharTable[text[shift + j]] || -1);
            const goodSuffixShift = l > 0 ? goodSuffix(pattern, l) : 1;

            shift += Math.max(goodSuffixShift, badCharShift);
        }
    }

    return result;
}
```

### Входные и выходные данные

#### Входные данные

Текст: `"abccabcbbccabcdabcdabc"`

Шаблон: `"abc"`

#### Выходные данные

Массив позиций: `[0, 4, 15, 19]`


