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

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('App connected to DB')
    })
    .catch((error) => {
        console.log(error)
    })
    