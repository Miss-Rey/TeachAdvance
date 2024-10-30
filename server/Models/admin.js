const { required } = require('joi')
const mongoose = require('mongoose')
const joi = require('joi')

const adminSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: Number, required: true},
    createdAt: {type: Date, default: new Date()},
})

const validate = (data) => {
    const schema = joi.object({
        firstName: joi.string().required().label('firstName'),
        lastName: joi.string().required().label('lastName'),
        email: joi.string().required().label('email'),
        phone: joi.number().required().label('phone'),
        password: joi.string().required().label('password')

    })
    return schema.validate(data)
}
const Admin = mongoose.model('admin', adminSchema)
module.exports = {Admin, validate}