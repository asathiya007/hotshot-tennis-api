const express = require("express");
const cors = require("cors");

const app = express(); 
app.use(cors());

app.get("/tennis/players", (req, res) => {
    res.json("this is working");
}); 

app.listen(3001);