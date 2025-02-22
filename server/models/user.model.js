import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type : String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    refreshToken : {
        type: String
    }
},{timestamps: true})

userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcryptjs.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcryptjs.compare(password, this.password)
}

userSchema.methods.generateAccessToken =  function(){
    return  jwt.sign(
        {
            _id: this._id,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return  jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)