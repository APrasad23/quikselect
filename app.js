const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Endpoint to mark the report as final
app.post('/api/finalize', (req, res) => {
  const { user, timestamp } = req.body;
  console.log(`Report finalized by ${user} on ${timestamp}`);
  
  // Here you can add logic to store this information in a database

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
