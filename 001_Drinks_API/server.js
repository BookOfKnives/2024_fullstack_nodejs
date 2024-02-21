const express = require("express");
const app = express();
const drinks_router = require("./router_drinks_API");

app.use("/api", drinks_router); 

const PORT = 8080;
app.listen(
    PORT, 
    () => { console.log("001 server running on port:", PORT) }
);