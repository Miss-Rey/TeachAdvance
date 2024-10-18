const joi = require('joi')
const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
        courseId: {type: String, required: true},
    }
)

const Enrollment = mongoose.model('enrollment',enrollmentSchema)

const validate = (data) =>{
    const schema = joi.object({
        userId: joi.string().required().label('UserId'),
        courseId: joi.string().required().label('CourseId')
    })
    return schema.validate(data)
}
module.exports = {Enrollment, validate}