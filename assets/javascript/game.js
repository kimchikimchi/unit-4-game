/*
- Whenever a new game starts, random integers are assigned to four buttons.
-      "                "   , a random number is shown to the user.
-      "                "   , player's score counter is set to a zero.

- Whenever the user clicks on an gem image, update the player's score with the value of the clicked button.
- Player wins if his total score matches the random number shown.
- Player loses if his total score exceeds the random number shown.
- Game restarts whenever the player wins or loses.
*/

$(document).ready( function() {

    var gameData = {
        randomNumber: undefined,
        totalScore: 0,
        wins: 0,
        losses: 0,
        red: undefined,
        blue: undefined,
        yellow: undefined,
        green: undefined,
        displayMsg: "",
    };


    function initializeGame() {
        // Generates number between 19 and 120
        gameData.randomNumber = Math.floor( Math.random() * 102) + 19;

        // Avoiding repetition (aka typing)
        ["red", "blue", "yellow", "green"].forEach( function(color) {
            gameData[color] = Math.floor( Math.random() * 12) + 1;
        });

        gameData.totalScore = 0;

        console.log("Starting a new game: ");
        console.log(gameData);

        drawBoard();
    }

    function drawBoard() {
        $("#displayMsg").text(gameData.displayMsg);
        $("#randomNumber").text(gameData.randomNumber);
        $("#totalScore").text(gameData.totalScore);
        $("#wins").text(`Wins: ${gameData.wins}`);
        $("#losses").text(`Losses: ${gameData.losses}`);
    }

    function addGemValue(color) {
        console.log(`Adding ${color} :  ${ gameData[color] }`)
        gameData.totalScore += parseInt(gameData[color]);
    }

    function isWinOrLose() {
        if ( gameData.randomNumber === gameData.totalScore ) {
            gameData.wins++;
            //alert("You WON this round");
            gameData.displayMsg = "You WON!";
            return true;
        } else if (gameData.randomNumber < gameData.totalScore) {
            gameData.losses++;
            //alert("You LOST this round");
            gameData.displayMsg = "You LOST!";
            return true;
        } else {
            return false;
        }
    }

    $(".gemButton").on('click', function() {
        console.log(`Pressed ${this.value}`);
        addGemValue(this.value);
        drawBoard();

        if ( isWinOrLose() ) {
            initializeGame();
        }
    });

    // Below runs once when the page is loaded.
    initializeGame();

});
