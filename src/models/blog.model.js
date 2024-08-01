import mongoose, { Schema } from "mongoose";

const blogSchemma = new Schema({
    title:{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "USER"
    }
}, {
    timestamps: true
})

export const Blog = mongoose.model("Blog", blogSchemma)