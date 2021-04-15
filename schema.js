const mongoose = require('mongoose')

const schemabis = mongoose.Schema({
    puissance: String,
    prix : String,
    type : String,
    name: String
})

module.exports = mongoose.model('Motos', schemabis);