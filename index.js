const express = require('express');
const app = express();
//comment
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});



app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});
