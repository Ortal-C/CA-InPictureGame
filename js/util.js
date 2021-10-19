function shuffle(items) {
	var rndIdx, keep;
	for (var i = items.length - 1; i > 0; i--) {
		rndIdx = getRandomInt(0, items.length - 1);
		//swapping
		keep = items[i];
		items[i] = items[rndIdx];
		items[rndIdx] = keep;
	}
	return items;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function playSound(url) {
	var sound = new Audio(url);
	sound.play();
}

function showInstructions() {
	alert(
		`How well do you recognize countries' flags around the world?\n So for test yourself: click on the right country's name below the shown flag `
	);
}