/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, previousDice;

init();

/**** Botão roll ****/
//callback e função anonima
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {
        // 1. Número aleatório
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Mostra o resultado
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Atualiza se o numero for diferente de 1
        if (dice !== 1){
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

/**** Botão Hold ****/
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Adiciona os pontos atuais, ao placar global
        scores[activePlayer] += roundScore;

        // Atualiza o UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Checa se o player ganhou o jogo
        if(scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false; // encerra o jogo
        } else {
            nextPlayer();
        } 
    }
});

/**** Botão new game ****/
document.querySelector('.btn-new').addEventListener('click', init);


// Função para trocar os players
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';

    /* add e remove class */
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

};

//Reseta o jogo
function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    /* mudando o css */
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
