const getInstructions = (req, res) => {
    res.json(`
    Welcome to the HotShot Tennis API! For instructions on how to use this API
    check out the GitHub repository at this URL: 
    https://github.com/asathiya007/hotshot-tennis-api
    \n\n
    This API provides you with data about your favorite tennis players, 
    such as their name, their playing style, the year they turned pro, the 
    racquet they use, the number of grand slam titles they won, etc. 

    To get the data for all players, send a GET request to this URI: 
    https://hotshot-tennis-api.herokuapp.com/tennis/players
    Example: 
    URI - https://hotshot-tennis-api.herokuapp.com/tennis/players
    Payload - none
    Response - an array of all the tennis players in the database, 
    represented as JSON objects
    [
        {
            "name": "Roger Federer",
            "turned_pro": "1998",
            "plays": "Right-handed, one-handed backhand",
            "country": "Switzerland",
            "racquet": "Wilson Pro Staff",
            "grand_slams": 20,
            "career_high": 1
        },
        {
            "name": "Rafael Nadal",
            "turned_pro": "2001",
            "plays": "Left-handed, two-handed backhand",
            "country": "Spain",
            "racquet": "Babolat Pure Aero",
            "grand_slams": 17,
            "career_high": 1
        },
        ...
    ]

    To get the data for a single player, send a GET request to this URI:
    https://hotshot-tennis-api.herokuapp.com/tennis/players/:player_name
    Example: 
    URI - https://hotshot-tennis-api.herokuapp.com/tennis/players/Roger_Federer
    Response - a JSON object containing the data for the named tennis player
    {
        "name": "Roger Federer",
        "turned_pro": "1998",
        "plays": "Right-handed, one-handed backhand",
        "country": "Switzerland",
        "racquet": "Wilson Pro Staff",
        "grand_slams": 20,
        "career_high": 1
    }

    To add new player data, send a POST reuqest to this URI: 
    https://hotshot-tennis-api.herokuapp.com/tennis/players/:player_name
    and provide the data (year turned pro, playing style, home country, racquet 
    used, grand slam wins, and career high ranking) in JSON form.  
    Example: 
    URI - https://hotshot-tennis-api.herokuapp.com/tennis/players/Roger_Federer
    Payload - a JSON object containing the player data to be added 
    {
        "turned_pro": "1998",
        "plays": "Right-handed, one-handed backhand",
        "country": "Switzerland",
        "racquet": "Wilson Pro Staff",
        "grand_slams": 20,
        "career_high": 1
    }
    Response - a JSON object containing the now-persisted player data
    {
        "name": "Roger Federer",
        "turned_pro": "1998",
        "plays": "Right-handed, one-handed backhand",
        "country": "Switzerland",
        "racquet": "Wilson Pro Staff",
        "grand_slams": 20,
        "career_high": 1
    }

    To edit player data, send a PUT request to the following URI:
    https://hotshot-tennis-api.herokuapp.com/tennis/players/:player_name
    and provide the updated data in JSON form. 
    Example: 
    URI - https://hotshot-tennis-api.herokuapp.com/tennis/players/Rafael_Nadal
    Payload - a JSON object containing the data to be updated
    {
        "grand_slams": 18
    }
    Response - a JSON object containing the entirety of the updated player data
    {
        "name": "Rafael Nadal",
        "turned_pro": "2001",
        "plays": "Left-handed, two-handed backhand",
        "country": "Spain",
        "racquet": "Babolat Pure Aero",
        "grand_slams": 18,
        "career_high": 1
    }

    To remove player data, send a DELETE request to the following URI:
    https://hotshot-tennis-api.herokuapp.com/tennis/players/:player_name
    Example: 
    URI - https://hotshot-tennis-api.herokuapp.com/tennis/players/Roger_Federer
    Payload - none 
    Response - a JSON object containing the removed player data. 
    {
        "name": "Roger Federer",
        "turned_pro": "1998",
        "plays": "Right-handed, one-handed backhand",
        "country": "Switzerland",
        "racquet": "Wilson Pro Staff",
        "grand_slams": 20,
        "career_high": 1
    }

    Good luck with your project, use this API and ace it!

    - Akshay Sathiya, developer of HotShot Tennis API
    `);
}

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
    getInstructions, 
    getPlayers,
    getPlayer
}