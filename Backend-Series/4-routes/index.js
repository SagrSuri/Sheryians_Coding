const express = require('express')

const app = express()

//middleware
app.use((req, res, next)=>{
    console.log("Midleware ka fanda hai")
    next();
})
// middleware 2
app.use((req, res, next)=>{
    console.log("haha mai 2 hun")
    next();
})



// Route
app.get('/', (req, res)=>{
    res.send("HELLO WORLD")
})
app.get('/about', (req, res)=>{
    res.end("ABOUT")
})

app.get('/profile' ,(req, res, next)=>{
    return next(new Error("something wents wrong"))
})
app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send("something broke! Server Down! Server Doun")
})

app.listen(2000)