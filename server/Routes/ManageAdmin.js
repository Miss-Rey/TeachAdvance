const router = require('express').Router()
const { Admin } = require('../Models/admin')


router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find()

        res.status(200).json(admin)
        console.log(admin)
    } catch (error) {
        res.status(500).send('Error fetching instructors')
        console.error(error)
    }
    
})

module.exports = router