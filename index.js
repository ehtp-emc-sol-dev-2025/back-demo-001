const express = require('express'); 

const app = express(); 

// Endpoint to get consultants
app.get('/consultants', (req, res) => { 
  try {
    // Simulated consultants data
    const consultants = [ 
      { id: 1, firstName: 'Ahmed', lastName: 'El Haddad', CIN: 'A123456' }, 
      { id: 2, firstName: 'Fatima', lastName: 'Ben Ali', CIN: 'B654321' } 
    ]; 

    res.json(consultants); 
  } catch (error) {
    console.error('Error fetching consultants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
