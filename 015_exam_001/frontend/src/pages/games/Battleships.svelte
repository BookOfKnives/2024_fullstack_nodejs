<script>
  import io from "socket.io-client";
    import { onMount, onDestroy } from "svelte";
    import toast from "svelte-french-toast";
  let cl = console.log;
  let socket = io("http://localhost:8080"); 
  let gridAnchor;
  let gridNumbersForShowing = [1,2,3,4,5,6,7,8,9,10 ];
  let gridNumbersForReplacingWithAlphabet = [11, 22, 33, 44, 55, 66,77,88,99, 110];
  let alphabetReplacement = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let gridNumbersForNotSettingBoxesAndNotSettingListener = [0, 1,2,3,4,5,6,7,8,9,10, 11, 22, 33, 44, 55, 66,77,88,99, 110];
  let redBoats = [];
  let blueBoats = [];
  let redShots = [];
  let blueShots = [];
  let boatDirection = 0;
  function toggleBoatPlacementDirection() {
    if (boatDirection === 0) boatDirection = 1;
    else if (boatDirection === 1) boatDirection = 0;
  }
  let directionOfBoatPlacement = ["North-South", "East-West"];
  
  let clientGameState = {
      condition: 0, //condition 0 is gamestart -- cond 1 is place boats, cond 2 is ready, waiting for other player, cond 3 is ready to shoot, cond 4 is  shot placed, waiting for server to reply (gameloop 3-4), 5 is game-end
      playerColor: "",
      boats: [],
      shots: [],
  };

  function clientGameStateReset() {
    clientGameState = {
      condition: 0,
      playerColor: "",
      boats: [],
      shots: [],
    }
    sheetGetter();
  }
  function placeCruiser(e) {
    if (boatDirection === 0) {
      blueBoats.push(Number(e));
      blueBoats.push((Number(e) + 11));
      blueBoats.push((Number(e) + 22));      
    } else if (boatDirection === 1) {
      blueBoats.push(Number(e));
      blueBoats.push((Number(e) + 1));
      blueBoats.push((Number(e) + 2));
    }
    placeBoatCruisers(e);
  };
  function placeBoatCruisers(e) { 
    let selectorString, selectorString2, selectorString3;
    if (boatDirection === 0) {
      selectorString = "#game-grid-div-01 > [data-numeration=\"" + e +"\"]";
      selectorString2 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 11) +"\"]";
      selectorString3 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 22) +"\"]";
    } else if (boatDirection === 1) {
      selectorString = "#game-grid-div-01 > [data-numeration=\"" + e +"\"]";
      selectorString2 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 1) +"\"]";
      selectorString3 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 2) +"\"]";
    }
    let styleString = "background-color: #ddd;"
    styleSetup(selectorString, styleString);
    styleSetup(selectorString2, styleString);
    styleSetup(selectorString3, styleString);
  };
  
  function showBoatPlacementShadowCruisers(e) { 
    let selectorString, selectorString2, selectorString3;
    if (boatDirection === 0) {
      selectorString = "#game-grid-div-01 > [data-numeration=\"" + e +"\"]";
      selectorString2 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 11) +"\"]";
      selectorString3 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 22) +"\"]";
    } else if (boatDirection === 1) {
      selectorString = "#game-grid-div-01 > [data-numeration=\"" + e +"\"]";
      selectorString2 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 1) +"\"]";
      selectorString3 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 2) +"\"]";
    }
    let styleString = "background-color: #117766;"
    if (boatDirection === 0) {
      if (!blueBoats.includes(Number(e))) styleSetup(selectorString, styleString);
      if (!blueBoats.includes(Number(e) + 11)) styleSetup(selectorString2, styleString);
      if (!blueBoats.includes(Number(e) + 22)) styleSetup(selectorString3, styleString);
    } else if (boatDirection === 1) {
      if (!blueBoats.includes(Number(e))) styleSetup(selectorString, styleString);
      if (!blueBoats.includes(Number(e) + 1)) styleSetup(selectorString2, styleString);
      if (!blueBoats.includes(Number(e) + 2)) styleSetup(selectorString3, styleString);
    }
  };
  function removeBoatPlacementShadowCruisers(e) { 
    let selectorString, selectorString2, selectorString3;
    if (boatDirection === 0) {
      selectorString = "#game-grid-div-01 > [data-numeration=\"" + e +"\"]";
      selectorString2 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 11) +"\"]";
      selectorString3 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 22) +"\"]";
    } else if (boatDirection === 1) {
      selectorString = "#game-grid-div-01 > [data-numeration=\"" + e +"\"]";
      selectorString2 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 1) +"\"]";
      selectorString3 = "#game-grid-div-01 > [data-numeration=\"" + (Number(e) + 2) +"\"]";
    }
    let styleString = "background-color: #abf"
    if (boatDirection === 0) {
      if (!blueBoats.includes(Number(e))) styleSetup(selectorString, styleString);
      if (!blueBoats.includes(Number(e) + 11)) styleSetup(selectorString2, styleString);
      if (!blueBoats.includes(Number(e) + 22)) styleSetup(selectorString3, styleString);
    } else if (boatDirection === 1) {
      if (!blueBoats.includes(Number(e))) styleSetup(selectorString, styleString);
      if (!blueBoats.includes(Number(e) + 1)) styleSetup(selectorString2, styleString);
      if (!blueBoats.includes(Number(e) + 2)) styleSetup(selectorString3, styleString);
    }
  };
  function placeShot(shotGrid) {
    if (blueShots.includes(Number(shotGrid))) {
      return;
    }
      blueShots.push(Number(shotGrid));
      clientGameState.condition = 4;
      socket.emit("playerShoots", clientGameState.playerColor, shotGrid, (callback) => {
      if (callback.status === "hit") {
        let selectorString = "#game-grid-div-02 > [data-numeration=\"" + shotGrid +"\"]";
        let styleString = "background-color: #3f3"
        styleSetup(selectorString, styleString);
    
      } else if (callback.status === "miss") {
        let selectorString = "#game-grid-div-02 > [data-numeration=\"" + shotGrid +"\"]";
        let styleString = "background-color: #411";
        styleSetup(selectorString, styleString);
      }
      switch(callback.winStatus) {
        case 0: {
          toast("Both players have lost all ships! Game DRAW!");
          endGameDueToWinConditon();
          break;
        }
        case 1: {
          if (clientGameState.playerColor === "blue") toast("You win!");
          else if (clientGameState.playerColor === "red") toast("You lose!");
          endGameDueToWinConditon();
          break;
        }
        case 2: {
          if (clientGameState.playerColor === "blue") toast("You lose!");
          else if (clientGameState.playerColor === "red") toast("You win!");
          endGameDueToWinConditon();
          break;
        }
      }
      });
  }

  function endGameDueToWinConditon() {
    clientGameState.condition = 5;
  }

  let clicker = 0;
  function clickerToResetGame(){
    clicker++;
    if (clicker >= 3) {
      socket.emit("gameStateReset");
      clicker = 0;
    }
  }
  
  //___GRID SETUP 
  function gridSetup(element){
    gridAnchor = document.getElementById(element);
    for (let i = 0; i < 121; i++) {
    let elemDiv = document.createElement("div");
    elemDiv.setAttribute("data-numeration", String(i)); 
    if (element === "game-grid-div-01" && !gridNumbersForNotSettingBoxesAndNotSettingListener.includes(i)) { //blue grid
      elemDiv.addEventListener("mouseover", (e) => {
        if (clientGameState.condition === 1) {
          let shadowPlacementGrid = elemDiv.attributes.getNamedItem("data-numeration").value
          showBoatPlacementShadowCruisers(shadowPlacementGrid); 
        }
      });
      elemDiv.addEventListener("mouseleave", (e) => {
        if (clientGameState.condition === 1) {
          let shadowPlacementGrid = Number(elemDiv.attributes.getNamedItem("data-numeration").value);
          removeBoatPlacementShadowCruisers(shadowPlacementGrid);
        }
      });
      elemDiv.addEventListener("click", () => {
        if (clientGameState.condition === 1) {
          placeCruiser(elemDiv.attributes.getNamedItem("data-numeration").value);
        } else if (clientGameState.condition === 5) {
          clickerToResetGame();
        }
      });
    } else if (element === "game-grid-div-02" && !gridNumbersForNotSettingBoxesAndNotSettingListener.includes(i)) { //red grid
      elemDiv.addEventListener("click", () => {
        if (clientGameState.condition === 3) {
          placeShot(elemDiv.attributes.getNamedItem("data-numeration").value)
        } 
        if (clientGameState.condition === 5) {
          clickerToResetGame();
        }
      })
    }
    if (gridNumbersForShowing.includes(i)) {
      let para = document.createTextNode(String(i));
      elemDiv.appendChild(para);
    }
    if (gridNumbersForReplacingWithAlphabet.includes(i)) {
      let para = document.createTextNode(alphabetReplacement[gridNumbersForReplacingWithAlphabet.indexOf(i)]);
      elemDiv.appendChild(para);
    }
    gridAnchor.appendChild(elemDiv);
    }
  }
  
  let sheetSaved;
  function sheetSaver() {
    sheetSaved = document.styleSheets[0]; 
  }
  function sheetGetter() {
    sheet = sheetSaved;
  }

  let sheet = document.styleSheets[0];
  function styleSetup(selector, declaration) {
    sheet.insertRule(selector+'{'+declaration+'}', sheet.cssRules.length);
  }
  //___ SOCKET STUFF  
  function joinGame() {
    socket.emit("joinGame", callback => {
      if (callback.status === "ok") {
        clientGameState.condition = 1;
        clientGameState.playerColor = callback.playerColor;
      }
      else 
      console.log("response in joinGame ", callback)
    })
  }
  
  socket.on("opposingShot", (opposingShotGrid) => {
      if (clientGameState.boats.includes(opposingShotGrid)) {
        let selectorString = "#game-grid-div-01 > [data-numeration=\"" + opposingShotGrid +"\"]";
        let styleString = "background-color: #faa"
        styleSetup(selectorString, styleString);
      } else if (!clientGameState.boats.includes(opposingShotGrid)) {
        let selectorString = "#game-grid-div-01 > [data-numeration=\"" + opposingShotGrid +"\"]";
        let styleString = "background-color: #232"
        styleSetup(selectorString, styleString);
      }
      clientGameState.condition = 3;
  })
  function markReady() {
    clientGameState.condition = 2;
    socket.emit("playerMarksReady", clientGameState.playerColor, blueBoats, (callback) => {
      console.log("response in markReady in battleships svelte:", callback)
      if (callback.playersReady === 2) {
        clientGameState.condition = 3;
        socket.emit("playersReadyIsTwo");
      }
      else {
        clientGameState.condition = 1;
      }
    })
  }
  socket.on("playersReadyIsTwo", () => { 
      clientGameState.condition = 3;
  })

  socket.on("gameStateResetFromServer", () => {
    clientGameStateReset();
  })
  onMount(() => {
    gridSetup("game-grid-div-01");
    gridSetup("game-grid-div-02");
    styleSetup("#game-grid-div-01 > div:hover", "background-color: green;");
    styleSetup("#game-grid-div-01 > div:active", "background-color: #119988;");
    styleSetup("#game-grid-div-01 > div", "border: 1px #115544 solid");
    styleSetup("#game-grid-div-01 > div", "background-color: #abf");
    styleSetup("#game-grid-div-01 > div", "cursor: default;");
    
    styleSetup("#game-grid-div-02 > div:hover", "background-color: red;");
    styleSetup("#game-grid-div-02 > div:active", "background-color: #991111;");
    styleSetup("#game-grid-div-02 > div", "border: 1px #332233 solid");
    styleSetup("#game-grid-div-02 > div", "background-color: #a8a");
    styleSetup("#game-grid-div-02 > div", "cursor: default;");
    sheetSaver();
  });
  onDestroy(() => {
    socket.removeAllListeners();
    socket.off();
  });
  
  
  
</script>
  <div id="main-battleships-div">
    
    <div id="game-grid-div-01">
    </div>
    <div id="in-between-grid-spacer-div" style="margin:25px">
    </div>
    <div id="game-grid-div-02">
    </div>
    <div>
      <p>Battle Boats!</p>
      {#if clientGameState.condition === 0}
        <button on:click={joinGame}>Join the game!</button>
      {:else if clientGameState.condition === 1} 
        <p>Place all your boats and click ready!</p>
        <button on:click={markReady}>Ready!</button>
        <button on:click={toggleBoatPlacementDirection}>Toggle Direction</button>
        <p>Direction of boat placement is {directionOfBoatPlacement[boatDirection]}. </p>
      {:else if clientGameState.condition === 2}
        <p>Waiting for other player to mark ready.</p> 
      {:else if clientGameState.condition === 3}
        <p>Game ready!</p>
        <p>Use the red grid to fire a shot!</p>
      {:else if clientGameState.condition === 4}
        <p>Stand-by for damage report ...</p>
      {/if}
    </div>
    <div>
      {#if clientGameState.playerColor}
      <p>You are team {clientGameState.playerColor}.</p>
      {/if}
    </div>
  </div> 
    
<style>  
  #main-battleships-div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #708670;
  }
 
  #game-grid-div-01, #game-grid-div-02 {
    display: grid;
    grid-template-rows: repeat(11, 20px);
    grid-template-columns: repeat(11, 20px);
  }
</style>
  