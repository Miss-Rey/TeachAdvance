const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    classCode: {
        type: String,
        required: true,
        unique: true
    },
    instructorId: {
        type: String,
        required: true
    }
})

const Class = mongoose.model('class', classSchema)

module.exports = {
    Class
}