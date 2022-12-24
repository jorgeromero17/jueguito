const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const gameContainer = document.querySelector('.game-container');
const dialog = document.querySelector('.dialog');

const icon = document.querySelector('#icon');
const message = document.querySelector('#message');
const summary = document.querySelector('#summary');
const buttonInteraction = document.querySelector('.buttonInteraction');

let canvasSize;
let elementsSize;

const playerPosition = {
  x:undefined,
  y:undefined,
}

const gifPosition = {
  x: undefined,
  y: undefined,
}

let bombs = [];
let flag = false;
let level = 0;
let lives = 3;

let timeStart;
let timeInterval;

let again = false;

buttonInteraction.addEventListener('click',setCanvasSize);
window.addEventListener('resize',setCanvasSize);


function startGame(){  
  
  game.font = elementsSize+'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if(!map){
    gameWin();
    return;
  }

  if(!timeStart){
    timeStart = Date.now();
    timeInterval = setInterval(() => {
      showTime();
    }, 100);
    showRecord();
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  
  showLives();
  
  game.clearRect(0,0,canvasSize,canvasSize);
  
  mapRowCols.forEach( (row,rowIndex) => {
    row.forEach( (col,colIndex) => {
      let posX = (elementsSize*(colIndex+1))+(elementsSize*0.2);
      let posY = (elementsSize*(rowIndex+1))-(elementsSize*0.15);

      if(col == 'O' && playerPosition.x == undefined){
        playerPosition.x = posX;
        playerPosition.y = posY;
      }
      else if(col == 'I'){
        gifPosition.x = posX;
        gifPosition.y = posY;
      }
      else if(col == 'X' && !flag){
        bombs.push({x:Math.floor(posX),y:Math.floor(posY)});     
      }

      game.fillText(emojis[col],posX,posY);
    });
  });

  flag = true;
  movePlayer();

}

function movePlayer(){
  console.log(playerPosition)

  let bombCollision = bombs.find(bomb => {
    const colissionX = bomb.x == Math.floor(playerPosition.x);
    const colissionY = bomb.y == Math.floor(playerPosition.y);
    return (colissionX && colissionY);
  })

  if(Math.floor(gifPosition.x) == Math.floor(playerPosition.x) && Math.floor(gifPosition.y) == Math.floor(playerPosition.y)){
    levelWin();
  }
  else if(bombCollision){
    levelFail();
  }
  else{
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
  }
}

function levelWin() {
  level++;
  flag = false;
  bombs = [];
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
  
}

function levelFail() {
  if(lives<=1){
    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
    game.fillText(emojis['BOMB_COLLISION'],playerPosition.x,playerPosition.y);
    resetGame();
    
    icon.innerHTML = emojis['GAME_OVER'];
    message.innerHTML = `Cagaste`;
    buttonInteraction.innerHTML = 'Jugar';
    summary.innerHTML = '';

    gameContainer.style.display = 'none';
    dialog.style.display = 'flex';

    return;
  }

  lives-=1;
  game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
  game.fillText(emojis['BOMB_COLLISION'],playerPosition.x,playerPosition.y);
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  setTimeout(() => {
    startGame();
  }, "300")
}

function gameWin(){
  clearInterval(timeInterval);
  const record = localStorage.getItem('record');
  const playerTime = Date.now() - timeStart;
  
  icon.innerHTML = emojis['WIN'];
  message.innerHTML = `Felicidades has regresado a la vida`;
  buttonInteraction.innerHTML = 'Morir';

  if(record){  
    if(record>playerTime){
      summary.innerHTML = `Has superado tu record!!
      <br> Antes: ${localStorage.getItem('record')}
      <br> Ahora: ${playerTime}`;
      localStorage.setItem('record',playerTime);
    }else{
      summary.innerHTML = `No has podido superar tu record 😞
      <br> Record Actual: ${localStorage.getItem('record')}`;
    }
  }else{
    summary.innerHTML = `Muy bien, ahora intenta superar tu record
    <br> Record Actual: ${playerTime}`;
    localStorage.setItem('record',playerTime);
  }

  resetGame();
  gameContainer.style.display = 'none';
  dialog.style.display = 'flex';

}

function showLives() {
  const arr = Array(lives).fill(emojis['HEART']);
  spanLives.innerHTML = '';
  arr.forEach(h => spanLives.append(h));
}

function showTime() {
  spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
  const record = localStorage.getItem('record');
  if (record) {
    spanRecord.innerHTML = localStorage.getItem('record');
    return;
  }
  spanRecord.innerHTML = 'Sin registro';
  
}

function resetGame() {
  lives = 3;
  flag = false;
  bombs = [];
  timeStart = undefined;
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  level = 0;
}

function setCanvasSize(){

  gameContainer.style.display = 'flex';
  dialog.style.display = 'none';

  if(window.innerHeight > window.innerWidth){
    canvasSize = window.innerWidth*0.8;
  }
  else{
    canvasSize = window.innerHeight*0.8;
  }

  canvas.setAttribute('width',canvasSize);
  canvas.setAttribute('height',canvasSize);

  elementsSize = canvasSize/10;
  console.log(canvasSize,elementsSize)

  startGame();
}

window.addEventListener('keydown',moveByKeys);

btnUp.addEventListener('click',moveUp);
btnLeft.addEventListener('click',moveLeft);
btnRight.addEventListener('click',moveRight);
btnDown.addEventListener('click',moveDown);

function moveByKeys(e) {
  switch (e.key) {
    case 'w':
        moveUp();
      break;
      case 'a':
        moveLeft();
      break;
      case 'd':
        moveRight();
      break;
      case 's':
        moveDown();
      break;
  }
}

function moveUp() {
  if(!((playerPosition.y - elementsSize) < 0)){
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  if(!((playerPosition.x - elementsSize) < elementsSize)){
    playerPosition.x -= elementsSize;
    startGame();
  }
  
}

function moveRight() {
  if(Math.floor((playerPosition.x+elementsSize)) <= Math.floor((canvasSize+(elementsSize*0.2)))){
    playerPosition.x += elementsSize;
    startGame();
  }
  
}

function moveDown() {
  if(Math.floor((playerPosition.y+elementsSize)) <= Math.floor((canvasSize+(elementsSize*0.2)))){
    playerPosition.y += elementsSize;
    startGame();
  }
}