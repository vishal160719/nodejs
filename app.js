const express = require("express")
const app = express()

app.get("/greetings" , (req,res)=>{
    // res.send("hello greetings :)")
    return res.status(200).json({
            message : "hello project!! :)"
    })
})


app.listen(8000 ,(error) =>{
    if(error){
        console.log(error);
    }
    console.log("server is running");
})