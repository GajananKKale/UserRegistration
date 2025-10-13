import express from "express"
let router = express.Router()
import {getUsers,addUser,deleteUser,updateUser,getOneUser, login} from "../controllers/usercontroller.js"
import { authMiddleware } from "../middleware/authcontroller.js"

router.get("/user",getUsers)
router.post("/user",addUser)
router.delete("/user/:id",authMiddleware,deleteUser)
router.put("/user/:id",authMiddleware,updateUser)
router.get("/user/:id",getOneUser)
router.post("/user/login",login)


export{router}