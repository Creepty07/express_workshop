const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', (req, res, next) => {
  return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
  return res.status(200).json({ code: 1, message: pkmn });
});

pokemon.get(/^\/\/([0-9]{1,3})$/, async (req, res) => {
  const id = Number(req.params[0]); 

  if (Number.isInteger(id) && id > 0 && id <= 722) {
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id=" + id + ";");
    return res.status(200).json({
      code: 1, message: pkmn
    });
  } else {
    return res.status(404).json({ code: 404, message: "Pokémon no encontrado"});
  }
});

pokemon.get('//:name', async (req, res, next) => {
  const name = req.params.name;

  if (!/^[A-Za-zñÑ\s]+$/.test(name)) {
    return res.status(400).send('Nombre de Pokémon no válido');
  }

  const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='" + name + "';");
  
  return pkmn.length > 0
    ? res.status(200).json({code: 1, message: pkmn})
    : res.status(404).json({ code: 404, message: "Pokémon no encontrado"});

});

module.exports = pokemon;