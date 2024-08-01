import { Router } from "express";
import multer from "multer";
import {Blog} from "../models/blog.model.js"
import {Comment} from "../models/comment.model.js"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
const upload = multer({ storage })

const router = Router()

router.get("/add-new", (req,res) => {
    return res.render("addblog",{
        user: req.user
    })
})

router.get("/:id", async (req,res) => {
  const {id} = req.params
  const blog = await Blog.findById(id).populate("createdBy") 
  const comments = await Comment.find({blogId: req.params.id}).populate("createdBy")
  return res.render("blog",{
    user: req.user,
    blog,
    comments
  })
 
})

router.post("/comment/:blogId", async (req,res) => {
    if(req.body.content){
      const comment = await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
      })
      return res.redirect(`/api/v1/blogs/${req.params.blogId}`)
    }

    return res.redirect(`/api/v1/blogs/${req.params.blogId}`)
    
    
})

router.post("/add-new", upload.single("coverImage"), async (req,res) => {
    
    const {title, body} = req.body

   
   const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImage: `/uploads/${req.file.filename}`
    })
    
  return res.redirect(`/api/v1/blogs/${blog._id}`)
})

export default router