const router = require('express').Router()
const { StudentClass } = require('../Models/studentClass')

router.get('/', async (req,res) => {
    try{
        const classCode = req.query;

        if(!classCode) {
            res.status(400).json('No classCode found')
            return
        }

        const data = await StudentClass.find(classCode)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).send('Server error')
        console.error(error)
    }
})

module.exports =  router
