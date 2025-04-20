const express = require('express'); 

const app = express(); 

 

app.get('/sylabus', (req, res) => { 

  const consultants = [ 

    { id: 1, firstName: 'Ahmed', lastName: 'El Haddad', CIN: 'A123456' }, 

    { id: 2, firstName: 'Fatima', lastName: 'Ben Ali', CIN: 'B654321' } 

  ]; 

  res.json(consultants); 

}); 

 

app.listen(process.env.PORT || 3000, () => { 

  console.log('Server running'); 

}); 
