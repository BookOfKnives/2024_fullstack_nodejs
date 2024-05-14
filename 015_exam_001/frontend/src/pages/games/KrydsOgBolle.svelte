<script>
    import io from "socket.io-client";
    import { onDestroy, onMount } from "svelte";
    import { debug } from "../../stores/generalStore.js";
    let symbols = [
        "O",
        "X",
        ""
    ]
    let playerChosenSideSymbol = "";
    const socket = io("http://localhost:8080/");
    

    socket.on("onConnectionSendBoardState", (...args) => {
        if ($debug) console.log("onConnectionSendBoardState being hit in krydsogbolle.svelte");
       updateGameBoardState(args[0]);
    })
    function transmitGameBoardUserChoice(data) {
        if ($debug) console.log("transmitGameBoardUserChoice being hit in krydsogbolle.svelte");

        socket.emit("transmitGameBoardUserChoice", data, playerChosenSideSymbol)
    }
    function cellGameLogicSetup() {
        if ($debug) console.log("cellGameLogicSetup being hit in krydsogbolle.svelte");
        let coll = document.getElementById("grid-container-div").children;
        let arrayOfCells = Array.from(coll);
        arrayOfCells.map((cell) => {
            cell.addEventListener("click", () => {
                transmitGameBoardUserChoice(cell.attributes.getNamedItem("data-numeration").value);
            });
        })
    }
    socket.on("serverTransmitGameBoardUpdate", (...args) => {
        updateGameBoardState(args[0]);
    })

    function updateGameBoardState(updateData){
        let coll = document.getElementById("grid-container-div").children;
        let arrayOfCells = Array.from(coll);
        for (let i = 0; i < arrayOfCells.length; i++) {
            arrayOfCells[i].textContent = updateData[i];
        }
    }
    onMount(() => {
        cellGameLogicSetup();
    })
    onDestroy(() => {
        socket.disconnect();
    });
</script>
<h3>Welcome to Kryds And Bolle!</h3>
<div id="grid-container-div">
    <div id="cell-0" data-numeration="0"></div>
    <div id="cell-1" data-numeration="1"></div>
    <div id="cell-2" data-numeration="2"></div>
    <div id="cell-3" data-numeration="3"></div>
    <div id="cell-4" data-numeration="4"></div>
    <div id="cell-5" data-numeration="5"></div>
    <div id="cell-6" data-numeration="6"></div>
    <div id="cell-7" data-numeration="7"></div>
    <div id="cell-8" data-numeration="8"></div>
</div>

<br>
<div id="controlPanel">
    <p>Choose your side:</p>
    {#each symbols as symbol}
    <label for="controlPanel"><p>
    <input type="radio" value={symbol} bind:group={playerChosenSideSymbol} name="playerSide" id="playerSide">
        I play for the {symbol} side!</p>
    </label>
    {/each}
</div>

<style>
    #grid-container-div {
        display: grid;
        grid-template-rows: 90px 90px 90px;
        grid-template-columns: 90px 90px 90px;
        color: red;
        

    }
    #grid-container-div > div {
        background-color: green;
        border: 4px darkgreen solid;
        cursor:default;
        text-align: center;
        padding-top: 20%;
        font-size: 40px;
    }

    #grid-container-div > div:hover {
        background-color: blue;
        border: 4px darkgreen dotted;
    }
    #grid-container-div > div:active {
        background-color: darkblue;
        border: 4px rgb(6, 40, 6) dotted;
    }
    #controlPanel {
        background-color: orange;
    }
</style>