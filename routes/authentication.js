const {Router} = require("express")
const authRouter = Router()

authRouter.post("/login",(req,res) =>{
    return res.status(200).json({
        message:"Login successfull"
    })
})

module.exports = authRouter