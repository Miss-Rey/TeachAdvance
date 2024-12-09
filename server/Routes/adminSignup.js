const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { Admin, validate } = require('../Models/admin')

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            res.status(500).json({ message: error.details[0].message })
            return
        }

        const user = await Admin.findOne({ email: req.body.email })

        if (user) {
            res.status(400).json({ message: 'User already exists' })
            return
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        await new Admin({ ...req.body, password: hashedPassword, }).save()
        res.status(200).json({ message: 'User creaded successfully' })
    } catch (error) {
        res.status(500).json({message: 'Failed to create user'})
        console.error(error)
    }
    

})

module.exports = router;

