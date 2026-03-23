const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
API REST
GET - Obtener información
POST - Crear un nuevo recurso
PATCH - Actualizar parcialmente un recurso existente
PUT - Actualizar un recurso existente
DELETE - Eliminar un recurso existente
*/

app.get('/', (req, res, next) => {
  res.status(200).send("Bienvenido al Pokedex");
});

app.post('/pokemon', (req, res, next) => {
  return res.status(201).send(req.body);
});

app.get('/pokemon', (req, res, next) => {
  res.status(200).send(pokemon);
});

app.get(/^\/pokemon\/([0-9]{1,3})$/, (req, res) => {
  const id = Number(req.params[0]); 
  if (Number.isInteger(id) && id > 0 && id <= pokemon.length) {
    res.status(200).send(pokemon[id - 1]);
  } else {
    res.status(404).send("Pokémon no encontrado");
  }
});

app.get('/pokemon/:name', (req, res, next) => {
  const name = req.params.name;
  if (!/^[A-Za-zñÑ\s]+$/.test(name)) {
    return res.status(400).send('Nombre de Pokémon no válido');
  }
  const pk = pokemon.find(p => p.name.toUpperCase() === name.toUpperCase());
  return pk
    ? res.status(200).send(pk)
    : res.status(404).send('Pokémon no encontrado');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at http://localhost:3000`);
});
