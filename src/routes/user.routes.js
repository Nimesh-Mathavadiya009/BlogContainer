import { Router } from "express";
import { USER } from "../models/user.models.js";
import { createToken } from "../services/authentication.js";


const router = Router();

router.get("/signin", (req,res) => {
    return res.render("signin")
})

router.get("/signup", (req,res) => {
    return res.render("signup")
})

router.post("/signin",async(req,res) => {
    try {
        const {email, password} = req.body
    
        if( !(password || email) ){
            console.log("email or password are required..")
        }
    
        const user = await USER.findOne({email});
        if(!user)  throw new Error("User not found !!");

        const isvalid = await user.matchPassword(password)
    
        if(!isvalid){
            const error = "Invalid password"
            res.render("signin",{error})
        }

        const token = createToken(user)
    

      const options = {
        httpOnly: true,
        secure: true
      }

      res.cookie("token",token,options).redirect("/")
    //    console.log(token)
    } catch (error) {
        console.log("error: ". error)
    }

})

router.get("/logout", (req,res) => {
     const options = {
        httpOnly: true,
        secure: true
     }
        res.clearCookie("token",options).redirect("/")
})

router.post("/signup", async(req,res) => {
    try {
        const {fullName, email, password} = req.body;
        
        if([fullName,email,password].some((idx) => idx?.trim()==="")){
            console.log("All Fields are required")
        }
    
        await USER.create({
            fullName,
            email,
            password
        })
    
        return res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})

export default router