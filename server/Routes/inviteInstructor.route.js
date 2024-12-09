const router = require('express').Router()
const { Instructor, validate } = require('../Models/addInstructor')
const { instructorInvitationMail } = require('../mailer/mail')
const { route } = require('./addInstructor')
const bcrypt = require('bcryptjs')

const generatePassword = (length = 12) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let password = '';
    for(let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return password;
}

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            res.status(400).send(error)
            console.error(error)
            return;
        }

        const existingInstructor = await Instructor.findOne({ email: req.body.email })
        if (existingInstructor) {
            res.status(400).send({ message: 'Instructor already exists' })
            return;
        }

        const password = generatePassword()
        console.log({'password': password})
        const salt = await bcrypt.genSalt(Number(10))
        const hashedPassword = await bcrypt.hash(password, salt)
        console.log({'hashedPassword': hashedPassword})

        await new Instructor({
            ...req.body,
            password: hashedPassword
        }).save()

        instructorInvitationMail(req.body.firstName, req.body.lastName, req.body.email, password, req.body.courses)

        res.status(201).json({ message: "Instructor invited successfully" })
    } catch (error) {
        res.status(500).json({message: 'Error inviting instructor'})
        console.error(error)
    }
   
})

module.exports = router
