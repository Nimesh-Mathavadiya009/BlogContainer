import jwt from "jsonwebtoken"

const secret = '$uper@123'

export function createToken(user){
   const payload = {
    _id: user._id,
    email: user.email,
    avatar: user.avatar,
    role: user.role
   }

   const token = jwt.sign(payload, secret)

   return token;
}

export function validateToken(token){
   const payload = jwt.verify(token,secret)

   return payload;
}
