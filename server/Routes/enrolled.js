const router = require('express').Router()
const { Enrollment } = require('../Models/enrollment')

router.get('/', async (req, res) => {
    const { userId } = req.query

    try {
        const enrollments = await Enrollment.find({ userId }).populate('courseId')

        const courses = enrollments.map(enrollment => ({
            id: enrollment.courseId
        }))

        if (!enrollments.length) {
            return res.json({ success: true, courses: [], isEnrolled: false  }); // No enrollments found
        }

        const courseIds = enrollments.map(enrollment => enrollment.courseId)
        res.json({ success: true, courseIds, isEnrolled: true })
    } catch (error) {
        console.error('Error fetching enrolled course:', error)
        res.status(500).json({ success: false, message: 'Error fetching enrolled courses' })
    }
})
module.exports = router;