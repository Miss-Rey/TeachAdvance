const router = require('express').Router()
const {User} = require('../Models/user')

router.get('/', async (req, res) => {
    try {
        const {userId} = req.query
        const user = await User.findById(userId)

        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' })
        }

        res.status(200).json({
            firstname: user.firstName,
            lastname: user.lastName,
            email: user.email,
            phone: user.phone,
            password: user.password
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({ success: false, message: 'Error fetching user details' })
    }
})

module.exports = router