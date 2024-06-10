const express = require('express')
const app = express()

const PORT = 5000
const HOSTNAME = 'localhost'

app.use(function(req, res , next ){
    console.log("HELLO FROM MIDLEWARE 1");
    next();
})
app.use(function(req, res , next ){
    console.log("HELLO FROM MIDLEWARE 2 RECHECK");
    next();
})

app.get('/', function (req, res) {
  res.send('Thi is first route')
})

app.get('/profile', function (req, res) {
  res.send('This is profile Route checking again')
})


app.listen(PORT, ()=>{
  console.log(`script.js live at http://${HOSTNAME}:${PORT}`)
});