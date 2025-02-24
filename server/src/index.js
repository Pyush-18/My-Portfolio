import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import path  from "path"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "https://get-placed-18lp.onrender.com",
    credentials: true
}))

const __dirname = path.resolve()

import userRoute from "../routes/user.route.js"
import skillRoute from "../routes/skill.route.js"
import projectRoute from "../routes/project.route.js"

app.use("/api/v1/user", userRoute)
app.use("/api/v1/skill", skillRoute)
app.use("/api/v1/project", projectRoute)

app.use(express.static(path.join(__dirname, "../client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
})



export {app}

