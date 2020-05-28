import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const SECRET ='edteam'

export const getUserId=(request)=>{
    const header=request.get('authorization')
    if(header){
        const token=header.replace('Bearer ','')
        const {userId}=jwt.verify(token,SECRET)

        return userId
    }

    throw new Error('Se requiere autenticación')
}

export const hashPassword= async password =>{
    if (password.length<6){
        throw new Error("Password debe tener al menos 6 caracteres")
    }
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

export const validatePassWord= async (requestPassword,password)=>{
    return bcrypt.compare(requestPassword,password)
}

export const generateToken=(userId)=>{
    return jwt.sign({userId},SECRET,{expiresIn:'2 days'})
}