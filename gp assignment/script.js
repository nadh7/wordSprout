// story corner
let slideIndex = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.story-slide').length;

document.querySelector('.next').addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % totalSlides;  // Go to next slide, looping around
    updateSlidePosition();
});

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;  // Go to previous slide, looping around
    updateSlidePosition();
});

function updateSlidePosition() {
    // Move the slides based on the current slide index using translateX
    slides.style.transform = `translateX(-${slideIndex * 100}%)`; // Move slides left by 100% for each index
}

//WORD OF THE DAY
const wordElement = document.getElementById('word');
const definitionElement = document.getElementById('definition');

// Local words pool
const wordsPool = [
    { word: 'Curiosity', definition: 'A strong desire to know or learn something.' },
    { word: 'Adventure', definition: 'An unusual and exciting experience or activity.' },
    { word: 'Kindness', definition: 'The quality of being friendly, generous, and considerate.' },
    { word: 'Inspiration', definition: 'The process of being mentally stimulated to do something creative.' },
    { word: 'Creativity', definition: 'The use of imagination or original ideas to create something.' },
    { word: 'Ambiguous', definition: 'able to be understood in more than one way.' },
    { word: 'Nocturnal', definition: 'active at night.' },
    { word: 'Strident', definition: 'sounding harsh and unpleasant.' },
    { word: 'Eureka', definition: 'marked by usually sudden triumphant discovery.' },
    { word: 'Notorious', definition: 'widely known especially for some bad characteristic.' },
];

// Function to fetch a random word
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * wordsPool.length);
    return wordsPool[randomIndex];
}

// Function to set the Word of the Day (now random every time the page is loaded)
function setWordOfTheDay() {
    const newWord = getRandomWord();
    wordElement.textContent = newWord.word;
    definitionElement.textContent = newWord.definition;
}

// Set the Word of the Day on page load
setWordOfTheDay();

function showCategories(language) {
    const languageData = categoriesData[language];
    const categoriesSection = document.getElementById('categories-section');
    const categoriesContainer = document.getElementById('categories-container');
    const languageTitle = document.getElementById('language-title');

    // Update language title and clear previous categories
    languageTitle.textContent = languageData.title;
    categoriesContainer.innerHTML = "";

    // Generate collapsibles for each category
    for (const [category, words] of Object.entries(languageData.categories)) {
        // Create collapsible button
        const collapsible = document.createElement('button');
        collapsible.className = "collapsible";
        collapsible.textContent = category;

        // Create collapsible content
        const content = document.createElement('div');
        content.className = "collapsible-content";

        words.forEach((word) => {
            const wordItem = document.createElement('div');
            wordItem.className = "word-item";
            wordItem.textContent = word;
            content.appendChild(wordItem);
        });

        // Append collapsible and its content to the container
        categoriesContainer.appendChild(collapsible);
        categoriesContainer.appendChild(content);
    }

    // Attach click event listeners to the newly created collapsibles
    const collapsibles = categoriesContainer.querySelectorAll('.collapsible');
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener('click', () => {
            const content = collapsible.nextElementSibling; // The collapsible's corresponding content
            content.classList.toggle('show');
        });
    });

    // Show categories section
    categoriesSection.classList.remove('hidden');
}




//quiz function
function checkAnswer(button, correctAnswer) {
    // Check if the button text matches the correct answer
    if (button.textContent === correctAnswer) {
        alert("Correct!");
        button.style.backgroundColor = "lightgreen"; // Correct answer (green)
    } else {
        alert("Incorrect. Try again!");
        button.style.backgroundColor = "lightcoral"; // Incorrect answer (red)
    }
}

const answers = document.querySelectorAll('.answers .answer');

answers.forEach(answer => {
    answer.addEventListener('click', function() {
        // Get the correct answer status from the data-correct attribute
        const isCorrect = answer.getAttribute('data-correct') === 'true';

        if (isCorrect) {
            alert('Correct!');
            answer.style.backgroundColor = "lightgreen"; // Correct answer (green)
        } else {
            alert('Incorrect. Try again!');
            answer.style.backgroundColor = "lightcoral"; // Incorrect answer (red)
        }
    });
});

console.log("JavaScript loaded");


// Get the progress bar element
const progressBar = document.querySelector('.progress-bar');

// Function to simulate progress (you can replace this with actual logic)
function updateProgressBar(progress) {
    // Ensure the progress is between 0% and 100%
    if (progress >= 0 && progress <= 100) {
        progressBar.style.width = progress + '%';
    }
}

// Example: Update progress after the first question is answered
setTimeout(() => {
    updateProgressBar(25);  // 25% progress after the first question
}, 1000);

setTimeout(() => {
    updateProgressBar(50);  // 50% progress after the second question
}, 2000);

setTimeout(() => {
    updateProgressBar(75);  // 75% progress after the third question
}, 3000);

setTimeout(() => {
    updateProgressBar(100);  // 100% progress when quiz is finished
}, 4000);


// submit button
// For both quiz1.html and quiz2.html
document.querySelector('.submit-quiz')?.addEventListener('click', function () {
    let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
    const answers = document.querySelectorAll('.answer');

    answers.forEach(answer => {
        if (answer.dataset.correct === "true" && answer.classList.contains('selected')) {
            score++;
        }
    });

    localStorage.setItem('score', score);  // Save score in local storage

    // Display current score (for quiz 2 only)
    document.getElementById('score-display').textContent = `Your total score: ${score}`;
});

// Fix for answer selection (works for both quizzes)
const answerElements = document.querySelectorAll('.answer');
answerElements.forEach(answer => {
    answer.addEventListener('click', function () {
        let parent = answer.parentElement;
        parent.querySelectorAll('.answer').forEach(ans => ans.classList.remove('selected'));
        this.classList.add('selected');
    });
});