//button image variables
let homeButtonImg;
let playButtonImg;
let exitButtonImg;
let muteButtonImg;
let soundButtonImg;
let pauseButtonImg;
let creditButtonImg;
let restartButtonImg;
//background gif variables
let homeimg;
let level1img;
let pauseimg;
let creditimg;
//music variables
let hitPerfect,appearSound;
let music = [];

function preload(){
    //buttons
    playButtonImg = loadImage("images/buttons/play.png");
    exitButtonImg = loadImage("images/buttons/exit.png");
    muteButtonImg = loadImage("images/buttons/mute.png");
    soundButtonImg = loadImage("images/buttons/sound.png");
    homeButtonImg = loadImage("images/buttons/home.png");
    pauseButtonImg = loadImage("images/buttons/pause.png");
    creditButtonImg= loadImage("images/buttons/credit.png");
    restartButtonImg=loadImage("images/buttons/restart.png");
	//music
	music[0] = loadSound("audio/music/SchermataTitolo.mp3");
    hitPerfect = loadSound('audio/music/hit.mp3');
    appearSound=loadSound('audio/music/appear.mp3');
    //backgrounds
    homeimg=loadImage("images/backgrounds/1.gif");
    level1img=loadImage("images/backgrounds/level1.gif");
    pauseimg=loadImage("images/backgrounds/pause.gif");
    creditimg=loadImage("images/backgrounds/credit.gif");
}