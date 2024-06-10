// ---------------Importing Outside of JS file-----------/
const express = require('express')
const app = express()


// -------------Midleware-------------/
app.use(function(req, res, next){
    console.log("HELLO I AM MIDLEWARE");
    next()
})

// --------------Route----------------/
app.get('/', function(req, res){
    res.render("index", {heading: "WELCOM"});
    console.log("1st route working")
})
app.get('/profile', function(req, res){
    res.send("I Am PROFILE");
    console.log("2nd route working")
})
app.get('/contact', function(req, res){
    res.send("I Am Contact");
    console.log("3rd route working")
})

// ------------- Ejs copy--------------/
app.set("view engine", "ejs")

// ---------------dynamic url make -------------/
app.get('/:username', function(req, res){
    res.send(`HELLO FROM ${req.params.username}`);

})


// -----------Localhost-------------/
const PORT = 8055
const HOSTNAME = 'localhost'
app.listen(PORT, ()=>{
    console.log(`Server live on http://${HOSTNAME}:${PORT}`)
});


//------------for public-----------//
app.use(express.static('./public'))