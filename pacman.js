// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var dots = 240;
var remainingDots = 240;
var ghostsEaten = 0;
var level = 1;
var fruits = ['Cherry', 'Strawberry', 'Orange', 'Orange', 'Apple', 'Apple', 'Pineapple', 'Pineapple', 'Galaxian Spaceship', 'Galaxian Spaceship', 'Bell', 'Bell', 'Key']
var fruitPoints = [100, 300, 500, 500, 700, 700, 1000, 1000, 2000, 2000, 3000, 3000, 5000]

// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};
// replace this comment with your four ghosts setup as objects
var ghosts = [inky, blinky, pinky, clyde]

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Level: '+ level + '(' + (fruits[(level - 1)]) + ')' + '\n\nScore: ' + score + '     Lives: ' + lives + '\n\nPower-Pellets: ' + powerPellets + '   Remaining dots: ' + remainingDots);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0){
  console.log('(p) Eat Power Pellet');}
  if (remainingDots > 0){
    if (remainingDots > 99){
      console.log('(h) Eat 100 dots at once');
    }
    if (remainingDots > 9){
      console.log('(t) Eat 10 dots at once');
    }
    console.log('(a) Eat all remaining dots');
  }
  console.log('(1) Eat ' + ghosts[0].name + edibility(ghosts[0]));
  console.log('(2) Eat ' + ghosts[1].name+ edibility(ghosts[1]));
  console.log('(3) Eat ' + ghosts[2].name+ edibility(ghosts[2]));
  console.log('(4) Eat ' + ghosts[3].name+ edibility(ghosts[3]));
  console.log('(q) Quit');
    if (Math.random() > 0.85){
      console.log('(f) Eat a ' + fruits[(level - 1)] + ' for ' + fruitPoints[(level-1)] + ' points!');
  }
}

function edibility(ghost) {
  if (ghost.edible === true){
    return ' (edible)';
  }
  else {
    return ' (inedible)';
  }
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  if (remainingDots > 0){
  score += 10;
  remainingDots -= 1;}
}

function eatTenDots() {
  console.log('\nChomp!!!');
  if (remainingDots > 9){
    score += 100;
    remainingDots -= 10;
  }
}

function eatHundDots() {
  console.log('\nChomp!!!!!!');
  if (remainingDots > 99){
    score += 1000;
    remainingDots -= 100;
  }
}

function eatRemainingDots(){
  console.log('\nChomp it all!!!!!!');
  score += (remainingDots * 10);
  remainingDots = 0;
}


function eatPowerPellet(){
  console.log('\nPower!');
  score += 50;
  inky.edible = true;
  blinky.edible = true;
  pinky.edible = true;
  clyde.edible = true;
  powerPellets -= 1;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      levelUp();
      break;
    case 'p':
      if (powerPellets > 0){
        eatPowerPellet();
        levelUp();
      }
      else
        {console.log('\nNo Power-Pellets left!');}
      break;
    case 't':
      if (remainingDots > 9) {
        eatTenDots();
        levelUp();
        break;
      }
      else {
        console.log('\nYou cant eat more dots than are left');
        break;
      }
    case 'h':
      if (remainingDots > 99){
        eatHundDots();
        levelUp();
        break;
      }
      else {
        console.log('\nYou cant eat more dots than are left');
        break;
      }
    case 'a':
      eatRemainingDots()
      console.log("Greedy! Aren't you");
      levelUp();
      break;

    case '1':
      eatGhost(inky);
      gameOver();
      break;
    case '2':
      eatGhost(blinky);
      gameOver();
      break;
    case '3':
      eatGhost(pinky);
      gameOver();
      break;
    case '4':
      eatGhost(clyde);
      gameOver();
      break;
    case 'f':
        score += fruitPoints[(level - 1)];
        break;
    default:
      console.log('\nInvalid Command!');
  }
}

function eatGhost(ghost){
  if (ghost.edible === false){
    lives -= 1
    console.log('\n Pac-Man was killed by the ' + ghost.colour + ' coloured ghost named ' + ghost.name);
  }
  else if (ghost.edible === true){
    switch(ghostsEaten) {
      case 0:
        console.log('\nPac-man just ate the ' + ghost.colour + ' coloured ghost called' + ghost.name + ' who has the personality of a ' + ghost.character);
        score += 200;
        ghost.edible = false;
        ghostsEaten += 1;
        break;

      case 1:
        console.log('\nPac-man just ate the ' + ghost.colour + ' coloured ghost called' + ghost.name + ' who has the personality of a ' + ghost.character);
        score += 400;
        ghost.edible = false;
        ghostsEaten += 1;
        break;

      case 2:
        console.log('\nPac-man just ate the ' + ghost.colour + ' coloured ghost called' + ghost.name + ' who has the personality of a ' + ghost.character);
        score += 800;
        ghost.edible = false;
        ghostsEaten += 1;
        break;

      case 3:
        console.log('\nPac-man just ate the ' + ghost.colour + ' coloured ghost called' + ghost.name + ' who has the personality of a ' + ghost.character);
        score += 1600;
        ghost.edible = false;
        ghostsEaten = 0;
        break;
      }
    }
}

function gameOver(){
  if (lives === 0){
    process.exit();
  }
}

function levelUp(){
  if (powerPellets === 0 && remainingDots === 0){
    level += 1;
    powerPellets = 4;
    remainingDots = 240;
    for (var i = 0; i < 4; i++){
      (ghosts[i]).edible = false;
    }
    drawScreen();
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
