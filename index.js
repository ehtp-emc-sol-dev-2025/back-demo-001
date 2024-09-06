const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/consultants', (req, res) => {
  const consultants = [
    { id: 1, firstName: 'John', lastName: 'Doe', CIN: 'A123456' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', CIN: 'B654321' },
    { id: 3, firstName: 'Sam', lastName: 'Green', CIN: 'C987654' },
  ];
  res.json(consultants);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
