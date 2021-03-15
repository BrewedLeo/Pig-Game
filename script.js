
// ***************************************//
// ************** Pig Game **************//
// *************************************//

/* 

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn 
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/




var scores, currentScore, activePlayer, gamePlayer, prevDice;

init();
// Setter
// document.querySelector('#current--' + activePlayer).textContent = dice;  
// document.querySelector('#current--0').innerHTML = '<em>' + dice + '</em>';

// Getter
// let x = document.querySelector('#score--' + activePlayer).textContent;
// console.log(x);

// QuerySelector uses the CSS style while the getElementById uses just the Id names
// document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn--roll').addEventListener('click', function() {
   
   if (gamePlaying) {

         // 1. Random number
        var dice1 = Math.trunc(Math.random() * 6) + 1;
        var dice2 = Math.trunc(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';


        // 3. Update the round score IF the rolled number was NOT a 1

        // Challenge: if the player plays 6 twice in a row
        // if (prevDice === 6 && dice === 6) {
        //     // Player looses his score
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        //     nextPlayer();

        // } 
        
        if (dice1 !== 1 && dice2 !== 1) { // Normal Game Code continues
            // Add Score
            currentScore += dice1 + dice2;
            document.querySelector('#current--' + activePlayer).textContent = currentScore; 
           
        } else {
            nextPlayer();
        }

        prevDice = dice;
        
   }


});








document.querySelector('.btn--hold').addEventListener('click', function() {
   
    if (gamePlaying) {

         // 1. Add current score to the global score
        scores[activePlayer] += currentScore;

        // 2. Update UI
        document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];
        finalScore = document.querySelector('.final-score').value;
        var winningScore;
        // Check if the input variable is not empty
        // Undefined, null, 0 or "" are COERCED to false
        // Anything else is COERCED to true

        if (finalScore) {
            winningScore = finalScore;
        } else {
            winningScore = 100;
        }

        // 3. Check if the player won the game
        if (scores[activePlayer] >= winningScore) {
            // declare player has won the game
            document.querySelector('#name--' + activePlayer).textContent = 'Winner!'
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('.player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            gamePlaying = false;
        } else {

            // Next Player
            nextPlayer();
        }

        

    }

});



function nextPlayer() {
     // Next Player 
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     currentScore = 0;

     // Setting  Player Current Score
     document.getElementById('current--0').textContent = '0';
     document.getElementById('current--1').textContent = '0';

     document.querySelector('.player--0').classList.toggle('player--active');
     document.querySelector('.player--1').classList.toggle('player--active');

     // document.querySelector('.player--0').classList.remove('player--active');
     // document.querySelector('.player--1').classList.add('player--active');
};

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.getElementById('name--0').textContent = 'Player 1';
    document.getElementById('name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');   
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');   
    document.querySelector('.player--0').classList.add('player--active');

}
