const express = require('express')
const app = express()

app.set('view engine','ejs')
app.use(express.static("public"))

app.get('/', function (req, res) {
  res.render('index')
})


// server live
const PORT = 3000
const HOSTNAME = 'localhost'
app.listen(PORT, function(){
  console.log(`server live at http://${HOSTNAME}:${PORT}`)
})