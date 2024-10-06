const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const User = mongoose.model('user', userSchema)

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().required().label('Email'),
        password: joi.string().required().label('Password'),
        phone: joi.number().required().label('Phone'),
        createdAt: joi.date().label('Date')
    })
    return schema.validate(data)
}

module.exports = {
    User,
    validate
}