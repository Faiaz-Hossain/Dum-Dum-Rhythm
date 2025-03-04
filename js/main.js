//run music once
let homeMusic = false, homeMusicState=false;
//determines which screen to play at the moment
let scene = 'home';

function setup() {
    createCanvas(1530, 870);
    textAlign(CENTER, CENTER);
}
function draw() {
    //loops home page
    if (scene === 'home') {
      homeScreen();
    } 
    //loops level1 page
    else if (scene === 'level1') {
      level1(); // Run the rhythm game
    }
    else if(scene==='pause')
    {
      pauseScreen();
    }
    else if(scene==='creditScreen')
      {
        creditScreen();
      }
    //to refresh the game using esc key
    if (keyIsDown(27)) 
      {
        if(scene==='level1'||scene==='pause'||scene==='home')
        {
            location.reload();
        }
      }
} 

// Rhythm game variables
let beatTimes = [1.2, 2.5, 3.7, 6.2, 7.8, 9.1, 10.5, 12.0, 13.7, 15.1, 16.8,17.2,18.6,19.5,20.1,22.9,23.1,24.9,26.7,27.1]; // Beat spawn times
let beats = [];
//game state
let gameStarted = false, gameOver = false;
let score = 0;
let spawnedBeats = [];
let gameStartTime;

// Function to handle level 1 (rhythm game)
function level1() {
    //show background image
    image(level1img,0, 0,1530, 870);
    //show the text until game starts
    if(!gameStarted)
    {
      textSize(18);
      text("Click anywhere to start", width / 2, height / 2 + 80);
    }
    //show game over screen
    if (gameOver) {
        showGameOverScreen();
        return;
    }
    //plase the score and pause button on their positions
    displayScore();
    pause_btn();

    //game code
    if (gameStarted) {
      let currentTime = (millis() - gameStartTime) / 1000; // Convert to seconds
      
      //controlls game duration
      if (currentTime >= 30) {
        gameOver = true;
        return;
      }
    
      for (let i = 0; i < beatTimes.length; i++) {
        if (currentTime >= beatTimes[i] && !spawnedBeats.includes(beatTimes[i])) {
          let beat = {
            x: random(560, width - 550),
            y: random(50, height - 400),
            size: 30,//beat circle 30 pixel
            spawnTime: millis() // Store the spawn time
          };
          beats.push(beat);
          spawnedBeats.push(beatTimes[i]);
    
          appearSound.play(); //Play sound when a beat appears
        }
      }
    }
    
    for (let i = beats.length - 1; i >= 0; i--) {
      let beat = beats[i];
    
      // Check if 2 seconds have passed since spawn
      if (millis() - beat.spawnTime > 2000) {
          beats.splice(i, 1); // Remove expired beat
          continue; // Skip rendering this beat
      }
      //render beat
      fill(255, 150);
      ellipse(beat.x, beat.y, beat.size, beat.size);
    }
}