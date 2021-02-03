
var buttonColours=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;
$(".btn").click(function(){                 //callback function
  var chosenColour=$(this).attr("id");
  userClickedPattern.push(chosenColour);
  // console.log(userClickedPattern);
  playSound(chosenColour);
  animatePress(chosenColour);
  checkAnswer(userClickedPattern.length-1);
});
$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(level)
{
  if(userClickedPattern[level]==gamePattern[level])
  {
    if(userClickedPattern.length==gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else
  {
      playSound("wrong");
      $("#level-title").text("game over,press any key to restart the game");
      $("body").addClass("game-over");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
  }
}
function nextSequence()
{
  level++;
  $("#level-title").text("level "+level);//increasing the level of the game//
  userClickedPattern=[];    //resetting the user set pattern to empty//
  var randomNumber=Math.floor(Math.random()*4);
  // console.log(randomNumber);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(randomChosenColour);
  // console.log(gamePattern);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
