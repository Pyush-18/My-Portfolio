import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
import { connectDB } from "../db/connection.js"
import { app } from "./index.js"
const port = process.env.PORT

connectDB()
.then(() => {
    app.listen(port, function(){
        console.log(`Server is listening on the port ${port}`)
    })
}).catch(() => {
    console.log("server crashed")
})