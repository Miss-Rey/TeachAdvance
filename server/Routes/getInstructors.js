const router = require('express').Router()
const { Instructor } = require('../Models/addInstructor')
const { route } = require('./user.route')

router.get('/', async (req, res) => {
    try{
        const instructor = await Instructor.find()

        res.status(200).json(instructor)
        console.log(instructor)
    } catch (error) {
        res.status(500).send('server error')
    }
})

module.exports = router