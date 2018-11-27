
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
var scores, roundScore, activePlayer, gamePlaying, previousDice, previousDiceTwo;

init();

/**** Botão roll ****/
//callback e função anonima
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying) {

        // 1. Número aleatório
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        // 2. Mostra o resultado
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice + '.png';
        document.getElementById('dice-2').src = 'dice-' + diceTwo + '.png';

        // 3. Verifica se foram rolado duas vezes seguidas o numero 6 
        if ((previousDice === 6 && dice === 6) || 
             (previousDiceTwo === 6 && diceTwo === 6)) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1 && diceTwo !== 1){
            roundScore += dice;
            roundScore += diceTwo
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        // Guarda os números rolados da jogada anterior
        previousDice = dice;
        previousDiceTwo = diceTwo;
    }
});

/**** Botão Hold ****/
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Adiciona os pontos atuais, ao placar global
        scores[activePlayer] += roundScore;

        // Atualiza a UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        /* Recebe o valor da partida, se for vazio, seta para 100 */
        var input = document.querySelector('.final-score').value;
        var winningScore;

        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Checa se o player ganhou a partida
        if(scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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


//Função para trocar os players
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    /* add e remove classs */
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
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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
