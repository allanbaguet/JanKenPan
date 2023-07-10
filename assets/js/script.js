// liste des variables
const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('#player-score');
const computerScoreElem = document.querySelector('#computer-score');
const resultElem = document.querySelector('#result');
const computerChoiceElem = document.querySelector('#computer-choice');
const playAgainBtn = document.querySelector('#play-again');
// variables pour le bouton et le son
const soundBtn = document.querySelector('#sound');
const audio = new Audio('./assets/sound/japaneses-yooooo.mp3')

// score de départ des 2 côtés
let playerScore = 0;
let computerScore = 0;

// fonction principale du jeu, permet au bot de choisir un symbole dans le tableau en aléatoire,
// permet aussi au joueur de choisir son symbole, affiche, compare et met à jour les scores
function playGame() {
    const weapons = ['Pierre', 'Feuille', 'Ciseaux'];
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

// fonction qui compare les choix, et ainsi désigne un vainqueur ou un perdant
function compareChoices(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "C'est une égalité !";
    } else if (
        (playerChoice === 'Pierre' && computerChoice === 'Ciseaux') ||
        (playerChoice === 'Feuille' && computerChoice === 'Pierre') ||
        (playerChoice === 'Ciseaux' && computerChoice === 'Feuille')
    ) {
        return "Tu as gagné !";
    } else {
        return "L'ordinateur a gagné !";
    }
}

// fonction qui permet d'afficher le résultats et les scores 
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

// fonction qui réinitialise les scores et les chaine de caractères
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.innerHTML = 'Joueur: 0';
    computerScoreElem.innerHTML = 'Ordinateur : 0';
    resultElem.innerHTML = '';
    computerChoiceElem.innerHTML = '';
}

// fonction pour le son et le fait qu'il se remet à 0 à chaque clic du bouton
function playSound() {
    audio.currentTime = 0;
    audio.play();
}

// écouteur d'événement pour choisir son symbole
choices.forEach(choice => choice.addEventListener('click', playGame));
// écouteur d'événement pour recommencer la partie au clic du bouton
playAgainBtn.addEventListener('click', resetGame);
// écouteur d'événement qui permet de jouer un son au clic du bouton JanKenPon
soundBtn.addEventListener('click', playSound);
