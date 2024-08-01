import { validateToken } from "../services/authentication.js";


export function checkForAuthenticationCookie(token){
    return (req, res, next) => {
        const userToken = req.cookies.token

        if(!token){
          return  next()
        }

        try {
            const payload = validateToken(userToken)
            req.user = payload
    
        } catch (error) {
           console.log("error :", error)
        }
       return next()
    }
}



