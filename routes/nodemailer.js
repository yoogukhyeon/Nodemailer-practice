"use scrict";
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const router = express.Router();

//import 연결
const { connectDB } = require('../database/MongdDB');



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

    
    insertEmail(req,res,userid, sendmail, touserid, tomail, title, content);      
})


const Email = function(database , userid , sendmail , touserid , tomail ,title , content, callback){
    console.log('Email 호출에 성공했습니다!!');

    database.collection('email').insertOne({userid:userid, sendmail: sendmail , touserid : touserid , tomail : tomail , title: title, content : content}, (err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.insertedCount > 0 ){
                console.log(`이메일 ${result.insertedCount}정보가 추가되었습니다`);
            }else{
                console.log('사용자 documnet 추가되지 않았습니다');
            }
            callback(null,result);
        }
    })
}

function insertEmail(req,res,userid, sendmail, touserid, tomail, title, content){
    var databaseURL = "mongodb://localhost:27017";
    MongoClient.connect(databaseURL, {useUnifiedTopology : true}, (err , db) => {
        
        if(err){
            console.log("Email database 연결성공")
            console.log(err)
        }else{
            const temp = db.db('frontend');
            database = temp;
            console.log('mongodb 데이터베이스 연결 성공!');
            Email(database , userid, sendmail, touserid, tomail, title, content, (err, result) => {
                if(err){
                    console.log('데이터베이스 연결 실패');
                }else{
                    if(result.insertedCount > 0){
                        console.log('Email 등록 성공!');
                        const userinfo = {userid : userid, sendmail : sendmail, touserid : touserid , tomail : tomail , title : title, content : content}

                        fs.readFile('./views/mail_ok.ejs' , 'utf-8' , (err, data) => {
                            if(err){
                                console.log(err);
                            }else{
                                res.writeHead(200, {'content-type' : 'text/html'});
                                res.end(ejs.render(data , userinfo));
                            }
                    });
            
                    }else{
                        console.log(err);
                    }
                }
            })
        }
    });
}

module.exports = router;























