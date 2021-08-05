const mongoose = require('mongoose')

const petsSchema = new mongoose.Schema({
  id: {type: String},
  nomeFantasia: {type: String},
  endereco: {type: String},
  telefone: {type: String},
  atende: {type: Array}
},{
    versionkey: false
});

const pets = mongoose.model('pets', petsSchema)

module.exports = pets;