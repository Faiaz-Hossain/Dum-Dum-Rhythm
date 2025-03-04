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
