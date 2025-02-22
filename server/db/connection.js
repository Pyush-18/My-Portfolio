import mongoose from "mongoose"

export const connectDB = async()=> {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/portfolio`)
        console.log(`Mongodb connected DB host !! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`Mongodb connection failed ${error?.message}`)
    }
}