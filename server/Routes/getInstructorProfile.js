const router = require('express').Router()
const {Instructor} = require('../Models/addInstructor')

router.get('/', async (req, res) => {
    try {
        const {instructorId} = req.query
        const instructor = await Instructor.findById(instructorId)

        if (!instructor) {
            res.status(400).json({ success: false, message: 'Instructor not found' })
        }

        res.status(200).json({
            firstname: instructor.firstName,
            lastname: instructor.lastName,
            email: instructor.email,
            phone: instructor.phone,
            password: instructor.password
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: 'Error fetching user details' })
    }
})

module.exports = router