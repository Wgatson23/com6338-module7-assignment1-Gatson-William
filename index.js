var questionsArr = [
	{
		question: "What is the capital city of Australia",
		answer: "Canberra",
		options: ["Sydney ", "Melbourne", "Canberra", "Brisbane"],
	},
	{
		question: 'Who wrote the famous novel "Pride and Prejudice"? ',
		answer: "Jane Austen",
		options: [
			"Charles Dickens",
			"Jane Austen",
			"Mark Twain",
			"William Shakespeare",
		],
	},
	{
		question: "What is the chemical symbol for gold?",
		answer: "Au",
		options: ["Ag", "Au", "Cu", "Pt"],
	},
	{
		question: "In which year did the Titanic sink?",
		answer: "1912",
		options: ["1910", "1912", "1914", "1916"],
	},
	{
		question: 'Who painted the famous artwork "The Starry Night"?',
		answer: "Vincent van Gogh",
		options: [
			"Pablo Picasso",
			"Vincent van Gogh",
			"Leonardo da Vinci",
			"Claude Monet",
		],
	},
];

var quizContainer = document.getElementById("quiz");
var score = 0;
var currentQuestion = 0;
var timeRemaining;
var timerId;

quizContainer.onclick = function (e) {
	if (e.target.id === "start-quiz") {
		drawQuestion();
	} else if (
		e.target.parentElement.id === "choices" &&
		e.target.tagName === "BUTTON"
	) {
		if (e.target.textContent === questionsArr[currentQuestion].answer) {
			score++;
		}
		clearInterval(timerId);
		currentQuestion++;

		if (currentQuestion < questionsArr.length) {
			drawQuestion();
		} else {
			endGame();
		}
	}
};

function drawGameStart() {
	score = 0;
	currentQuestion = 0;
	quizContainer.innerHTML = "";
	var previousScore = localStorage.getItem("previous-score");

	if (previousScore) {
		var previousScoreEl = document.createElement("p");
		previousScoreEl.textContent = "Previous Score: " + previousScore;
		quizContainer.appendChild(previousScoreEl);
	}

	var startBtn = document.createElement("button");
	startBtn.id = "start-quiz";
	startBtn.textContent = "Start Quiz!";
	quizContainer.appendChild(startBtn);
}
function drawQuestion() {
	var questionObj = questionsArr[currentQuestion];
	quizContainer.innerHTML = "";

	var questionTextEl = document.createElement("p");
	questionTextEl.textContent = questionObj.question;
	quizContainer.appendChild(questionTextEl);

	var choicesContainer = document.createElement("div");
	choicesContainer.id = "choices";
	quizContainer.appendChild(choicesContainer);

	questionObj.options.forEach(function (choice) {
		var btn = document.createElement("button");
		btn.textContent = choice;
		choicesContainer.appendChild(btn);
	});

	timeRemaining = 30;
	var timerEl = document.createElement("p");
	timerEl.id = "timer";
	timerEl.textContent = timeRemaining;
	quizContainer.appendChild(timerEl);

	startTimer();
}

function startTimer() {
	var timerEl = document.getElementById("timer");

	timerId = setInterval(function () {
		timeRemaining--;
		if (timeRemaining >= 0) {
			timerEl.textContent = timeRemaining;
		} else {
			clearInterval(timerId);

			currentQuestion++;

			if (currentQuestion < questionsArr.length) {
				drawQuestion();
			} else {
				endGame();
			}
		}
	}, 1000);
}

function endGame() {
	quizContainer.innerHTML = "";

	var percentage = Math.round((score / questionsArr.length) * 100) + "%";
	localStorage.setItem("previous-score", percentage);
	drawGameStart();
}

drawGameStart();
