const mongoose = require('mongoose')

const studentsClassSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    classCode: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    }
})

const StudentClass = mongoose.model('studentClass', studentsClassSchema)

module.exports = { StudentClass }