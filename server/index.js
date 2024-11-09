const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT
const registration = require('../server/Routes/user.route')
const login = require('../server/Routes/login.route')
const cookieParser = require('cookie-parser')
const enroll = require('./Routes/enrollment.route')
const enrolled = require('./Routes/enrolled')
const profile = require('./Routes/profile.route')
const editProfile = require('./Routes/editDetails.route')
const admin = require('./Routes/adminSignup')
const adminLogin = require('./Routes/adminLogin.route')
const addInstructor = require('./Routes/addInstructor')
const inviteinstructor = require('./Routes/inviteInstructor.route')
const instructorLogin = require('./Routes/instructorLogin')
const addClass = require('./Routes/addClass.route')

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN
}))

app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())

app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}`)
})
app.get('/', (req,res) =>{
    return res.status(234).send('Welcome to TeachAdvance')
})

app.use('/api/register', registration);
app.use('/api/login', login)
app.use('/api/enroll', enroll)
app.use('/api/enrolled', enrolled)
app.use('/api/profile', profile)
app.use('/api/profile', editProfile)
app.use('/api/adminsignup', admin)
app.use('/api/adminlogin', adminLogin)
app.use('/api/addinstructor', addInstructor)
app.use('/api/inviteinstructor', inviteinstructor)
app.use('/api/instructorlogin', instructorLogin)
app.use('/api/addclass', addClass)

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('App connected to DB')
    })
    .catch((error) => {
        console.log(error)
    })
    