const router = require('express').Router()
const { Class } = require('../Models/class')

router.get('/', async (req, res) => {
    try {
        const { instructorId } = req.query
        const classes = await Class.find({ instructorId })
        if(!classes.length) {
            res.status(404).send('No classes found for this instructor')
            return
        }

        console.log(classes)
        res.status(200).json(classes)
    } catch (error) {
        res.status(500).send('Server error')
    }
    
})

module.exports = router;