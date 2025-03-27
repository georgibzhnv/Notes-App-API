import express, { response } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/register',async(req,resp)=>{
    try{
        const{name,email,password}=req.body;
        const user = await User.findOne({email})
        if(user){
            return resp.status(401).json({succes:false,message:"User already exist"})
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,email,password:hashPassword
        })

        await newUser.save()

        return resp.status(200).json({succes:true, message:"Account Created Successfully"})
    }catch(error){
        console.log(error.message)
        return resp.status(500).json({succes:false, message:"Error in adding user "})
    }

})

export default router