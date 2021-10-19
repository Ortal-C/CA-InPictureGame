//---------------------------------------------- D A T A ----------------------------------------------//
var gFlags = [
	{ id: 1, name: 'Australia' },
	{ id: 2, name: 'Brazil' },
	{ id: 3, name: 'Canada' },
	{ id: 4, name: 'Chile' },
	{ id: 5, name: 'China' },
	{ id: 6, name: 'Colombia' },
	{ id: 7, name: 'Egypt' },
	{ id: 8, name: 'Israel' },
	{ id: 9, name: 'Italy' },
	{ id: 10, name: 'Lebanon' },
	{ id: 11, name: 'Panama' },
	{ id: 12, name: 'Qatar' },
	{ id: 13, name: 'Russia' },
	{ id: 14, name: 'South Africa' },
	{ id: 15, name: 'Sri Lanka' },
	{ id: 16, name: 'Uruguay' },
	{ id: 17, name: 'Vietnam' },
	{ id: 18, name: 'Finland' },
	{ id: 19, name: 'Greece' },
	{ id: 20, name: 'Jamaica' },
	{ id: 21, name: 'Netherlands' },
	{ id: 22, name: 'Peru' },
	{ id: 23, name: 'Singapore' },
	{ id: 24, name: 'Spain' },
	{ id: 25, name: 'Yemen' },
	{ id: 26, name: 'Uzbekistan' },
	{ id: 27, name: 'Thailand' },
	{ id: 28, name: 'South Korea' },
	{ id: 29, name: 'Georgia' },
	{ id: 30, name: 'India' },
	{ id: 31, name: 'Hungary' },
	{ id: 32, name: 'United Kingdom' },
	{ id: 33, name: 'United States' },
	{ id: 34, name: 'Sweden' },
	{ id: 35, name: 'Switzerland' },
];

//--------------------------------------------- M O D E L ---------------------------------------------//
var gIsGameOn = false;
var gCorrectAnswersCounter;
var gQuests = [];
const NUM_OF_FLAGS = gFlags.length;
const TIME_BETWEEN_QUESTIONS = 1000;

//----------------------------------------------------------------------------------------------------//

function init() {
	console.log('. . . Initialize . . .');
	if (gIsGameOn) {
		clearGameArea();
		shuffle(gFlags);
		createQuests();
		gCorrectAnswersCounter = 0;
		document.querySelector('.score span').innerHTML = '';
		document.querySelector('.game-area').style.display = 'block';
	}
}

function createQuests() {
	for (var i = 0; i < NUM_OF_FLAGS; i++) {
		gQuests.push(createQuest());
	}
}

function createQuest() {
	var correctAns = gFlags.pop();
	var wrongAns1 = gFlags.pop();
	var wrongAns2 = gFlags.pop();
	var opts = [correctAns, wrongAns1, wrongAns2];
	shuffle(opts);
	gFlags.unshift(wrongAns2, wrongAns1, correctAns);
	return {
		options: opts,
		correctAns: correctAns,
	};
}

function printQuestion() {
	var questionPos = getRandomInt(0, NUM_OF_FLAGS - 1);
	var theQuestion = gQuests[questionPos];
	var strHTML = `<div class="question-area">\n<img class="question-img"src="/img/flags/${theQuestion.correctAns.id}.jpg" />\n</div>\n <div class="answers-area">`;
	for (var i = 0; i < theQuestion.options.length; i++) {
		strHTML += `<button class="btn option" data-option="${i+1}" onclick="handleClickedAnswer(this, ${questionPos})">
        ${theQuestion.options[i].name}</button>\n`;
	}
	document.querySelector('.game-area').innerHTML += strHTML;
}

//---------------------------------------------- G A M E ----------------------------------------------//

function toggleGameState() {
	gIsGameOn = !gIsGameOn;
	document.querySelector('.play').innerText = gIsGameOn ? 'Stop Game ⬜' : 'Start Game ▶';
	if (gIsGameOn) {
		init();
		printQuestion();
	}
	else gameOver();
}

function gameOver() {
	console.log('*** GAME OVER ***');
	gIsGameOn = false;
	var imgUrl =
		gCorrectAnswersCounter > 0
			? `nonZeroCorrectAnswers.gif`
			: `zeroCorrectAnswers.gif`;
	document.querySelector('.game-area').innerHTML = `<img src="img/${imgUrl}" width="250px" />
	<h1>You answered correctly ${gCorrectAnswersCounter} times!</h1>`;
	document.querySelector('.play').innerText = 'Play Again 🔁';
}

function clearGameArea() {
	document.querySelector('.game-area').innerHTML = '';
}

function handleClickedAnswer(elOption, questionPos) {
	gIsGameOn = elOption.innerText === gQuests[questionPos].correctAns.name;
	gIsGameOn ? handleCorrectAns(elOption) : handleWrongAns(elOption);
    document.querySelector('.answers-area').style.pointerEvents = 'none';
}

function handleCorrectAns(elOption) {
	console.log(`user answerd correct with answer: ${elOption.innerText}`);
	elOption.style['background-color'] = 'Green';
	document.querySelector('.score span').innerText = ++gCorrectAnswersCounter;
	playSound('sound/correct.wav');
	setTimeout(() => {
		clearGameArea();
		printQuestion();
	}, TIME_BETWEEN_QUESTIONS);
}

function handleWrongAns(elOption) {
	console.log(`user answerd wrong with answer: ${elOption.innerText}`);
	elOption.style['background-color'] = 'Red';
	playSound('sound/wrong.wav');
	setTimeout(() => {
		gameOver();
	}, TIME_BETWEEN_QUESTIONS);
}