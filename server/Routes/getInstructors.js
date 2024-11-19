const router = require('express').Router()
const { Instructor } = require('../Models/addInstructor')

router.get('/', async (req, res) => {
    try{
        const { email} = req.query
        const instructor = await Instructor.findOne({email})

        res.status(200).json(instructor)
        console.log(instructor)
    } catch (error) {
        res.status(500).send('server error')
    }
})

module.exports = router