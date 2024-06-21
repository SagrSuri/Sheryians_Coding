const express = require('express')
const app = express();

const userModle = require('./models/user')

const cookieParser = require('cookie-parser');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


app.set('view engine' ,'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname , "public")))
app.use(cookieParser())


app.get('/', (req, res)=>{
    res.render('index');
})
app.post('/create', (req, res)=>{
    let {username, email, age, password} = req.body

    bcrypt.genSalt(10, (err, salt)=>{
       bcrypt.hash(password, salt , async (err, hash)=>{
        let createdUser =  await userModle.create({
            username,
            email,
            password: hash,
            age
           })
       let token =    jwt.sign({email}, 'iamsecretekey')
       res.cookie('token', token)
           res.send(createdUser);
       })
    })
})

app.get('/login', (req , res)=>{
    res.render('login')
})
app.post('/login',async (req , res)=>{
   let user = await userModle.findOne({email: req.body.email})
  if (!user) return res.send(`something went wrong`)

    bcrypt.compare(req.body.password, user.password , (err, result)=>{
        if (result) {
            let token = jwt.sign({email: user.email}, 'iamsecrete')
            res.cookie('token', token)
            res.send("Yes You Can Login")
        }
        else res.send('You can"t Login ')
    })
})

app.get('/logout', (req, res)=>{
    res.cookie('token' , '')
    res.redirect('/')
})


const PORT = 8081
app.listen(PORT, ()=>{
    console.log(`Live at http://localhost:${PORT}`);
})