const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bodyParser = require("body-parser");

const getData = require("./controllers/getdata");
const addData = require("./controllers/adddata");
const updateData = require("./controllers/updatedata");
const deleteData = require("./controllers/deletedata");

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

const db = knex({
    client: "pg",
    connection: {
        // for local use and testing 
        // host: '127.0.0.1',
        // user: '',
        // password: '',
        // database: 'hotshot-tennis'

        // for heroku deployment 
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
}); 

// endpoint - starting display 
app.get("/", (req, res) => {
    getData.getInstructions(req, res);
})

// endpoint - get all players data
app.get("/tennis/players", (req, res) => {
    getData.getPlayers(req, res, db);
}); 

// endpoint - get specific player data
app.get("/tennis/players/:name", (req, res) => {
    getData.getPlayer(req, res, db);
});

// endpoint - add new player data
app.post("/tennis/players/:name", (req, res) => {
    addData.addPlayer(req, res, db);
});

// endpoint - edit existing player data
app.put("/tennis/players/:name", (req, res) => {
    updateData.updatePlayer(req, res, db);
});

// endpoint - delete player data
app.delete("/tennis/players/:name", (req, res) => {
    deleteData.deletePlayer(req, res, db);
});

app.listen(process.env.PORT || 8080, () => {
    console.log("server is up and running");
});