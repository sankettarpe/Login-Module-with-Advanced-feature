const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "7d",
    });
};

const registerUser = async(req, res) =>{
    try{
        const {name, email, password, mobile} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message : "Please fill all the details"});
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message : "User already exists"});
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name : name,
            email : email, 
            password : hashedPassword,
            mobile : mobile,
        });
        
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            mobile : user.mobile,
            token : generateToken(user._id),
        });

    }catch(error){
        res.status(500).json({
            message : error.message,
        })
    }
};

const LoginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "Invalid Credentials",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials",
            })
        }
        
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
        })
    } catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const getProfile = async (req, res) =>{
    res.status(200).json(req.user);
}

module.exports = {
    registerUser,
    LoginUser,
    getProfile
}
