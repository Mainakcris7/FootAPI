const mongoose = require('mongoose')

const footballerSchema = mongoose.Schema({
    name: String,
    nationality: String,
    age: Number,
    image_url: String,
    position: String,
    club: String,
    goals: Number,
    assists: String,
    appearances: String,
    yellow_cards: Number,
    red_cards: Number,
    teams: [String]
})

const FootBaller = mongoose.model('footballer', footballerSchema);

module.exports = FootBaller