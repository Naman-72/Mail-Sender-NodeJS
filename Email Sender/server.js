const fs = require('fs')
const path = require('path')
const express = require('express');
const app = express()
const PORT = 3001
const nodemailer = require('nodemailer');
const credentials = require('./credentials')
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    // res.send("Hello World")
    res.sendFile(path.join(__dirname,'index.html'));
})

app.get('/send',(req,res)=>{
    // res.send(req.query)
    let email = req.query.Email1
    let subject = req.query.Subject
    let message = req.query.Message
    // console.log(email+' '+message)
    const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // use SSL
        auth:{
            user:credentials.user,
            pass:credentials.pass
        }
    })
    mail.sendMail({
        from:'sahagarima844@gmail.com',
        to:email,
        subject:subject,
        html:'<H4 style="color:blue">'+ message+ '</H4>'
    },(err)=>{
        if(err)
         throw err;        
        // res.send("Mail Sent Successfully")
        res.redirect('/')
    })
})

app.listen(PORT,(err)=>{
    if(err)
        throw err;
    console.log(`Running At http://localhost:${PORT}`)
})
