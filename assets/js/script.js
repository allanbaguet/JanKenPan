// liste des variables
const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('#player-score');
const computerScoreElem = document.querySelector('#computer-score');
const resultElem = document.querySelector('#result');
const computerChoiceElem = document.querySelector('#computer-choice');
const playAgainBtn = document.querySelector('#play-again');

let playerScore = 0;
let computerScore = 0;


// permet de généré un move random à l'ordinateur, compare le choix du joueur et de l'ordi et affiche le résultat
function playGame() {
    const weapons = ['Pierre', 'Papier', 'Ciseaux'];
    const playerChoice = this.id;
    const computerChoice = weapons[Math.floor(Math.random() * weapons.length)];

    displayChoices(playerChoice, computerChoice);
    const result = compareChoices(playerChoice, computerChoice);
    updateScore(result);
    displayResult(result);
}

// permet d'afficher le message du choix du bot
function displayChoices(playerChoice, computerChoice) {
    computerChoiceElem.innerHTML = `L'ordinateur a choisit: ${computerChoice}`;
}

function compareChoices(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "C'est une égalité !";
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return "Tu as gagné !";
    } else {
        return "L'ordinateur a gagné !";
    }
}


function updateScore(result) {
    if (result === "Tu as gagné !") {
        playerScore++;
    } else if (result === "L'ordinateur a gagné !") {
        computerScore++;
    }
    playerScoreElem.textContent = `Joueur : ${playerScore}`;
    computerScoreElem.textContent = `Ordinateur : ${computerScore}`;
}

// permet d'afficher le message de win/lose et draw
function displayResult(result) {
    resultElem.textContent = result;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.innerHTML = 'Joueur: 0';
    computerScoreElem.innerHTML = 'Ordinateur : 0';
    resultElem.innerHTML = '';
    computerChoiceElem.innerHTML = '';
}


choices.forEach(choice => choice.addEventListener('click', playGame));
playAgainBtn.addEventListener('click', resetGame);

