const readline = require('readline');

// Создаем интерфейс для ввода/вывода
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Проверка корректности входного выражения
function validateExpression(expression) {
    const validCharacters = /^[\d+\-*/^().\s]+$/;
    if (!validCharacters.test(expression)) {
        throw new Error('Выражение содержит недопустимые символы.');
    }

    let balance = 0; // Баланс скобок
    const tokens = expression.match(/\d+(\.\d+)?|[+\-*/^()]|\s+/g);

    for (const token of tokens) {
        if (token.trim() === '') continue; // Игнорируем пробелы
        if (token === '(') balance++;
        if (token === ')') balance--;
        if (balance < 0) throw new Error('Несбалансированные скобки.');
    }

    if (balance !== 0) throw new Error('Несбалансированные скобки.');
}

// Преобразование инфиксной записи в постфиксную
function infixToPostfix(expression) {
    const precedence = { // Приоритеты операторов
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
        '^': 3
    };

    const isRightAssociative = { '^': true }; // Операторы с правой ассоциативностью

    // Удаляем лишние пробелы
    expression = expression.replace(/\s+/g, '');

    // Обработка унарного минуса
    expression = expression.replace(/(^|[(])-/g, '$10-');

    const stack = [];
    const postfix = [];
    const tokens = expression.match(/\d+(\.\d+)?|[+\-*/^()]|[^\s]/g); // Числа, операторы и скобки

    for (const token of tokens) {
        if (!isNaN(token)) { // Если токен число
            postfix.push(token);
        } else if (token === '(') { // Если открывающая скобка
            stack.push(token);
        } else if (token === ')') { // Если закрывающая скобка
            while (stack.length && stack[stack.length - 1] !== '(') {
                postfix.push(stack.pop());
            }
            stack.pop(); // Удаляем '(' из стека
        } else { // Если токен оператор
            while (
                stack.length &&
                precedence[stack[stack.length - 1]] !== undefined &&
                (
                    (isRightAssociative[token] && precedence[token] < precedence[stack[stack.length - 1]]) ||
                    (!isRightAssociative[token] && precedence[token] <= precedence[stack[stack.length - 1]])
                )
            ) {
                postfix.push(stack.pop());
            }
            stack.push(token);
        }
    }

    // Выталкиваем оставшиеся операторы из стека
    while (stack.length) {
        postfix.push(stack.pop());
    }

    return postfix.join(' ');
}

// Вычисление результата постфиксной записи
function evaluatePostfix(postfixExpression) {
    const stack = [];
    const tokens = postfixExpression.split(' ');

    for (const token of tokens) {
        if (!isNaN(token)) { // Если токен число
            stack.push(Number(token));
        } else { // Если токен оператор
            const b = stack.pop();
            const a = stack.pop();

            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
                case '^':
                    stack.push(Math.pow(a, b));
                    break;
                default:
                    throw new Error(`Неизвестный оператор: ${token}`);
            }
        }
    }

    return stack[0];
}

// Основная логика
rl.question('Введите инфиксное выражение: ', (infixExpression) => {
    try {
        validateExpression(infixExpression);
        const postfixExpression = infixToPostfix(infixExpression);
        console.log('Постфиксная запись:', postfixExpression);

        const result = evaluatePostfix(postfixExpression);
        console.log('Результат вычисления:', result);
    } catch (error) {
        console.error('Ошибка:', error.message);
    } finally {
        rl.close();
    }
});
