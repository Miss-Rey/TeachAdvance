const router = require('express').Router()
const { Instructor, validate } = require('../Models/addInstructor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    try {
        // const { error } = validate(req.body)

        // if (error) {
        //     res.status(400).send(error)
        //     return
        // }

        const {email} = req.body
        const instructor = await Instructor.findOne({email})
        if (!instructor) {
            res.status(404).json('User does not exist')
            console.error('Instructor doesn\'t exist')
            return
        }

        const isValidPassword = await bcrypt.compare(req.body.password, instructor.password)
        if (!isValidPassword) {
            res.status(400).json('Invalid credentials')
        }

        const accessToken = jwt.sign({ userId: instructor._id, firstName: instructor.firstName, lastName: instructor.lastName, email: instructor.email, phone: instructor.phone }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
        res.cookie('ac_id', accessToken, { httpOnly: true })
        res.cookie('rt_id', refreshToken, { httpOnly: true })

        res.status(200).json({
            message: 'Login successful', accessToken, userId: instructor._id, instructor: {
                firstName: instructor.firstName,
                lastName: instructor.lastName,
                email: instructor.email,
                phone: instructor.phone
            }
        })
    }catch(error) {
        res.status(500).json('Server error')
        console.error(error)
    }
    
})

router.post('/api/refreshToken', (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is missing' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
    })

})

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies.accessToken

    if (!accessToken) {
        return res.status(403).json({ message: 'Access token is missing' });
    }
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid access token' });

        }
        req.userId = decoded.userId;
        next()
    })
}

router.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'Access granted', userId: req.userId, accessToken: req.cookies.accessToken });
});

module.exports = router
