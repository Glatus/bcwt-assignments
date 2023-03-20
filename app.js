'use strict';
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send("Test");
});

app.get('/cat', (req, res) => {
  res.send('From this endpoint you can get cats.')
});
// POST
app.post('/cat', (req, res) => {
  res.send("With this endpoint you can add cats.")
});

// PUT
app.put('/cat', (req, res) => {
  res.send("With this endpoint you can edit cats.")
});

// DELETE
app.delete('/cat', (req, res) => {
  res.send("With this endpoint you can delete cats.")
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
