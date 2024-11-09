const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    classId: {
        type: String,
        required: true
    },
    className: {
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
    }
})

const Class = mongoose.model('class', classSchema)

module.exports = {
    Class
}