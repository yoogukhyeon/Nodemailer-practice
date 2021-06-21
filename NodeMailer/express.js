const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/main' , (req, res) => {
    fs.readFile('hello.html', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
            res.end(data)
        }
    })
})



app.get('/img' , (req, res) => {
    fs.readFile('test.png', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'Content-Type' : 'image/png'}); //image/png or jpg
            res.write(data)
            res.end()
        }
    })
})

app.listen(port , () => {
    console.log(`${port}포트 포트로 포트 이동중....`)
})