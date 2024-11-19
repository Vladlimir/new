const correctAnswers = {
    question1: "HTML",
    question2: "Python",
    question3: "HTML",
    question4: "CSS",
    question5: "JavaScript",
    question6: "JavaScript",
    question7: "Swift",
    question8: "SQL",
    question9: "Node.js",
    question10: "JavaScript",
    question11: "C++",
    question12: "Java",
    question13: "Java",
    question14: "Kotlin",
    question15: "C#",
    question16: "Flask", // Новый вопрос
    question17: "Swift",  // Новый вопрос
    question18: "JavaScript", // Новый вопрос
    question19: "Swift", // Новый вопрос
    question20: "JavaScript" // Новый вопрос
};

// Функция для отображения результатов
function displayResults(score, userName) {
    const totalQuestions = Object.keys(correctAnswers).length; // Динамически получаем количество вопросов
    const resultMessage = `Ваш результат: ${score} из ${totalQuestions} правильных ответов, ${userName}.`;
    document.getElementById('result').innerHTML = resultMessage;
}

// Функция для сохранения результатов
function saveResults(score, answers, fullName) {
    const results = JSON.parse(localStorage.getItem('testResults')) || [];
    results.push({ score, answers, fullName }); // Сохраняем объект с результатами и ответами
    localStorage.setItem('testResults', JSON.stringify(results));
}

// Функция для отображения сохраненных результатов
function showSavedResults() {
    const results = JSON.parse(localStorage.getItem('testResults')) || [];
    const savedResultsDiv = document.getElementById('savedResults');
    savedResultsDiv.innerHTML = ''; // Очищаем предыдущие результаты

    if (results.length > 0) {
        results.forEach((result, index) => {
            const resultDiv = document.createElement('div');
            const totalQuestions = Object.keys(correctAnswers).length; // Динамически получаем количество вопросов
            resultDiv.innerHTML = `Результат ${index + 1}: ${result.score} из ${totalQuestions} правильных ответов. Ответы: ${JSON.stringify(result.answers)}. ФИО: ${result.fullName}`;
            
            // Создаем кнопку для подсветки ответов с уникальным ID
            const highlightButton = document.createElement('button');
            highlightButton.textContent = 'Подсветить ответы';
            highlightButton.id = `highlightButton${index + 1}`; // Уникальный ID для кнопки
            highlightButton.onclick = function() {
                highlightAnswers(result.answers, result.fullName); // Передаем ФИО для подсветки
            };

            resultDiv.appendChild(highlightButton);
            savedResultsDiv.appendChild(resultDiv);
        });
    } else {
        savedResultsDiv.innerHTML = 'Нет сохраненных результатов. Пожалуйста, проведите тест.';
    }
}

// Функция для отображения уведомления с использованием HTML
function showNotification(htmlContent) {
    // Проверяем, существует ли уже уведомление
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove(); // Удаляем старое уведомление
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = htmlContent; // Используем innerHTML для поддержки HTML

    // Добавляем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.marginTop = '10px'; // Отступ сверху для кнопки
    closeButton.onclick = function() {
        notification.remove(); // Удаляем уведомление при нажатии
    };

    // Добавляем уведомление на страницу
    document.body.appendChild(notification);
    notification.appendChild(closeButton); // Добавляем кнопку закрытия в уведомление

    // Обработка события закрытия уведомления
    closeButton.onclick = function() {
        notification.remove();
    };
}

// Функция для вывода итога по тесту
function highlightAnswers(answers, fullName) {
    let resultMessage = `<div class="flex-container">`;

    // Колонка для ФИО
    resultMessage += `<div class="flex-column name-column">`; // Изменяем класс
    resultMessage += `<strong>ФИО:</strong><br>${fullName.replace(/ /g, '<br>')}<br>`;
    resultMessage += `</div>`; // Закрываем колонку для ФИО

    // Первая колонка для первых 10 вопросов
    resultMessage += `<div class="flex-column">`; 
    let correctCount = 0;
    for (let i = 1; i <= 10; i++) {
        const userAnswer = answers[`question${i}`];
        const correctAnswer = correctAnswers[`question${i}`];

        resultMessage += `<div class="question-item">`;
        resultMessage += `<strong>Вопрос ${i}</strong>:<br>`;
        resultMessage += `${userAnswer !== undefined ? userAnswer : 'нет ответа'} - <br>`;
        if (userAnswer === correctAnswer) {
            resultMessage += `<span class="correct">Правильный</span>`;
            correctCount++;
        } else {
            resultMessage += `<span class="incorrect">Неправильный</span>`;
        }
        resultMessage += `</div>`;
    }
    resultMessage += `</div>`; // Закрываем первую колонку

    // Вторая колонка для вопросов 11 до 20
    resultMessage += `<div class="flex-column">`; 
    const totalQuestions = Object.keys(correctAnswers).length; 
    for (let i = 11; i <= totalQuestions; i++) { 
        const userAnswer = answers[`question${i}`];
        const correctAnswer = correctAnswers[`question${i}`];

        resultMessage += `<div class="question-item">`;
        resultMessage += `<strong>Вопрос ${i}</strong>:<br>`;
        resultMessage += `${userAnswer !== undefined ? userAnswer : 'нет ответа'} - <br>`;
        if (userAnswer === correctAnswer) {
            resultMessage += `<span class="correct">Правильный</span>`;
            correctCount++;
        } else {
            resultMessage += `<span class="incorrect">Неправильный</span>`;
        }
        resultMessage += `</div>`;
    }
    resultMessage += `</div>`; // Закрываем вторую колонку

    resultMessage += `</div>`; // Закрываем контейнер для колонок

    resultMessage += `<strong>Правильных ответов:</strong> ${correctCount} из ${totalQuestions}<br>`;

    // Добавляем сообщение о результате теста
    if (correctCount < 18) {
        resultMessage += `<span class="incorrect">Тест не сдан</span>`;
    } else {
        resultMessage += `<span class="correct">Тест сдан</span>`;
    }

    showNotification(resultMessage);
}



// Функция для очистки результатов
function clearResults() {
    localStorage.removeItem('testResults'); // Удаляем сохраненные результаты
    showSavedResults(); // Обновляем отображение результатов
}

// Обновляем функции, чтобы они учитывали новые вопросы
document.getElementById('quizForm').onsubmit = function(event) {
    event.preventDefault(); // предотвращаем отправку формы

    let score = 0; // счетчик правильных ответов
    const answers = {}; // объект для сохранения ответов

    // Получаем ФИО
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const middleName = document.getElementById('middleName').value;
    const fullName = `${lastName} ${firstName} ${middleName}`; // Формируем полное ФИО

    for (let i = 1; i <= Object.keys(correctAnswers).length; i++) { // Обновлено для учета новых вопросов
        const answer = document.querySelector(`input[name="question${i}"]:checked`);
        const options = document.querySelectorAll(`input[name="question${i}"]`);
        if (answer) {
            const selectedValue = answer.value;
            answers[`question${i}`] = selectedValue; // сохраняем выбранный ответ
            
            // Подсвечиваем правильный и неправильный варианты
            options.forEach(option => {
                const li = option.parentElement;
                if (option.value === correctAnswers[`question${i}`]) {
                    li.classList.add('correct'); // правильный ответ
                } else if (option === answer) {
                    li.classList.add('incorrect'); // выбранный неправильный ответ
                    li.classList.add('selected'); // помечаем выбранный вариант
                }
            });

            if (selectedValue === correctAnswers[`question${i}`]) {
                score++; // увеличиваем счетчик за правильный ответ
            }
        }
    }

    // Выводим результаты
    displayResults(score, fullName);
    saveResults(score, answers, fullName); // сохраняем результаты и ответы
    showSavedResults(); // отображаем сохраненные результаты сразу после отправки
};
document.getElementById('showResults').onclick = function() {
    showSavedResults(); // отображаем сохраненные результаты при нажатии на кнопку
};

document.getElementById('clearResults').onclick = function() {
    clearResults(); // очищаем результаты при нажатии на кнопку
};

