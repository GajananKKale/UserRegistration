import mongoose from "mongoose";

let userShcema =  mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    
  mobile: {
  type: String,
  required: true,
  match: [/^\d{10}$/, "Mobile number must be exactly 10 digits"],
}
,
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user' 
        }
})

let User = mongoose.model("User",userShcema)
export {User}