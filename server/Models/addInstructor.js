const mongoose = require('mongoose')
const joi = require('joi')

const instructorSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    isInvited: {type: Boolean, default: false},
    invitationToken: {trype: String},
    courses: [{ type: String, ref: 'Courses'}]
})

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().label('firstName'),
        lastName: joi.string().label('lastName'),
        email: joi.string().label('email'),
        phone: joi.number().label('phone'),
        password: joi.string().label('password'),
        isInvited: joi.boolean().label('isInvited'),
        invitationToken: joi.string().label('invitationToken'),
        courses: joi.array().label('courses')
    })
    return schema.validate(data)
}

const Instructor = mongoose.model('instructor', instructorSchema)

module.exports = { Instructor, validate}