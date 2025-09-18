const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        answer: "Pacific"
    },
    {
        question: "Which country is known as the “Land of the Rising Sun”?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        answer: "Japan"
    }
];

let score = 0;
let userName = "";
let timeLeft = 60; // total seconds for quiz
let timer; // store interval

function startQuiz() {
    const nameInput = document.getElementById("username").value.trim();
    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }
    userName = nameInput;
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showAllQuestions();
    startTimer();
}

// সব প্রশ্ন একসাথে দেখানোর ফাংশন
function showAllQuestions() {
    const quizContainer = document.getElementById("options");
    quizContainer.innerHTML = "";

    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question-block");
        questionDiv.innerHTML = `<h3>Q${index + 1}. ${q.question}</h3>`;

        q.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => checkAnswer(option, q.answer, btn);
            questionDiv.appendChild(btn);
        });

        quizContainer.appendChild(questionDiv);
    });
}

// উত্তর চেক করার ফাংশন
function checkAnswer(selectedOption, correctAnswer, btn) {
    if (selectedOption === correctAnswer) {
        btn.style.backgroundColor = "green";  
        score++;
    } else {
        btn.style.backgroundColor = "red";    
    }

    // এই প্রশ্নের সব বাটন disable করা
    const parentDiv = btn.parentElement;
    parentDiv.querySelectorAll("button").forEach(b => b.disabled = true);
}

function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("score").textContent = "Your score: " + score + "/" + questions.length;
    saveResult();
}

function startTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = "Time Left: " + timeLeft + "s";

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = "Time Left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("⏰ Time Over! Auto submitting your quiz.");
            endQuiz();
        }
    }, 1000);
}

function saveResult() {
    const record = { name: userName, score };
    let records = JSON.parse(localStorage.getItem("quizRecords")) || [];
    records.push(record);
    localStorage.setItem("quizRecords", JSON.stringify(records));
    showRecords();
}

function showRecords() {
    let records = JSON.parse(localStorage.getItem("quizRecords")) || [];
    const list = document.getElementById("records-list");
    list.innerHTML = "";
    records.forEach(r => {
        const li = document.createElement("li");
        li.textContent = r.name + " - " + r.score;
        list.appendChild(li);
    });
}

showRecords();

function clearRecords() {
    localStorage.removeItem("quizRecords");
    const list = document.getElementById("records-list");
    list.innerHTML = "";
}
