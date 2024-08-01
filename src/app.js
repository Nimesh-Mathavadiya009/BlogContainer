import express from "express"
import path from "path"
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import {checkForAuthenticationCookie} from "./middlewares/authentication.middleware.js"
import {Blog} from "./models/blog.model.js";
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"/views"))
app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.join(__dirname,"public")))

app.get("/",  async(req, res)=> {
    const allBlogs = await Blog.find({})
    res.render("home",{
        user: req.user,
        blogs: allBlogs
    })
})

import userRouter from "./routes/user.routes.js"
import blogRouter from "./routes/blog.routes.js"


app.use("/api/v1/users",userRouter)
app.use("/api/v1/blogs",blogRouter)

export {app}