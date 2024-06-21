const express = require('express');
const app = express()
const path = require('path')
const userModle = require('./models/user.js')
PORT = 8081

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.render('index')
})

// ----------View the user------------//
app.get('/read',async (req, res)=>{
   let users =  await userModle.find()
    res.render('read' , {users})
})

// --------Edit------------//
app.get('/edit/:userid',async (req, res)=>{
    let user = await userModle.findOne({_id: req.params.userid})
    res.render('edit', {user})
 })

//  ----Update-----//
 app.post('/update/:userid',async (req, res)=>{
    let {image, name, email} = req.body
    let user = await userModle.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {new: true})
    res.redirect('/read')
 })

//------------Create the User --------------//
app.post('/create', async (req, res)=>{

    let {name, email, image} = req.body

   let createdUser = await userModle.create({
     name,
     email,
     image
   })
  res.redirect('/read')
})

// ---------DELETE---------------//
app.get('/delete/:id', async(req, res)=>{
    let users = await userModle.findOneAndDelete({_id: req.params.id})
    res.redirect('/read')
})


app.listen(PORT,()=>{
    console.log(`THE LIVE AT http://localhost:${PORT}`)
})