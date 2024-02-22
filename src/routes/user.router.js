const express=  require('express') ; 
const {registerUser , loginUser , authUser , getUser}  = require('../controller/user.controller')
const userRouter = express.Router() ; 

userRouter.post('/newuser' , registerUser);


userRouter.post('/login' , loginUser);

userRouter.get('/secured' , authUser  ,(req , res)=>{
     
    res.json('secured enter')
})

userRouter.get('/getuser' , authUser , getUser)

module.exports = userRouter ; 



