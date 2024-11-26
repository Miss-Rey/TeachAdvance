const router = require('express').Router()
const { Enrollment } = require('../Models/enrollment')

router.get('/', async (req, res) => {
    const { userId, courseId } = req.query
    console.log(userId, courseId)
    try {
        // Fetch enrollments for the user
        const enrollments = await Enrollment.find({ userId }).populate('courseId');

        if (!enrollments.length) {
            return res.json({ success: false, courses: [], isEnrolled: false });
        }

        // Map all enrolled courses
        const courses = enrollments.map(enrollment => ({
            id: String(enrollment.courseId) // Ensure IDs are strings
        }));
        console.log(courses)
        // Check if the requested courseId is in the enrolled courses
        const isEnrolledInCourse = courses.some(course => course.id === courseId);

        if (!isEnrolledInCourse) {
            return res.json({
                notEnrolled: true,
                message: 'User is not enrolled in the requested course'
            });
        }

        // Return success if enrolled
        res.json({
            success: true,
            courseIds: courses.map(course => course.id),
            isEnrolled: true,
            message: 'User is enrolled in the requested course'
        });
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).json({ success: false, message: 'Error fetching enrolled courses' });
    }
})
module.exports = router;