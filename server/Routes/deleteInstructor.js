const router = require('express').Router()
const { Instructor } = require('../Models/addInstructor')

router.delete('/', async (req, res) => {
    try {
        const { email } = req.query;

        await Instructor.findOneAndDelete({ email })

        res.status(200).json('Instructor removed successfully')
    } catch(error){
        res.status(500).send('Server error')
        console.error(error)
    }
    

}) 

module.exports = router