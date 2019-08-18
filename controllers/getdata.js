const getPlayers = (req, res, db) => {
    db.select("*").from("players")
        .then(data => res.json(data))
        .catch(err => res.status(500).json("error in fetching players data"));
}

const getPlayer = (req, res, db) => {
    let { name } = req.params;
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
}

module.exports = {
    getPlayers,
    getPlayer
}