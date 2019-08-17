const express = require("express");
const cors = require("cors");
const knex = require("knex");
const bodyParser = require("body-parser");

const app = express(); 
app.use(cors());
app.use(bodyParser.json());

const db = knex({
    client: "pg",
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'hotshot-tennis'
    }
}); 

app.get("/tennis/players", (req, res) => {
    db.select("*").from("players")
        .then(data => res.json(data))
        .catch(err => res.status(500).json("error in fetching players data"));
}); 

app.get("/tennis/players/:name", (req, res) => {
    let {name} = req.params;
    name = name.replace(/_/g, " "); 

    db.select("*").from("players").where("name", "=", name)
        .then(data => {
            if (data[0]) {
                res.json(data[0]);
            } else {
                res.status(400).json("no such player exists in the database");
            }
        })
        .catch(err => res.status(500).json("error in fetching player data"));
});

app.post("/tennis/players", (req, res) => {
    const {name, turned_pro, plays, country, grand_slams, career_high} = req.body;

    db("players").insert({
        name, turned_pro, plays, country, grand_slams, career_high
    })
        .returning("*")
        .then(data => {
            if (data[0]) {
                res.json(data[0]);
            } else {
                res.status(500).json("error in adding new player data");
            }
        });
});

app.put("/tennis/players/:name", (req, res) => {
    let {name} = req.params;
    name = name.replace(/_/g, " "); 
    const { turned_pro, plays, country, grand_slams, career_high } = req.body;



    db("players").where("name", "=", name).update({
        name, turned_pro, plays, country, grand_slams, career_high
    })
        .returning("*")
        .then(data => {
            if (data[0]) {
                res.json(data[0]);
            } else {
                res.status(400).json("no such player exists");
            }
        })
        .catch(err => res.status(500).json("error updating player data"));
})


app.listen(3001);