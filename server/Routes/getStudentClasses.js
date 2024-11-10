const router = require('express').Router()
const { StudentClass } = require('../Models/studentClass')

router.get('/', async (req, res) => {
    try {
        const { email } = req.query;
        console.log(email)
        const classes = await StudentClass.find({ email })
        if (!classes.length) {
            res.status(404).send("Not enrolled to any class")
            return;
        }

        res.status(200).json(classes)
    } catch (error) {
        res.status(500).send('Server error')
    }
    
})

module.exports = router
