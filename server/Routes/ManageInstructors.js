const router = require('express').Router()
const { Instructor } = require('../Models/addInstructor')


router.get('/', async (req, res) => {
    try {
        const instructors = await Instructor.find()

        res.status(200).json(instructors)
        console.log(instructors)
    } catch (error) {
        res.status(500).send('Error fetching instructors')
        console.error(error)
    }
    
})

module.exports = router