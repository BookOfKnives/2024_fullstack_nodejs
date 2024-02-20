const express = require("express");
const app = express();

const PORT = 8080;
app.listen(
    PORT, 
    () => { console.log("001 drinks api server running on", PORT) }
);