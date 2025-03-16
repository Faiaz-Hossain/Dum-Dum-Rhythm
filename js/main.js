//run music once
let homeMusic = false, homeMusicState=false;
//determines which screen to play at the moment
let scene = 'home';

function setup() {
    createCanvas(1530, 870);
    textAlign(CENTER, CENTER);
    frameRate(30);
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

let lastKeyPressTime = 0; // Store last key press time
let delayTime = 300; // Delay time in milliseconds

//volume button function
function volume_btn()
{
    let currentTimehome = millis();
    // Button VOLUME
    if(homeMusicState)//checks if music is on/true
    {
      image(soundButtonImg,20,50,soundButtonImg.width/64, soundButtonImg.height/64);
    }
    else if(!homeMusicState)//checks if music is off/false
    {
      image(muteButtonImg,20,50,muteButtonImg.width/64, muteButtonImg.height/64);
    }
    //this if statement prevents multiple mouse clicks at a time
    if(scene === 'home') 
      {
       if(currentTimehome - lastKeyPressTime > delayTime)//ensure 3s delay
        {
          if(mouseX >= 20 && mouseX <= 70 && mouseY >= 50 && mouseY <= 100 && mouseIsPressed==true) 
            {
              if(homeMusicState==false){
                music[0].play();//play music
                homeMusicState=true;
              } 
              else if(homeMusicState==true){
                music[0].stop();//stop music
                homeMusicState=false;
              } 
              lastKeyPressTime = currentTimehome; // Update the last mouse click time
            } 
        }
      }
}
//pause button function
function pause_btn(){
  //pause button position
  image(pauseButtonImg,1450,50,exitButtonImg.width/64, exitButtonImg.height/64);
  if(scene === 'level1')
    {
      if(mouseX >= 1450 && mouseX <= 1500 && mouseY >= 50 && mouseY <= 100 && mouseIsPressed==true) {
        //delay to prevent multiple clicks at the same time
        setTimeout(() => {
            scene = 'pause';
        }, 300);//300ms
      } 
    }
}
//exit button function
function exit_btn()
{
  //exit button position
  image(exitButtonImg,1450,50,exitButtonImg.width/64, exitButtonImg.height/64);
  if (scene === 'home') {
      if (mouseX >= 1450 && mouseX <= 1500 && mouseY >= 50 && mouseY <= 100 && mouseIsPressed==true) {
          window.close();
      } 
  }
}
//play button function 
function play_btn()
{
  if (scene === 'home') {
    // Play Button in home screen
      image(playButtonImg,730,430,playButtonImg.width/64, playButtonImg.height/64);
      if (mouseX >= 730 && mouseX <= 780 && mouseY >= 430 && mouseY <= 480 && mouseIsPressed==true) {
          scene = 'level1';
      } 
  }
  //for pause screen with different
  if (scene === 'pause') {
    // Play Button in pause screen
      image(playButtonImg,570,430,playButtonImg.width/64, playButtonImg.height/64);
      if (mouseX >= 570 && mouseX <= 620 && mouseY >= 430 && mouseY <= 480 && mouseIsPressed==true) {
          scene = 'level1';
      } 
  }
}
//home button function
function restart_btn()
{
    //shows home button
    image(restartButtonImg,770,430,playButtonImg.width/64, playButtonImg.height/64);
    if (scene === 'pause') {
        if (mouseX >= 770 && mouseX <= 820 && mouseY >= 430 && mouseY <= 480 && mouseIsPressed==true) {
            restartGame();
            scene = 'level1';
        } 
    }
}
//home button function
function home_btn()
{
    //shows home button
    image(homeButtonImg,970,430,playButtonImg.width/64, playButtonImg.height/64);
    if (scene === 'pause') {
        if (mouseX >= 970 && mouseX <= 1020 && mouseY >= 430 && mouseY <= 480 && mouseIsPressed==true) {
            restartGame();
            scene = 'home';
        } 
    }
}
//credit button function
function credit_btn()
{
    //shows home button
    image(creditButtonImg,20,750,playButtonImg.width/64, playButtonImg.height/64);
    if (scene === 'home') {
        if (mouseX >= 20 && mouseX <= 70 && mouseY >= 750 && mouseY <= 800 && mouseIsPressed==true) {
            scene = 'creditScreen';
        } 
    }
}

function mousePressed() {
    if(scene==='level1'){
        if (!gameStarted && !gameOver) {
            gameStarted = true;
            gameStartTime = millis();
          } else if (gameOver) {
            restartGame();
          } else if (!gameOver) {
            checkBeatClick(mouseX, mouseY);
          }
    }
    //for creditScreen
    if(scene==='creditScreen'){
      scene = 'home';
    }
}
function displayScore() 
{
  fill(255);
  textSize(24);
  text("Score: " + score, 100, 30);
}
  
function checkBeatClick(x, y) 
{
  for (let i = beats.length - 1; i >= 0; i--) 
    {
      let d = dist(x, y, beats[i].x, beats[i].y);
      if (d < 30) {
        score ++;
        beats.splice(i, 1);
        hitPerfect.play();
        break;
      }
    }
  }
  
function restartGame() 
{
  gameStarted = false;
  gameOver = false;
  score = 0;
  beats = [];
  gameStartTime=0;
  spawnedBeats = [];
  if(scene='level1')
  {
    scene='home';
  }
}
function pauseScreen()
{
    if(scene==='pause')
    {
        //pause screen background
        image(pauseimg,0, 0,1530, 870);
        //Shows buttons
        play_btn();
        home_btn();
        restart_btn();
    }
}

function homeScreen() {
    let colour="#b65fcf";//small circle colour
    image(homeimg,0, 0,1530, 870); // Display home gif
    fill(colour);
    rect(730,430,54,54,50);//small circle behind play_btn
    rect(20,50,54,54,50);//small circle behind volume_btn
    rect(1450,50,54,54,50);//small circle behind exit_btn
    rect(20,750,54,54,50);//small circle behind exit_btn
    //buttons
    volume_btn();
    exit_btn();
    play_btn();
    credit_btn();
}
//shows gameover screen
function showGameOverScreen() {
    //pause screen background
    image(pauseimg,0, 0,1530, 870);
    fill(248, 179, 249);  //pink
    textSize(40);
    text("Game Over!", width / 2, height / 2 - 50);
    textSize(24);
    text("Final Score: " + score+"/20", width / 2, height / 2);
    textSize(18);
    text("Click anywhere to go home", width / 2, height / 2 + 80);
  }

  function creditScreen() {
    // Pause screen background
    image(creditimg, 0, 0, 1530, 870);
    
    textAlign(CENTER);
    // Set text color
    fill(248, 179, 249);  //pink

    textSize(40);
    text("Credits\n\n", width / 2, height / 2 - 50);
    
    // Display credits information
    textSize(24);
    text("Developed and Designed by Faiaz Hossain \nAll rights reserved ©\nSpecial Thanks to USM!", width / 2, height / 2);
    
    // Display instruction to go home
    textSize(18);
    text("\n\nClick anywhere to go home", width / 2, height / 2 + 80);
}
