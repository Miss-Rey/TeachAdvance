const router = require('express').Router()
const { Class } = require('../Models/class')

router.get('/', async (req, res) => {
    try{
        const { classCode } = req.query
        console.log({"classcode": classCode})
    if(!classCode) {
        res.status(404).send('Class not found')
        return;
    }

    const classDetails = await Class.findOne({classCode})
    res.status(200).json(classDetails)
    console.log(classDetails)
    } catch (error) {
        res.status(500).send('Server error')

    }
    


})


module.exports = router