const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/");
});

app.use("/", express.static(__dirname + "/public/"));

app.listen(4321, () => {
    console.log("The server has been started on http://localhost:4321");
});