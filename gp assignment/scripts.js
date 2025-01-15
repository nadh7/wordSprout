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
