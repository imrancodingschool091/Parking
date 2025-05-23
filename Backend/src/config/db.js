import mongoose from "mongoose";

export const connectDb=async()=>{

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db");
        
    } catch (error) {

        console.log("failed to connect with db",error);
        
    }
}