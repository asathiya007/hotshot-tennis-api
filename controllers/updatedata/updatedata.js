const updatePlayer = (req, res, db) => {
    let { name } = req.params;
    name = name.replace(/_/g, " ");
    const { turned_pro, plays, country, racquet, grand_slams, career_high } = req.body;

    db("players").where("name", "=", name).update({
        name, turned_pro, plays, country, racquet, grand_slams, career_high
    })
        .returning("*")
        .then(data => {
            if (data[0]) {
                res.json(data[0]);
            } else {
                res.status(400).json("no such player exists in the database");
            }
        })
        .catch(err => res.status(500).json("error updating player data"));
}

module.exports = {
    updatePlayer
}