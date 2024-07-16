const playerOne={
    name:"player-one",
    score:0,
    marker:"X",
    inputBox:document.querySelector(".player-one-input-box"),
    inputBoxButton:document.querySelector("#player-one-input"),
    inputBoxSubmitButton:document.querySelector("#player-one-input-submit"),
    inputBoxCloseButton:document.querySelector("#player-one-input-close-button"),
    nameInput:document.querySelector("#player-one-name"),
    markerInput:document.querySelector("#player-one-marker"),
    scoreDOM:document.querySelector("#player-one-score"),
    nameDOMs:document.querySelectorAll(".player-one-name"),
    toggleInputBox () {
        playerOne.inputBox.classList.toggle("open-close-player-one-input-box")
    },
    updatePlayerDetails (event) {
        if(!gameFunctions.isGameOn){
        playerOne.name=playerOne.nameInput.value;
        playerOne.marker=playerOne.markerInput.value;
        playerOne.nameInput.value="";
        playerOne.markerInput.value="";
        playerOne.toggleInputBox();
        }
        else{
            playerOne.toggleInputBox();
        }
    }

}
const playerTwo={
    name:"player-two",
    score:0,
    marker:"O",
    inputBox:document.querySelector(".player-two-input-box"),
    inputBoxButton:document.querySelector("#player-two-input"),
    inputBoxSubmitButton:document.querySelector("#player-two-input-submit"),
    inputBoxCloseButton:document.querySelector("#player-two-input-close-button"),
    nameInput:document.querySelector("#player-two-name"),
    markerInput:document.querySelector("#player-two-marker"),
    scoreDOM:document.querySelector("#player-two-score"),
    nameDOMs:document.querySelectorAll(".player-two-name"),
    toggleInputBox () {
        playerTwo.inputBox.classList.toggle("open-close-player-two-input-box")
    },
    updatePlayerDetails () {
        if(!gameFunctions.isGameOn){
            playerTwo.name=playerTwo.nameInput.value;
            playerTwo.marker=playerTwo.markerInput.value;
            playerTwo.nameInput.value="";
            playerTwo.markerInput.value="";
            playerTwo.toggleInputBox();
        }
        else{
            playerTwo.toggleInputBox()
        }
    }
}
const gameFunctions = {
    currentPlayer:playerOne,
    isGamingOn:false,
    boardBoxes:document.querySelectorAll(".box"),
    chosenBoxes:[],
    playerChoices:[["","",""],["","",""],["","",""]],
    renderPlayerName (player) {
        return function () {
            player.nameDOMs.forEach((DOM) => DOM.innerText=player.name);
        };
    },
    renderScore () {
        playerOne.scoreDOM.innerText=playerOne.score;
        playerTwo.scoreDOM.innerText=playerTwo.score;
    },
    evaluateWinner () {
        let grid=gameFunctions.playerChoices;
        for (let i=0;i<=2;i++){
            if((grid[i][0]===grid[i][1]&&grid[i][1]===grid[i][2]&&grid[i][0]!=="")||(grid[0][i]===grid[1][i]&&grid[1][i]===grid[2][i]&&grid[0][i]!=="")||(((grid[0][0]===grid[1][1]&&grid[1][1]===grid[2][2])||(grid[0][2]===grid[1][1]&&grid[1][1]===grid[2][0]))&&grid[1][1]!=="")){
                gameFunctions.currentPlayer.score++;
                return gameFunctions.currentPlayer;
            }
            else if(grid.every((row) => row.every((cell)=>cell!==""))){
                return "draw";
            }
        }
        return false;
    },
    startNewRound () {
        gameFunctions.chosenBoxes=[];
        gameFunctions.playerChoices=[["","",""],["","",""],["","",""]];
        gameFunctions.renderScore();
        gameFunctions.boardBoxes.forEach((box) => box.innerText="");
        gameFunctions.currentPlayer=playerOne;
    },
    addMarkerOnBox(event){
        if(!gameFunctions.chosenBoxes.some((box) => box.id===event.target.id)){
            gameFunctions.isGameOn=true;
            event.target.innerText=gameFunctions.currentPlayer.marker;
            gameFunctions.chosenBoxes.push(event.target);
            gameFunctions.playerChoices[Math.floor(parseInt(event.target.id)/3)][parseInt(event.target.id)%3]=gameFunctions.currentPlayer.marker;
            if(gameFunctions.evaluateWinner()){
                gameFunctions.startNewRound();
            }
            gameFunctions.currentPlayer=gameFunctions.currentPlayer===playerOne?playerTwo:playerOne;
        }
    },
    restartGame () {
        playerOne.name="player-one";
        playerTwo.name="player-two";
        playerOne.score=0;
        playerTwo.score=0;
        gameFunctions.chosenBoxes=[];
        gameFunctions.playerChoices=[["","",""],["","",""],["","",""]];
        gameFunctions.renderScore();
        gameFunctions.boardBoxes.forEach((box) => box.innerText="");
        gameFunctions.currentPlayer=playerOne;
        gameFunctions.renderScore();
        gameFunctions.renderPlayerName(playerOne)();
        gameFunctions.renderPlayerName(playerTwo)();
    }
}
const game = () => {
    let players=[playerOne,playerTwo];
    let restartButton=document.querySelector("#restart-button");
    for (let player of players){
        player.inputBoxButton.addEventListener("click",player.toggleInputBox);
        player.inputBoxCloseButton.addEventListener("click",player.toggleInputBox);
        player.inputBoxSubmitButton.addEventListener("click",player.updatePlayerDetails);
        player.inputBoxSubmitButton.addEventListener("click",gameFunctions.renderPlayerName(player));
    }
    gameFunctions.boardBoxes.forEach((box) => {
        box.addEventListener("click",gameFunctions.addMarkerOnBox);
    });
    restartButton.addEventListener("click",gameFunctions.restartGame);
}
game();