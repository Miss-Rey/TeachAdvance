const router = require('express').Router()
const { StudentClass } = require('../Models/studentClass')

router.patch('/', async (req,res) => {
    try{
        const { email } = req.query;

        const student = await StudentClass.findOne({ email })

        if(!student) {
            res.status(404).send('Student not found')
            return;
        }

        student.status = 'Suspended'
        student.suspended = true;

        await student.save()

        res.status(200).json({message: 'Student suspended successfully', student})
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
