const router = require('express').Router()
const { Enrollment } = require('../Models/enrollment')

router.post('/', async (req,res) =>{
    const {userId, courseId} = req.body;
    console.log({userId, courseId})

    try {
        const existingEnrollment = await Enrollment.findOne({userId, courseId})

        if (existingEnrollment) {
           return res.status(400).json({success: false, message: 'Already enrolled to course'})
        }

        const newEnrollment = new Enrollment({userId, courseId});
        await newEnrollment.save();

        res.status(200).json({success: true, message: 'Enrolled successfully'})
    } catch (error) {
        res.status(400).json({success: false, message: 'Error enrolling to course',error})
    }
})

router.get('/enrolled-courses', async (req, res) =>{
    const {userId} = req.body

    try {
        const entollments = await Enrollment.find({userId}).populate('couseId')

       const courses = entollments.map(enrollment => ({
            id: enrollment.courseId
       }))

       res.json({success: true, courses})
    } catch (error) {
        console.error('Error fetching enrolled course:', error)
        res.status(500).json({success: false, message: 'Error fetching enrolled courses'})
    }
}) 
module.exports = router;