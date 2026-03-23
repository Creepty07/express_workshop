const express = require('express');
const pokemon = express.Router();
const db = require('../config/database')

pokemon.post('/', (req, res, next) => {
  return res.status(201).send(req.body);
});

pokemon.get('/', async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon", );
    return res.status(200).json(pkmn);
});

pokemon.get(/^\/\/([0-9]{1,3})$/, (req, res) => {
  const id = Number(req.params[0]); 
  if (Number.isInteger(id) && id > 0 && id <= pk.length) {
    res.status(200).send(pk[id - 1]);
  } else {
    res.status(404).send("Pokémon no encontrado");
  }
});

pokemon.get('//:name', (req, res, next) => {
  const name = req.params.name;
  if (!/^[A-Za-zñÑ\s]+$/.test(name)) {
    return res.status(400).send('Nombre de Pokémon no válido');
  }
  const pkmn = pk.find(p => p.name.toUpperCase() === name.toUpperCase());
  return pkmn
    ? res.status(200).send(pkmn)
    : res.status(404).send('Pokémon no encontrado');
});

module.exports = pokemon;