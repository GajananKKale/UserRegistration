import {User} from "../modules/usermodule.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
let jwtKey = "iamyou";
let hashedPassword = async (password) =>{
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword
}


let getUsers = async(req,res)=>{
    try {
        let user = await User.find({})
        res.status(200).json({message:"Users fetched successfully" , user:user})
    } catch (error) {
        // console.log(error);
        res.status(500).json({message:error})
    }
}

let getOneUser = async(req,res)=>{
    try {
        let id = req.params.id
        let user = await User.findOne({_id:id})
        res.status(500).json({message:"user fetched you." , user:user})
    } catch (error) {
          res.status(500).json({message:error})
    }
}

let addUser = async(req,res) =>{
    try {
        let {username,email,password,mobile} = req.body
        let securePassword = await hashedPassword(password)
        // console.log(securePassword);

        let newUser =  await User.create({
            username,email,mobile,password:securePassword
        })
        res.status(201).json({message:"user added Successully",user : newUser})
    } catch (error) {
        // console.log(error);  
        res.status(500).json({message:error})
    }
}

let deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


let updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let { username, email,mobile } = req.body;

        let updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email,mobile },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// login 
let login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 2. Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Generate JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            jwtKey,
            { expiresIn: "24h" }
        );

        // 4. Return the token in response
        return res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                mobile:user.mobile
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


export {
getUsers,
getOneUser,
addUser,
deleteUser,
updateUser,
login
}