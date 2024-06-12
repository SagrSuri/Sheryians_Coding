const fs = require('fs');

// creating file text.txt and add content
// fs.writeFile('text.txt' , "HELLO WORLD",(err)=>{
//     if(err){console.error(err)
//     }else console.log("text.txt created & added text Done")
// })

// add next content on text.txt
// fs.appendFile('text.txt' , " NEW WORDS",(err)=>{
//     if(err){console.error(err)
//     }else console.log("New word append Done")
// })

// rename
// fs.rename('text.txt' ,'content.txt',(err)=>{
//     if(err){console.error(err)
//     }else console.log("Rename Done")
// })

//making file using rmdir
// fs.mkdir('NewFile', (err)=>{
//     if (err){
//         console.log("Error " , err.message);
//     } else console.log("file created")
// })

//copy the file , note- you need to have a path that is ./copy if it will throw the error
// fs.copyFile('content.txt', './copy/new.txt', (err)=>{
//     if(err){
//         console.log("Error", err.message)
//     }else console.log("file copy successfully")
// })




// delete ./copy/new.txt file
// fs.unlink('./copy/new.txt', (err) => {
//     if(err){
//         console.log("Error", err.message)
//     }else console.log("file deleted Successfully")
// })

// remove only empty dir
// fs.rmdir('NewFile', (err) => {
//     if(err){
//         console.log("Error", err.message)
//     } else console.log("Removed Dir Successfully")
// })

// remove dir if not empty
// fs.rmdir('copy', {recursive: true}, (err)=>{
//     if(err){console.log("Error", err.message)}
//     else console.log("File Removed Forcefully")
// })

const http = require('http');

const server = http.createServer((req, res)=>{
    res.end("HELLO WORLD")
})

server.listen(3000)
