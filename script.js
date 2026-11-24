const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Preprocessor",
      "Hyper Text Markup Language",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
    answer: 1,
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Syle Sheets",
    ],
    answer: 2,
  },
  {
    question: "Which language makes web pages interactive?",
    options: ["HTML", "JavaScript", "CSS", "SQL"],
    answer: 1,
  },
  {
    question: "Which keyword declars a variable that cannot be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: 2,
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Method",
      "Digital Orientation Mode",
      "Display Object Management",
    ],
    answer: 0,
  },
  {
    question: "What is the full of PHP?",
    options: [
      "Preprocessor Hypertext",
      "Profile Hyper Processor",
      "Previous Higher Pitch",
      "Parent Higher Priority",
    ],
    answer: 0,
  }
];

const TIME_LIMIT = 15;

// Grab HTML elements
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result-box");
const optionsList = document.getElementById("options");
const questionText = document.getElementById("question-text");
const timerCount = document.getElementById("timer-count");
const timeLine = document.getElementById("time-line");
const currentNumber = document.getElementById("current-number");
const totalNumber = document.getElementById("total-number");
const nextBtn = document.getElementById("next-btn");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

// 3. Render state

let currentIndex = 0;
let score = 0;
let timeLeft = TIME_LIMIT;

let timerId = null;
let answered = false;

// 4. Function

function startQuiz() {
  currentIndex = 0;
  score = 0;
  resultBox.classList.add("hidden"); // classList is with the help of add/remove CSS classes on an element
  quizBox.classList.remove("hidden");

  totalNumber.textContent = questions.length;
  showQuestion()
}

function showQuestion() {
  answered = false;
  const current = questions[currentIndex]; //the currnet in order to avoid writing the questions[currentIndex]again and again to pick a question
  questionText.textContent = `${currentIndex + 1}. ${current.question}`;
  
  currentNumber.textContent = currentIndex + 1;
  optionsList.innerHTML = "";
  optionsList.classList.remove("disabled");
  nextBtn.classList.remove("show");

  nextBtn.textContent = currentIndex === questions.length -1 ? "Finish" : "Next Que";

  current.options.forEach((optionText, index) => {
    const li = document.createElement("li");
    li.classList.add("option"); // gives a class to the created HTML element.
    li.textContent = optionText;
    li.addEventListener("click", () => selectOption(li, index));
    optionsList.appendChild(li);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = TIME_LIMIT;
  updateTimerDisplay();
  timerId =setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeUp();
    }
  }, 1000);
}

function updateTimerDisplay() {
  timerCount.textContent = String(timeLeft).padStart(2, "0");
  timeLine.style.width = `${(timeLeft / TIME_LIMIT) * 100}%`;
}

function selectOption(selectedLi, selectedIndex) {
  if (answered) return;

  answered = true;
  clearInterval(timerId);
  const correctIndex = questions[currentIndex].answer;

  if (selectedIndex === correctIndex) {
    score++;
    markOption(selectedLi, "correct");
  }else {
    markOption(selectedLi, "incorrect");
    markOption(optionsList.children[correctIndex], "correct");
  }

  finishQuestion();
}

function handleTimeUp() {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentIndex].answer;
  markOption(optionsList.children[correctIndex], "correct");
  
  finishQuestion();
}

function markOption(li, status) {
  li.classList.add(status);
  const icon = document.createElement("span");
  icon.classList.add("icon");
  icon.textContent = status === "correct" ? "✓" : "✕";
  li.appendChild(icon);
}

function finishQuestion() {
  optionsList.classList.add("disabled");
  nextBtn.classList.add("show");
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  resultText.textContent = `You scored ${score} out of ${questions.length}.`;
}

// 5. Events reacting to the user
nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", startQuiz);

startQuiz();
