const router = require('express').Router()
const { StudentClass } = require('../Models/studentClass')
const { User } = require('../Models/user')
const { Class } = require('../Models/class')
const { studentInvitation } = require('../mailer/mail')

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, classCode, className } = req.body

        const student = await User.findOne({ email })
        if (!student) {
            res.status(404).send('Student not found')
            return
        }

        const course = await Class.findOne({ classCode })
        if (!course) {
            res.status(404).send('Class not found')
            return
        }

        const enrollment = await StudentClass.findOne({ email, classCode })
        if (enrollment) {
            res.status(400).send('Student already enrolled to this course')
            return
        }

        await new StudentClass({ firstName, lastName, email, classCode, className }).save()
        studentInvitation(firstName, lastName, email, className)
        res.status(201).json({ message: 'Enrollment successfull' })
    } catch (error) {
        res.status(500).send('Server error')
        console.error(error)
    }
    

})

module.exports = router;