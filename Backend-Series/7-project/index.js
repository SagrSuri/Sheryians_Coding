const express = require('express')
const app = express();
const path =require('path')
const fs = require('fs');
const { isUtf8 } = require('buffer');
const { render } = require('ejs');

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


// ++++++++++++++HOMEPAGE+++++++++++++++++//
app.get('/', (req, res)=>{
    fs.readdir(`./files`, (err, files) => {
        res.render("index", {files: files})
    })
})

//+++++++++++++++CREATE++++++++++++++++++//
app.post('/create', (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details , (err)=>{
      res.redirect('/')
    })
  })


//+++++++++++++++++++++++READING++++++++++++++//
app.get('/files/:filename', (req , res)=>{
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata)=>{
        res.render('show' ,{filename: req.params.filename , filedata})
    })
})





// ++++++++++++++++++++FILE NAME UPDATE++++++++++++++++++++//
app.get('/edit/:filename', (req , res)=>{
    res.render('edit' ,{filename: req.params.filename})
})
app.post('/edit', (req , res)=>{
   fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, (err)=>{
    if(err){console.log(`ERROR:-`, err.message);
    }else res.redirect('/')
   })
})


//++++++++++++++++DELETE+++++++++++++++++++++//
app.get('/delete/:filename', (req , res)=>{
    res.render('delete' ,{filename: req.params.filename})
})
app.post('/delete' ,(req, res)=>{
    fs.unlink(`./files/${req.body.previous}`, (err)=>{
        if(err){
            console.log('error', err.message)
        }else res.redirect('/')
    })
})

const PORT = 8081
app.listen(PORT, ()=>{
    console.log(`live there http://localhost:${PORT}`)
})