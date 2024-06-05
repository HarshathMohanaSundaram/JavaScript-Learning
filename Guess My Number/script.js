// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent='Correct Number!'

// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;

// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

const displayMessage = message => { 
  document.querySelector('.message').textContent = message;
};
const displayNumber = number => {
  document.querySelector('.number').textContent = number;
};
const displayScore = score => {
  document.querySelector('.score').textContent = score;
};
const displayHighScore = highScore => {
  document.querySelector('.highscore').textContent = highScore;
};
const changeBackGround = color => {
  document.querySelector('body').style.backgroundColor = color;
};
const changeWidth = width => {
  document.querySelector('.number').style.width = width;
};


let secretNumber = Math.trunc( Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

displayScore(score);
displayHighScore(highScore);

document.querySelector('.check').addEventListener('click', function(){
  const guess =Number (document.querySelector('.guess').value);

  let resultMessage ='';
  if (!guess){
    resultMessage = 'No Number';
  } else if (guess === secretNumber){
    
    resultMessage = 'Correct Number';
    displayNumber(secretNumber)
    
    changeBackGround('#60b347');
    changeWidth('30rem');

    if (score > highScore) {
      highScore = score;
      displayHighScore(highScore);
    }
  } else if(guess!==secretNumber){
    if (score > 1) {
      resultMessage = (guess > secretNumber) ? 'Too High !' : 'Too Low !';
      score--;
    } else {
      resultMessage = 'You Lost the game';
      score = 0;
    }
  }

  displayMessage(resultMessage);
  displayScore(score);

})

document.querySelector('.again').addEventListener('click', function(){
  score = 20;
  secretNumber = Math.trunc( Math.random() * 20) + 1;
  
  displayMessage('Start Guessing...');
  displayScore(score);
  displayNumber('?');
  
  document.querySelector('.guess').value='';
  changeBackGround('#222');
  changeWidth('15rem');

})
