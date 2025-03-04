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
