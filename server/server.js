const express = require('express');
const compression = require('compression');
const path = require('path');

// Create an Express app
const app = express();
const port = 3000 || process.env.PORT || 3001;

// Compress all HTTP responses
app.use(compression());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../build'), {
  maxAge: '1y',  // Cache for 1 year
  immutable: true
}));

// Handle all requests by sending index.html (single-page app behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

