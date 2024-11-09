const mongoose = require('mongoose')

const studentsClassSchema = new mongoose.schema({
    studentId: {
        type: String,
        required: true
    },
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
    }
})