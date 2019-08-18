const addPlayer = (req, res, db) => {
    let { name } = req.params;
    name = name.replace(/_/g, " ");
    const { turned_pro, plays, country, racquet, grand_slams, career_high } = req.body;

    db("players").insert({
        name, turned_pro, plays, country, racquet, grand_slams, career_high
    })
        .returning("*")
        .then(data => {
            if (data[0]) {
                res.json(data[0]);
            } else {
                res.status(400).json("cannot add new player data, please provide proper data");
            }
        })
        .catch(err => res.status(500).json("error in adding new player data"));
}

module.exports = {
    addPlayer
}