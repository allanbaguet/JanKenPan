// liste des variables
const choices = document.querySelectorAll('.choice');
const playerScoreElem = document.querySelector('#player-score');
const computerScoreElem = document.querySelector('#computer-score');
const resultElem = document.querySelector('#result');
const computerChoiceElem = document.querySelector('#computer-choice');
const playAgainBtn = document.querySelector('#play-again');
const statsElem = document.querySelector('#stats');

// variables pour le bouton et le son
const soundBtn = document.querySelector('#sound');
const audio = new Audio('./assets/sound/japaneses-yooooo.mp3')

// score de départ des 2 côtés
let playerScore = 0;
let computerScore = 0;
// variables qui va permettre de calculé le % de win dans la fonction updateStats
let playerWins = 0;
let computerWins = 0;

// fonction principale du jeu, permet au bot de choisir un symbole dans le tableau aléatoirement,
// permet aussi au joueur de choisir son symbole grace à l'id , affiche, compare et met à jour les scores
function playGame() {
    const weapons = ['Pierre', 'Feuille', 'Ciseaux'];
    const playerChoice = this.id;
    const computerChoice = weapons[Math.floor(Math.random() * weapons.length)];
    displayChoices(playerChoice, computerChoice);
    const result = compareChoices(playerChoice, computerChoice);
    updateScore(result);
    displayResult(result);
    updateStats();
}

// permet d'afficher le message du choix de symbole du bot
function displayChoices(playerChoice, computerChoice) {
    computerChoiceElem.innerHTML = `L'ordinateur a choisit: ${computerChoice}`;
}

// fonction qui compare les choix et ainsi désigne un vainqueur et un perdant
function compareChoices(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "C'est une égalité !";
    } else if (
        (playerChoice === 'Pierre' && computerChoice === 'Ciseaux') || //L'opérateur OU logique renvoie vrai si et seulement si au moins un de ses opérandes est vrai
        (playerChoice === 'Feuille' && computerChoice === 'Pierre') ||
        (playerChoice === 'Ciseaux' && computerChoice === 'Feuille')
    ) {
        return "Tu as gagné !";
    } else {
        return "L'ordinateur a gagné !";
    }
}

// fonction qui permet d'afficher le résultat et les scores 
function updateScore(result) {
    if (result === "Tu as gagné !") {
        playerScore++;
        playerWins++;
    } else if (result === "L'ordinateur a gagné !") {
        computerScore++;
        computerWins++;
    }
    playerScoreElem.textContent = `Joueur : ${playerScore}`;
    computerScoreElem.textContent = `Ordinateur : ${computerScore}`;
}

// permet d'afficher le message de win/lose et draw
function displayResult(result) {
    resultElem.textContent = result;
}

// la variable totalGames permet d'additionné les victoires des 2 côtés, 
// la variable winPercentage permet de calculé un pourcentage en multipliant par 100 les victoires du joueurs / le nombre de partie
function updateStats() {
    const totalGames = playerWins + computerWins;
    //? est une expression ternaire/ retourne valeur 0 si aucune partie jouée -> évite les pb de divison par 0
    const winPercentage = totalGames > 0 ? (playerWins / totalGames) * 100 : 0;
    statsElem.textContent = `Winrate : ${winPercentage.toFixed(2)}%`; //tofixed(2) permet d'afficher que 2 chiffres après la virgule
}

// fonction qui réinitialise les scores et les chaines de caractères
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreElem.innerHTML = 'Joueur: 0';
    computerScoreElem.innerHTML = 'Ordinateur : 0';
    resultElem.innerHTML = '';
    computerChoiceElem.innerHTML = '';
    playerWins = 0;
    computerWins = 0;
    statsElem.innerHTML = '0%';
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


// affiche les pétales en bas de la page (à retravailler)
// let left = 0
// for (i=0; i<100; i++){
//     let rand = Math.floor(Math.random()* 360)
//     let image = `<img class='bottom-petal' style='position : "fixed";bottom:"3px"; left:"${left}px"; transform:rotate(${rand}deg);width:calc(100%/100)' src='./assets/img/pétale_sakura.png'>`
//     document.querySelector('body').innerHTML += image
//     left += 10
// }