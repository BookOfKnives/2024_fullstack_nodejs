import express from "express";
const app = express();
const PORT = process.env.PORT;

console.log(process.env.PORT)

app.listen(PORT, () => {console.log("005_auth server listening on port", server.address().port)})