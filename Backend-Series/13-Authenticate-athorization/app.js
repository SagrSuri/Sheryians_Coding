const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(cookieParser())

// app.get('/', (req, res)=>{
//     res.cookie('name', 'sagar')
//     res.send('HOME')
// })

app.get('/', (req, res)=>{
 
 let token = jwt.sign({email: "sagar@gmail.com"}, 'secret')
 console.log(token);
 res.cookie("token", token)
 res.send(`done`)
  // bcrypt.genSalt(10, (err, salt)=>{
  //   bcrypt.hash("iampassword", salt,(err, hash)=>{
  //       console.log(hash)
  //   })
  // })
})

app.get('/read', (req, res)=>{
    // console.log(req.cookies.token)
    let data = jwt.verify(req.cookies.token , 'secret')
    console.log(data)
})

app.listen(8081)