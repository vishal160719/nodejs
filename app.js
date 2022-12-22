const express = require("express")
const dotenv = require("dotenv")
const logger = require("./middlewares/logger")
const authRouter = require("./routes/authentication")
const app = express()
dotenv.config()
app.use(logger)
app.use("/api/auth",authRouter)

app.get("/greetings" , (req,res)=>{
    // res.send("hello greetings :)")
    return res.status(200).json({
            message : "hello project!! :)"
    })
})


app.listen(process.env.PORT ,(error) =>{
    if(error){
        console.log(error);
    }
    console.log("server is running on port" + process.env.PORT);
})