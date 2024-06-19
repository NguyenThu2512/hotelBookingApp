import express from 'express';import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifyToken from '../middleware/auth';

const router= express.Router();
router.post('/login', [
    check("email", "Email is required").isEmail(),
    check("password", "Password is at less 6 character").isLength({
        min:6
    })
],async function(req: express.Request, res: express.Response) {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }
    const {email, password}= req.body;
    try {
        const user=await User.findOne({ email})
        if(!user){
            return res.status(400).json({message:"Invalid Email"})
        }
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if(!isMatchPassword){
            return res.status(400).json({message: "Invalid Password"})
        }
        const token= jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: "1d"}
        );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"})
    }
})

router.get('/validate-token', verifyToken, (req:express.Request, res: express.Response) => {
    res.status(200).send({userId: req.userId})
})

router.post('/log-out',(req:express.Request, res: express.Response)=>{
    res.cookie('auth_token',"",{
        maxAge:0
    })
    res.status(200).json({message: "Log out successfully!"})
})
export default router;