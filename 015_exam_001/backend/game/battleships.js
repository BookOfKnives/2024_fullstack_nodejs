import Router from "express";
const router = Router();

let gameState = {
    players: {
        playerOne: {
            playerColor: "",
            shots: [],
            boats: [],
        },
        playerTwo: {
            playerColor: "",
            shots: [],
            boats: [],
        },
    },
};
let gameConfig = {
    boatsConfig: {
        cruisers: {
            size: 3,
            numberAvailableToPlayer: 2
        },
        battleships: {
            size: 5,
            numberAvailableToPlayer: 1
        }
    }
}

function gameStateReset() {
    gameState = {
        players: {
            playerOne: {
                playerColor: "",
                boats: [],
                shots: [],
            },
            playerTwo: {
                playerColor: "",
                boats: [],
                shots: [],
            },
        },
    };
}

console.log("battleship router online");
export default router;