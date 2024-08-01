import mongoose from "mongoose";
import {DB_NAME} from "../constant.js"

const connectDB =  async () => {
    try {
        const hostInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log("MONGODB connected : ", hostInstance.connection.host)
    } catch (error) {
        console.log("MONGODB Connection Error", error)
    }
}

export default connectDB