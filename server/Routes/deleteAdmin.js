const router = require('express').Router()
const { Admin } = require('../Models/admin')

router.delete('/', async (req, res) => {
    try {
        const { email } = req.query;

        await Admin.findOneAndDelete({ email })

        res.status(200).json('Admin removed successfully')
    } catch(error){
        res.status(500).send('Server error')
        console.error(error)
    }
    

}) 

module.exports = router