import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export const signup = async(req, res) => {
    try {
        const { fullname, email, password ,role } = req.body;


        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }


        const hashPassword = await bcryptjs.hash(password, 10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            role:role,
        });


       
        await createdUser.save();


        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    


        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } 

        const SECRET_KEY = process.env.JWT_SECRET || "your_fallback_secret";
        const token = jwt.sign(
            { id: user._id, role: user.role || "user" },  // include role for admin checks
            SECRET_KEY,
            { expiresIn: "1d" }
          );





            res.status(200).json({
                message: "Login successful",
                token, 
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role:user.role,
                },
            });
        
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};