const express = require('express')
const app = express()
const port = 3000

// Serve static files from the public folder
app.use(express.static('public'))

// Serve the index.pug template as the home page
app.get('/', (req, res) => {
  res.render('index')
})
app.set('view engine', 'pug')


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get("/catinfo", (req, res) => {
  const cat = {
    name: "Frank",
    birthdate: "2010-12-25",
    weight: 5,
  };
  res.json(cat);
});