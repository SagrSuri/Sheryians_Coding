const express = require('express')
const app = express()

const userModle = require('./usermodle')

PORT = 8081
app.get('/', (req, res)=>{
    res.send(`HELLO`)
})

//+++++++++++++CREATE+++++++++++++++++//
app.get('/create',async (req, res)=>{
 let createdUser = await userModle.create({
    name: "Dhanuklal",
    email: "Dhanuklal@gmail.com",
    username: "Dhanuklal",
    contact: "8380814334"
   })
   res.send(createdUser);
})


// ++++++++++++++++++++UPDATE++++++++++++++++//
app.get('/update',async (req, res)=>{
    let updateUser = await userModle.findOneAndUpdate({username: 'Dhanuklal'}, {name: 'DHANUKLAL SURI' , username: 'dhanuklal'}, {new: true} )
      res.send(updateUser);
   })

// ++++++++++++++++++READ All & Single+++++++++++++++++//
app.get('/read', async (req, res)=>{
    let Users = await userModle.find()
    res.send(Users)
})

// ============sigle=============//
app.get('/user', async (req, res)=>{
    let Users = await userModle.find({username: "Dhanuklal"})
    res.send(Users)
})


//+++++++++++++++DELETE+++++++++++++++++++++//
app.get('/delete', async(req, res)=>{
    let deleteUser = await userModle.findOneAndDelete({username: 'Utrabai'})
    res.send(deleteUser)
})


app.listen(PORT, ()=>{
    console.log(`Live on http://localhost:${PORT}`)
})