const express = require('express') ;
const app =express();
const contactRouter = require('./routes/contact.router')
const userRouter = require('./routes/user.router')
const cookieParser  =require('cookie-parser') ; 



// app.options('*' , (req , res , next)=>{
//     res.header("Access-Control-Allow-Origin" ,'');
//     res.header('Access-Control-Allow-Credentials' ,"true") ;
//     res.header('Access-Control=Allow-Headers' , ["X-Requested-With",'content-type' , 'credentials'])
//     res.header('Access-Control-Allow-Methods' , 'GET,POST');
//     res.status(200)
//     next();
//   })

// req => cp =>ej => req'



app.use(cookieParser())
app.use(express.json()) ;

app.use('/contacts' , contactRouter)
app.use('/user' , userRouter)
app.use('/'  ,(req ,res)=>{
    res.status(200).json('hello')
})


module.exports = app ;
