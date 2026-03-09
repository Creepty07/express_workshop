const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json')

app.get('/', (req, res, next) => {
  res.status(200);
  res.send("Bienvenido al Pokedex");
});

app.get('/pokemon/all', (req, res, next) => {
  res.status(200);
  res.send(pokemon);
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
  for (i = 0; i < pokemon.length; i++) {
    if(pokemon[i].name == name) {
      res.status(200);
      return res.send(pokemon[i]);
    }
  }
  res.status(404);
  return res.send('Pokémon no encontrado')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at http://localhost:3000`);
});
