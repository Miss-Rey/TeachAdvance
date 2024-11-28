const router = require('express').Router()
const { Enrollment } = require('../Models/enrollment')

router.get('/', async (req,res) => {
    try{
        const { userId } = req.query;

        const myEnrollments = await Enrollment.find({userId}).populate('courseId')
        console.log(myEnrollments)
        if(!myEnrollments) {
            res.status(404).json('Not enrolled to any courses')
            return;
        }

        const courseIds = myEnrollments.map((enrollment) => ({
            courseIds: String(enrollment.courseId)
        }))

        res.status(200).json({courseIds})

    } catch(error) {
        res.status(500).json('Server error')
        console.error(error)
    }
})

module.exports = router