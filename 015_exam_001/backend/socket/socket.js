let debug = process.argv.includes("debug");
import { cl } from "../util/logger.js";


let krydsOgBolle = {
  0: undefined, 
  1: undefined, 
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
  7: undefined,
  8: undefined,
};

function ioSetup(io, sessionMiddleware) {
  setupSocket(io);
  io.engine.use(sessionMiddleware);
};
function setupSocket(io) {
  io.on('connection', (client) => {
    
    if (debug) { 
      cl("connection in socketjs, client id:", client.id);
      console.log("socket  connetion sess:", client.request.session); //husk at differentiere dine konsol logs -- tid, sted, id
      // console.log("socket  connetion USER:", client.request.session.user);
    };

    io.emit("onConnectionSendBoardState", krydsOgBolle); 
    
    client.on("transmitGameBoardUserChoice", (...args) => {
      krydsOgBolle[args[0]] = args[1];
      io.emit("serverTransmitGameBoardUpdate", krydsOgBolle); 
      if (debug) { cl("serverTransmitGameBoardUpdate in socketjs, client id:", client.id) };
    });

    client.on("chatMessageSentFromUser", (...args) => {
      io.emit("chatMessageSentFromServer", args[0], client.request.session.user.username );
    });

  });
};

// alt shift A for at udkommentere

export { ioSetup };