const API_KEY = 'n8EyKaqyzclwKOGRZhUKrA==33iTgW0O8IM1Vy8F';
const API_URL = 'https://api.api-ninjas.com/v1/riddles';
const QUESTIONS_PER_REQUEST = 3;

function getRiddles() {
    const url = `${API_URL}?limit=${QUESTIONS_PER_REQUEST}`;
    fetch(url, {
        headers: {
            'X-Api-Key': API_KEY,
        }
    })
    .then(response => response.json())
    .then(data => displayRiddles(data))
    .catch(error => console.error('Error fetching riddles:', error));
}

function toggleAnswerVisibility(answerElement) {
    if (answerElement.style.display === 'none') {
        answerElement.style.display = 'block';
    } else {
        answerElement.style.display = 'none';
    }
}

function displayRiddles(riddles) {
    const riddlesContainer = document.getElementById('riddles-container');
    riddlesContainer.innerHTML = '';

    riddles.forEach(riddle => {
        const riddleBlock = document.createElement('div');
        riddleBlock.classList.add('riddle-block');

        const titleElement = document.createElement('h2');
        titleElement.textContent = riddle.title;

        const questionElement = document.createElement('p');
        questionElement.textContent = riddle.question;

        const answerElement = document.createElement('p');
        answerElement.classList.add('ans');
        answerElement.textContent = `Answer: ${riddle.answer}`;
        answerElement.style.display = 'none'; 

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'View Answer';
        toggleButton.addEventListener('click', () => toggleAnswerVisibility(answerElement));

        riddleBlock.appendChild(titleElement);
        riddleBlock.appendChild(questionElement);
        riddleBlock.appendChild(answerElement);
        riddleBlock.appendChild(toggleButton);

        riddlesContainer.appendChild(riddleBlock);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    getRiddles();

    const generateButton = document.getElementById('generate-button');
    generateButton.addEventListener('click', getRiddles);
});
