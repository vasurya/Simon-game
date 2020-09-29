var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
  ++level;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  $("#" + randomChosenColour).click(function () {
    playSound(randomChosenColour);
  });

  userClickedPattern = [];
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length);
});

$(document).one("keydown", nextSequence);

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]) {
    console.log("SUCCESS" + userClickedPattern + gamePattern);

    if (currentLevel === gamePattern.length) setTimeout(nextSequence(), 200);
  } else {
    console.log("FAILURE");
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Please try again, press any KEY");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $(document).one("keydown", nextSequence);
  }
}
