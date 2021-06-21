"use scrict";

const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();



router.get("/" , (req , res) => {
    res.render('index')
})

router.post("/mail_ok", (req , res) => {


    const userid = req.body.userid;
    const sendmail = req.body.sendmail;
    const touserid = req.body.touserid;
    const tomail = req.body.tomail;
    const title = req.body.title;
    const content = req.body.content;

    const fmtfrom = `${userid}<${sendmail}>`;
    const fmtto = `${touserid}<${tomail}`;

    const transpoter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user : 'rnrgus5897@gmail.com',
            pass: 'dkswoah589318'
        },
        host: 'smtp.mail.com',
        port: '465'
    });

    const mailOption = {
        from: fmtfrom,
        to: fmtto,
        subject: title,
        html: content
    };


    transpoter.sendMail(mailOption , (err, infor) => {
        if(err){
            console.log(err);
        }else{
            console.log(infor);      
        }
    })
    transpoter.close();
    // res.redirect('/');



    const userinfo = {userid : userid, sendmail : sendmail, touserid : touserid , tomail : tomail , title : title, content : content}

        fs.readFile('./views/mail_ok.ejs' , 'utf-8' , (err, data) => {
            if(err){
                console.log(err);
            }else{
                res.writeHead(200, {'content-type' : 'text/html'});
                res.end(ejs.render(data , userinfo));
            }
    });


})


module.exports = router;
