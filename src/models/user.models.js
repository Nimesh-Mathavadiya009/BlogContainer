import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "../../public/images/default.png"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
}, { timestamps: true })

userSchema.pre("save", async function(next){
   if(!this.isModified("password")){
    return next()
   }

   this.password = await bcrypt.hash(this.password,10)
   next()
})

userSchema.methods.matchPassword = async function(password){

    return await bcrypt.compare(password,this.password) 

    }


export const USER = mongoose.model("USER", userSchema)