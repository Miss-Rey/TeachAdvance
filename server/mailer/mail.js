const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.OUTLOOK_USERNAME,
        pass: process.env.OUTLOOK_PASSWORD
    }
})

function instructorInvitationMail(firstName, LastName, email, password, courses){
    const html = `
        <p>Greetings ${firstName} ${LastName}, </P> <br />
        <p>You have been invites to join as an instructor at TeachAdvance.</p> <br />
        <p>These are the courses you are authorized to instruct <ul><li>${courses}</li></ul>.</p> <br />
        <p>Here are your login credentials for your TeachAdvance instructor portal \n Email: ${email} \n Password: ${password}.</p> <br />
        <p>Please log in and change your password after your first login.</p> <br />
        <p><a href='http://localhost:5173/login'>Click here to login to your account</a>
        <p>Best regards, Admin</p>
    `
    console.log({email, firstName, LastName, password, courses})
    const mailOPtions = {
        from: process.env.OUTLOOK_USERNAME,
        to: email,
        subject: 'TeachAdvance Instructor Invitation',
        html: html
    }

    try {
        transporter.sendMail(mailOPtions, (error, info) => {
            if(error) {
                console.error(error)

            } else {
                console.log('Invitation email sent')
            }
        });
        console.log(`invitation email ${email}`)
    } catch (err){
        console.error(err)
    }
}

module.exports = {
    instructorInvitationMail
}