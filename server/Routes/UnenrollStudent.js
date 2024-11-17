const router = require('express').Router()
const { StudentClass } = require('../Models/studentClass')

router.delete('/', async (req, res) => {
    try{
        const { email } = req.query;

        await StudentClass.findOneAndDelete({ email })
        res.status(200).json('Student unenrolled successfully')

    } catch (error) {
        res.status(500).send('Server error');
    }
})

module.exports = router