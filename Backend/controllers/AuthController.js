const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken")
require("dotenv").config();


const signup = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        console.log("name: ",name);
        
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(400)
            .json({
                message: "user is already exist, you can login",
                success: false
            })
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
        .json({
            message: "Signup Successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        
        res.status(500)
        .json({
            message: "internal server error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = "Auth failed eamil or password is wrong";
        if(!user){
            return res.status(403)
            .json({
                message: errorMsg,
                success: false
            })
        }
        
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
            return res.status(403)
            .json({
                message: errorMsg,
                success: false
            })
        }
        const jwtToken = jwt.sign(
            {
                email: user.email,
                _id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "24h" 
            }
        );

        res.status(200)
        .json({
            message: "Login success",
            success: true,
            jwtToken,
            email,
            name: user.name
        })
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500)
        .json({
            message: "Inernal server error",
            success: false
        })
    }
}
module.exports = {
    signup,
    login
}