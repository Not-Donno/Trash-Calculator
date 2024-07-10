document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.screenP');
    let currentInput = '';
    let expression = '';

    const buttons = document.querySelectorAll('.buttonC');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'C') {
                currentInput = '';
                expression = '';
                screen.textContent = '0';
            } else if (value === 'B') {
                expression = expression.slice(0, -1);
                screen.textContent = expression || '0';
            } else if (isNumber(value)) {
                currentInput += value;
                expression += value;
                screen.textContent = expression;
            } else if (isOperator(value)) {
                if (currentInput === '' && value !== '=') {
                    return;
                }
                if (value !== '=') {
                    expression += ` ${value} `;
                    screen.textContent = expression;
                    currentInput = '';
                } else {
                    expression = evaluateExpression(expression);
                    screen.textContent = expression;
                    currentInput = expression;
                }
            }
        });
    });

    function isNumber(value) {
        return !isNaN(value);
    }

    function isOperator(value) {
        return value === '+' || value === '-' || value === '×' || value === '÷' || value === '=';
    }

    function evaluateExpression(expression) {
        const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        try {
            const result = eval(sanitizedExpression);
            return result.toString();
        } catch {
            return 'Error';
        }
    }
});
