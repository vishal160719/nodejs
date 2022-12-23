const { response } = require("express")
const nodemailer = require("nodemailer")

const sendMail = (email, username ,otp) =>{
    try {
        const transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            // mailer: 'gmail',
            auth: {
                user: 'vishalgupta160719@gmail.com',
                pass: 'vrzbvujwjdokehhq'
            }
        })

        return transport.sendMail({
            from: 'vishalgupta160719@gmail.com',
            to: email,
            subject:"otp for e verfity",
            html:`
                <div>
                <h2>Hii ${username}</h2>
                <h2>Hello from express Project</h2>
                <br />
                <p>Your otp e verify is <strong>${otp}</strong></p>
                <br />
                <h4>thank you</h4>
                </div>
            `
        })
        .then((response) =>{
            console.log("email sent:",response)
        })
    } catch (error) {
        console.log("error:" ,error)
    }
}

module.exports ={
    sendMail
}