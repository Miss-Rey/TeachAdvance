const router = require('express').Router()
const { Class } = require('../Models/class')

router.post('/', async (req,res) => {
    try{
        const course = await Class.findOne({classCode: req.body.classCode})
        if(course) {
            res.status(400).send('Class already exists')
            return;
        }

        await new Class({...req.body}).save()
        res.status(200).json({message: "Class added successfully"})

    } catch (error) {
        res.status(500).send('Server error')
        console.error(error)
    }
})

module.exports = router