// Defining an array of quiz questions
const quizQuestions = [
  {
      question: "Which Indian city is known as the Silicon Valley of India?",
      options: ["Bangalore", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "Bangalore"
  },
  {
      question: "In which year did India gain independence from British rule?",
      options: ["1949", "1948", "1947", "1946"],
      correctAnswer: "1947"
  },
  {
      question: "What is the national currency of India?",
      options: ["Rupee", "Riyadh", "Dollar", "Pound"],
      correctAnswer: "Rupee"
  },
  {
      question: "What is the highest civilian award in India?",
      options: ["Bharat Ratna", "Padma Bhushan", "Padma Vibhushan", "Padma Shri"],
      correctAnswer: "Bharat Ratna"
  },
  {
      question: "What is the largest state in India by area?",
      options: ["Maharashtra", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh"],
      correctAnswer: "Rajasthan"
  }
];

// Variables to track quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

// Function to start the quiz
function startQuiz() {
  // Hiding the start button and display the first question
  document.getElementById("start-button").style.display = "none";
  displayQuestion();
  startTimer();
}

// Function to display a question and its options
function displayQuestion() {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");

  // Clearing previous question and answer options
  questionText.innerHTML = "";
  answerButtons.innerHTML = "";

  // Displaying the current question
  questionText.innerHTML = currentQuestion.question;

  // Creating answer buttons for each option
  currentQuestion.options.forEach(option => {
      const button = document.createElement("button");
      button.innerText = option;
      button.id = option; // Set id for each button to identify correct/wrong answers
      button.classList.add("answer-button");
      answerButtons.appendChild(button);

      // Adding click event listener to check the answer
      button.addEventListener("click", function () {
          checkAnswer(option);
      });
  });
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const answerButtons = document.querySelectorAll(".answer-button");

  // Disable all answer buttons to prevent further selection
  answerButtons.forEach(button => {
      button.disabled = true;
  });

  // Checking if the selected answer is correct
  if (selectedOption === currentQuestion.correctAnswer) {
      // If correct, style the button in green
      document.getElementById(selectedOption).classList.add("correct-answer");
      score++;
  } else {
      // If wrong, style the selected button in red and the correct one in green
      document.getElementById(selectedOption).classList.add("wrong-answer");
      document.getElementById(currentQuestion.correctAnswer).classList.add("correct-answer");
  }

  // Move to the next question or end the quiz if all questions are answered
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
      setTimeout(() => {
          resetStyles();
          displayQuestion();
      }, 1000); // Wait for 1 second before moving to the next question
  } else {
      setTimeout(() => {
          endQuiz();
      }, 1000); // Wait for 1 second before ending the quiz
  }
}

// Function to reset styles after a question
function resetStyles() {
  const answerButtons = document.querySelectorAll(".answer-button");

  // Reset all button styles and enable them for the next question
  answerButtons.forEach(button => {
      button.classList.remove("correct-answer", "wrong-answer");
      button.disabled = false;
  });
}

// Function to start the timer
function startTimer() {
  timerInterval = setInterval(function () {
      timeLeft--;

      // Updating the timer text
      document.getElementById("timer").textContent = timeLeft;

      // Ending the quiz if time runs out
      if (timeLeft <= 0) {
          endQuiz();
      }
  }, 1000);
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Calculating the score percentage
  const scorePercentage = (score / quizQuestions.length) * 100;

  // Displaying the final score
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `
      <h1>Congratulations!!!</h1>
      <h2>Quiz Completed!</h2>
      <p>Your Score: ${score} out of ${quizQuestions.length}</p>
      <p>Score Percentage: ${scorePercentage.toFixed(2)}%</p>
  `;
}

// Adding event listener to start the quiz when the start button is clicked
document.getElementById("start-button").addEventListener("click", startQuiz);
