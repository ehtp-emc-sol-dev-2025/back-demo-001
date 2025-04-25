const express = require('express');
const app = express();
const port = 3000;

// Importer les données de Fès
const fesData = require('./api/ville/fes');

// Endpoint pour renvoyer les données de la ville de Fès
app.get('/api/ville/fes', (req, res) => {
  res.json(fesData);
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
