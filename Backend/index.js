import dotenv from 'dotenv'
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
let app = express()
import {router} from "./routes/routes.js"
import path from "path"
dotenv.config()

let PORT = process.env.port

let _dirname = path.resolve()

//middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json())

app.use("/api",router)



app.use(express.static(path.join(_dirname, "/Frontend/dist/")))
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(_dirname, "Frontend", "dist", "index.html"))
})

app.listen(PORT,()=>{
    mongoose.connect(process.env.mongo_url).then(()=>{
        console.log("connected to Database");   
    }).catch((error)=>{(
        console.log(error)
        )
    })
    console.log(`server is running on port : ${PORT}`); 
})