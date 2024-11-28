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
const studentInvite = require('./Routes/studentInvite')
const getClasses = require('./Routes/getClasses')
const getStudentClasses = require('./Routes/getStudentClasses')
const getInstructorProfile = require('./Routes/getInstructorProfile')
const getLearners = require('./Routes/getLearners')
const getInstuctors = require('./Routes/getInstructors')
const getClassDetails = require('./Routes/getCourseDetails')
const updateClassDetails = require('./Routes/editClassDetails')
const unenrollStudent = require('./Routes/UnenrollStudent')
const suspendStudent = require('./Routes/suspendStudent')
const manageInstructor = require('./Routes/ManageInstructors')
const deleteInstructor = require('./Routes/deleteInstructor')
const manageAdmin = require('./Routes/ManageAdmin')
const deleteAdmin = require('./Routes/deleteAdmin')
const myCourses = require('./Routes/myEnrollment')

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
app.use('/api/studentinvite', studentInvite)
app.use('/api/getclasses', getClasses)
app.use('/api/getStudentClasses', getStudentClasses)
app.use('/api/instructorProfile', getInstructorProfile)
app.use('/api/getlearners', getLearners)
app.use('/api/getinstructors', getInstuctors)
app.use('/api/getclassdetails', getClassDetails)
app.use('/api/editclassdetails', updateClassDetails)
app.use('/api/unenrollstudent', unenrollStudent)
app.use('/api/suspendstudent', suspendStudent)
app.use('/api/manageinstructors', manageInstructor)
app.use('/api/deleteInstructor', deleteInstructor)
app.use('/api/manageadmin', manageAdmin)
app.use('/api/deleteadmin', deleteAdmin)
app.use('/api/mycourses', myCourses)

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('App connected to DB')
    })
    .catch((error) => {
        console.log(error)
    })
    