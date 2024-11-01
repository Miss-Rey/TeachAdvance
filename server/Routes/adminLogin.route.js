const { Admin } = require('../Models/admin')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

router.post('/', async (req, res) => {
    try{
        const { email, password } = req.body;

        const admin = await Admin.findOne({email});
        if(!admin){
            res.status(401).json({message: 'user not found'})
        }
    
        const isValidPassword = await bcrypt.compare(password, admin.password)
        if(!isValidPassword) {
            res.status(400).json({message: 'Invalid username or password'})
        }
    
        const authToken = jwt.sign({adminId: admin._id, firstName: admin.firstName, lastName: admin.lastName, email:admin.email, phone: admin.phone}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
        res.cookie('ac_tk', authToken, {httpOnly: true})
        res.cookie('rf_tk', refreshToken, {httpOnly: true})
    
        res.status(200).json({message: 'Login successful', authToken, adminId: admin._id, admin: {
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            phone: admin.phone
        }} )
    } catch (error) {
        res.status(500).json('Error loging in')
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