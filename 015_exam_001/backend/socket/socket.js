let debug = process.argv.includes("debug");
import { cl } from "../util/logger.js";
// import //skal have session middleware her??

let user;
function setSessionUser(sessionUser) {
  user = sessionUser; //bruig en fetch her, methinks. tjek om det virker med at fetche.
}

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
}

function ioSetup(io, sessionMiddleware) {
  setupSocket(io);
  // chatSocket(io);
  io.engine.use(sessionMiddleware);
}
//socket.request.session.nickname for at tilgå session i  socketen
function setupSocket(io) {
  io.on('connection', (client) => {
    if (debug) { cl("connection in socketjs being hit, client id:", client.id) };
    io.emit("onConnectionSendBoardState", krydsOgBolle); 
    
    client.on("transmitGameBoardUserChoice", (...args) => {
      krydsOgBolle[args[0]] = args[1];
      io.emit("serverTransmitGameBoardUpdate", krydsOgBolle); 
      if (debug) { cl("serverTransmitGameBoardUpdate in socketjs being hit, client id:", client.id) };
    });

  });
};
/* 
function chatSocket(io) {
  io.on("connection", (client) => {
    if (debug) { cl("chatSocket connection in socketjs being hit, socket name:", client.id); };
    client.on("chatMessageSentFromUser", (args) => {
      if (debug) { cl("chatMessageSentFromUser connection in socketjs being hit, args, client id", args, client.id) };
      //unfininshed
    });
  });
}
 */
// alt shift A for at udkommentere

// export {setupSocket, chatSocket, setSessionUser};
export {ioSetup, setSessionUser};