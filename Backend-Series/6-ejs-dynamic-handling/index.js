const express = require('express')
const path = require('path');


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

// Route
app.get('/', (req, res)=>{
    res.render('index')
})

app.get('/about', (req, res)=>{
    res.render("about")
})

app.get('/:username',(req, res)=>{
    res.send(`Welcome ${req.params.username}`)
})
app.get('/:username/:age',(req, res)=>{
    res.send(`Welcome ${req.params.username} of age ${req.params.age}`)
})


const HOSTNAME = 'localhost'
const PORT = 3000
app.listen(PORT,()=>{
    console.log(`live at http://${HOSTNAME}:${PORT}`)
})