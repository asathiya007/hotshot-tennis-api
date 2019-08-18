const deletePlayer = (req, res, db) => {
    let { name } = req.params;
    name = name.replace(/_/g, " ");

    db("players").where("name", "=", name).del()
        .returning("*")
        .then(data => {
            if (data[0]) {
                res.json(data[0]);
            } else {
                res.status(400).json("no such player exists in the database");
            }
        })
        .catch(err => res.status(500).json("error deleting player data"));
}

module.exports = {
    deletePlayer
}