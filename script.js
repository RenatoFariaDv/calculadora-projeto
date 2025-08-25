const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons');

let currentValue = '';
let previousValue = '';
let operator = null;

buttons.addEventListener('click', (event) => {
    const clickedButton = event.target;
    
    // Evita cliques em áreas que não são botões
    if (!clickedButton.classList.contains('button')) {
        return;
    }

    const buttonValue = clickedButton.textContent;
    
    // Lógica para o botão 'C' (Clear)
    if (buttonValue === 'C') {
        currentValue = '';
        previousValue = '';
        operator = null;
        display.textContent = '0';
        return;
    }
    
    // Lógica para operadores (+, -, *, ÷)
    if (['+', '-', '×', '÷'].includes(buttonValue)) {
        if (operator && previousValue) {
            // Se já houver um operador, calcula o resultado intermediário
            calculate();
        }
        operator = buttonValue;
        previousValue = currentValue;
        currentValue = '';
        return;
    }

    // Lógica para o botão '='
    if (buttonValue === '=') {
        calculate();
        return;
    }

    // Lógica para números e ponto decimal
    if (buttonValue === '.') {
        // Adiciona o ponto apenas se ele ainda não estiver lá
        if (!currentValue.includes('.')) {
            currentValue += '.';
        }
    } else if (buttonValue === '±') {
        currentValue = (parseFloat(currentValue) * -1).toString();
    } else if (buttonValue === '%') {
        currentValue = (parseFloat(currentValue) / 100).toString();
    } else {
        // Concatena os números clicados
        currentValue += buttonValue;
    }

    // Atualiza o display da calculadora
    display.textContent = currentValue;
});

// Função para realizar o cálculo
function calculate() {
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    let result = 0;
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '×':
            result = prev * current;
            break;
        case '÷':
            if (current === 0) {
                display.textContent = 'Erro';
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operator = null;
    previousValue = '';
    display.textContent = currentValue;
}