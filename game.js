var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red","blue","green","yellow"];
 var started = false;
 var level = 0;

//  wait for user to press a button to trigger nextSequence function

 $(document).keypress(function(){
    if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
 });
  
//  after triggering nextSequence function we wait for user to click a color

$(".btn").click(function(){
    var userChosenColor = this.getAttribute("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// after the click we check whether the color was right

function checkAnswer(currentLevel){

    // we check by comparing the last item of both arrays

        if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

            if(gamePattern.length===userClickedPattern.length){

                setTimeout(function(){
                    nextSequence();
                },1000);

            }
        }else{
             
            playSound("wrong");

            $("body").addClass("game-over");

            setTimeout(function(){
                $("body").removeClass("game-over");
            },200);

            $("#level-title").text("Game Over, Press Any Key to Restart");

            startOver();

        }
}

function nextSequence(){

    userClickedPattern = [];
    level++;   
    $("#level-title").text("Level " + level);
    var randomNumber = Math.round(Math.random()*3);
   
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);
   
   $("#"+randomChosenColor).fadeOut(60).fadeIn(60);
   
   playSound(randomChosenColor);
   }


function playSound(name){
    var audio = new Audio(name+".mp3");
    audio.play();
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
    
}

// then when the game is over we reset everythinh back to normal and again wait for the key press to trigger nextSequence function

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}




