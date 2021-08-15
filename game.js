var level = 0;
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var started=false;

//Start/Restart the game when a key is pressed from the keyboard
$(document).keydown(function() {
  if(!started){
    started=true;
    nextSequence();
  }
});

//Randomly create a sequence of colours that the game will follow
function nextSequence() {
  userClickedPattern = []
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

//To animate the button click and create a sound and call checkAnswer function
$(".btn").on("click", function() {

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//To check if the Button clicked by the user follows the colour Sequence of the game
function checkAnswer(currentLevel){
  //if wrong button is clicked
  if(gamePattern[currentLevel]!==userClickedPattern[currentLevel]){

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
  //if right button is clicked
  else{

    if(userClickedPattern.length===gamePattern.length){
      setTimeout(nextSequence,1000);
    }

  }
}


function playSound(name) {
  var sound_location = "sounds/" + name + ".mp3";
  var audio = new Audio(sound_location);
  audio.play();
}

function animatePress(currentColour) {

  var color_id = "#" + currentColour;
  $(color_id).addClass("pressed");
  setTimeout(function() {
    $(color_id).removeClass("pressed");
  }, 100);

}

//To reset the values of different variables in the game
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
