const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const consultants = [
    { id: 1, firstName: 'John', lastName: 'Doe', CIN: 'A123456' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', CIN: 'B654321' },
    { id: 3, firstName: 'Sam', lastName: 'Green', CIN: 'C987654' },
  ];

app.get('/consultants', (req, res) => {
  res.json(consultants);
});




app.get('/health-check', async (req, res) => {
   res.status(202).send('OK')
});


app.get('/consultants/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const consultant = consultants.find(c => c.id === id);

  if (consultant) {
    res.json(consultant);
  } else {
    res.status(404).send('Consultant not found');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});
