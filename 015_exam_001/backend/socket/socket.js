import "dotenv/config"
import { myLogger as l } from '../util/logger.js'
import chalk from 'chalk'
const debug = process.argv.includes('debug')

// SÆNKE SLAGSKIBE configuration
let gameState = {
  playersReady: 0,
  players: {
    playerOne: {
      playerColor: '',
      shots: [],
      boats: []
    },
    playerTwo: {
      playerColor: '',
      shots: [],
      boats: []
    }
  }
}

function gameStateReset () {
  gameState = {
    playersReady: 0,
    players: {
      playerOne: {
        playerColor: '',
        boats: [],
        shots: []
      },
      playerTwo: {
        playerColor: '',
        boats: [],
        shots: []
      }
    }
  }
}

function checkGameStateForWinCondition () {
  let hasBlueShotAllRedBoats = false
  let hasRedShotAllBlueBoats = false
  hasBlueShotAllRedBoats = gameState.players.playerTwo.boats.every((boatGrid) => gameState.players.playerOne.shots.includes(boatGrid))
  hasRedShotAllBlueBoats = gameState.players.playerOne.boats.every((boatGrid) => gameState.players.playerTwo.shots.includes(boatGrid))

  if (hasBlueShotAllRedBoats && hasRedShotAllBlueBoats) return 0 // draw -- both have lost all boats
  else if (hasBlueShotAllRedBoats && !hasRedShotAllBlueBoats) return 1 // blue wins
  else if (!hasBlueShotAllRedBoats && hasRedShotAllBlueBoats) return 2 // red wins
  else return 3 // no one has won, game keeps going
}

// KRYDS OG BOLLE Config
const krydsOgBolle = {
  0: undefined,
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined
}

function ioSetup (io, sessionMiddleware) {
  setupSocket(io)
  io.engine.use(sessionMiddleware)
};
function setupSocket (io) {
  io.on('connection', (socket) => {
    l.dl()
    l.cl('socket connect, id:', chalk.cyan(socket.id))
    socket.on('disconnect', () => {
      l.dl()
      l.cl('socket DISCONNECT, id:', chalk.blue(socket.id))
    })

    // ___Kryds og bolle STUFF
    io.emit('onConnectionSendBoardState', krydsOgBolle)
    socket.on('transmitGameBoardUserChoice', (...args) => {
      krydsOgBolle[args[0]] = args[1]
      io.emit('serverTransmitGameBoardUpdate', krydsOgBolle)
      if (debug) { console.log('serverTransmitGameBoardUpdate in socketjs, socket id:', chalk.cyan(socket.id)) };
    })

    // ___CHAT Stufff 
    socket.on('chatMessageSentFromUser', (...args) => {
      io.emit('chatMessageSentFromServer', args[0], socket.request.session.username)
    })

    //___ SERVER stuff
    socket.on("getUser", (callback) => {
      const user = {
        user: socket.request.session.username,
        roles: socket.request.session.roles ?? []
      }
      callback({user});
    })

    // ___Sænke Slagskibe stuff
    socket.on('joinGame', (callback) => {
      if (!gameState.players.playerOne.playerColor) {
        gameState.players.playerOne.playerColor = 'blue'
        callback({
          status: 'ok',
          playerColor: 'blue'
        })
      } else if (gameState.players.playerOne.playerColor && !gameState.players.playerTwo.playerColor) {
        gameState.players.playerTwo.playerColor = 'red'
        callback({
          status: 'ok',
          playerColor: 'red'
        })
      } else {
        callback({
          status: 'full'
        })
      }
    })

    socket.on('playerMarksReady', (playerTeam, boats, callback) => {
      if (playerTeam === 'blue') {
        gameState.players.playerOne.boats = boats
        gameState.playersReady++
      } else if (playerTeam === 'red') {
        gameState.players.playerTwo.boats = boats
        gameState.playersReady++
      }
      callback({
        status: 'ok-cond-3',
        player: playerTeam,
        playersReady: gameState.playersReady
      })
    })

    socket.on('playersReadyIsTwo', () => {
      io.emit('playersReadyIsTwo')
    })

    socket.on('playerShoots', (playerTeam, shotGrid, callback) => {
      const hitCoord = Number(shotGrid)
      let boatGrid
      if (playerTeam === 'blue') {
        boatGrid = gameState.players.playerTwo.boats
        gameState.players.playerOne.shots.push(hitCoord)
      } else if (playerTeam === 'red') {
        boatGrid = gameState.players.playerOne.boats
        gameState.players.playerTwo.shots.push(hitCoord)
      }
      socket.broadcast.emit('opposingShot', hitCoord)
      const winStatus = checkGameStateForWinCondition()
      if (boatGrid.includes(hitCoord)) {
        callback({
          status: 'hit',
          winStatus
        })
      } else {
        callback({
          status: 'miss',
          winStatus
        })
      }
    })
    socket.on('gameStateReset', () => {
      gameStateReset()
      socket.emit('gameStateResetFromServer')
    })
  })
};

const timeOptions = {
  timeZone: 'Europe/Copenhagen',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
}
const dl = () => { return new Date().toLocaleTimeString('da-DK', timeOptions) }

// alt shift A for at udkommentere

export { ioSetup }
