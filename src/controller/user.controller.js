const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config;




const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("give all parameters");
  }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json("user already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save(), res.status(201).json("new user created");
    console.log(await bcrypt.compare(hashedPassword, password));
  } catch (err) {
    //res.status(500).json(err)
    console.log(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Missing email or password",
        data: req.body,
      });
    }

    const searchedUser = await User.findOne({ email });

    if (!searchedUser) {
      res.status(400).json({
        success: false,
        error: true,
        message: "no user found",
        data: req.body,
      });
    }

    if (!(await bcrypt.compare(password, searchedUser.password))) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Wrong Password",
        data: req.body,
      });
    }

    const token = jwt.sign({ _id: searchedUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, maxAge:  60 * 60 * 1000 });
    return res.status(201).json({
      success: true,
      error: false,
      message: "user logged in",
      token: token,
    });
  } catch (err) {
    console.error(err);
  }
};






const authUser =async (req , res , next)=>{
    //req.user add karna req request 
    const cookie = req.cookies['token']

    try{
        const claims= jwt.verify(cookie ,process.env.SECRET)
        if(!claims){
            return res.status(401).json({ success: false, error: true, message: 'Login First' })
            
        }

        const user = await User.findOne( new ObjectId(claims._id)) ; 

        req.user = user
        const {password ,...userminusPassword} = user ; 

       
        // res.json({ success: true, error: false, message: 'User Authorized'  , data : userminusPassword })
    }
    catch(err){
        // res.status(500).json({ success: false, error: true, message: 'Internal Server Error' })
        console.log(err)
    } 

    next() ; 
  
}


const getUser = async (req , res) =>{
    const userEmail = await req.user.email ;
    res.status(200).json({email : req.user.email})
}
const authOptions = async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
};

module.exports = { registerUser, loginUser , authUser , getUser };
