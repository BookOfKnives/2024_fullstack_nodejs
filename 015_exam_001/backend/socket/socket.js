let debug = false;
function debugSocket(debugSet) {
  debug = debugSet;
};

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
function setupSocket(io) {
  io.on('connection', (client) => {
    if (debug) { console.log("connection in socketjs being hit") };
    io.emit("onConnectionSendBoardState", krydsOgBolle); 
    
    client.on("transmitGameBoardUserChoice", (...args) => {
      krydsOgBolle[args[0]] = args[1]; // clear this
      io.emit("serverTransmitGameBoardUpdate", krydsOgBolle); //clear this
      if (debug) { console.log("serverTransmitGameBoardUpdate in socketjs being hit") };
    });

  });
};

export {setupSocket, debugSocket};