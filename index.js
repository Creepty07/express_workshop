const express = require('express');
const app = express();
const morgan = require('morgan');
const pokemon = require('./routes/pokemon')

app.use(morgan('dev'));
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
  res.status(200).json({ code: 1, message: "Bienvenido al Pokedex" });
});

app.use("/pokemon", pokemon);

app.use((req, res, next) => {
    return res.status(404).json({
      code: 404,
      message: "URL no encontrada"
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening at http://localhost:3000`);
});
