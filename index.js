process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const serveStatic = require('serve-static');
const path = require('path');
const router = express.Router();
const app = express();

app.use(serveStatic(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));


const port = 3000;


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
const home = require('./routes/nodemailer')
app.use('/', home)


app.listen(port, () => {
    console.log(`${port}포트로 포트이동중.....`)

})


