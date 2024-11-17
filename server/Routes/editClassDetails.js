const router = require("express").Router()
const {Class} = require('../Models/class')

router.put('/', async (req,res) => {
    try{
        const { classId} = req.query
        const { classCode, className, endDate } = req.body
    
        const Class = await Class.findOne({ classId })

        if(!Class) {
            res.status(404).send('Class not found')
            return;
        }

        const updates = { classCode, className, endDate}

        const updatedClass = await Class.findByIdAndUpdate(classId, updates, {new: true})
        res.status(200).json({updatedClass, massage: 'Class successfully updated'})
    } catch (error) {
        res.status(500).send("Server error")
    }
    
})

module.exports = router