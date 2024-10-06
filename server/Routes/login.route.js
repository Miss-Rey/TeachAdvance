const router = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { User } = require('../Models/user')
const jwt = require('jsonwebtoken')

router.post('/', async(req,res) =>{
    try{
        const { email, password } = req.body

        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message: 'User not found'})
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).json({message: 'Invalid username or password'});
        }

        const accessToken = jwt.sign({userId: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign({},process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
        res.cookie('ac_id', accessToken, {httpOnly: true})
        res.cookie('rt_id', refreshToken, {httpOnly: true})

        res.status(200).json({message: 'Login successful', accessToken, userId: user._id, user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone
        }})
    } catch(error){
        res.status(500).json({message: 'Error logging in'})
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