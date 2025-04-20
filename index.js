app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://salmon-stone-067342103.6.azurestaticapps.net');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

const express = require('express'); 

const app = express(); 

 

app.get('/syllabus', (req, res) => { 

  const syllabus = [ 

    { id: 1, firstName: 'Ahmed', lastName: 'El Haddad', CIN: 'A123456' }, 

    { id: 2, firstName: 'Fatima', lastName: 'Ben Ali', CIN: 'B654321' } 

  ]; 

  res.json(syllabus); 

}); 

 

app.listen(process.env.PORT || 3000, () => { 

  console.log('Server running'); 

}); 
