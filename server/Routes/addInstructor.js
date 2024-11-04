const router = require('express').Router();
const { Instructor, validate } = require('../Models/addInstructor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);

        if (error) {
            res.status(400).json({ message: error.details[0].message });
            console.log(error.details[0].message)
            return
        }       

        const existingInstructor = await Instructor.findOne({email: req.body.email});
        if(existingInstructor) {
            res.status(400).json({messsage: 'Instructor already exist'})
            return
        }

        const salt = await bcrypt.genSalt(Number(10))
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const courses = Array.isArray(req.body.couurses) ? req.body.couurses : [req.body.couurses]
        
        await new Instructor({
           ...req.body,
            password: hashedPassword,
            courses: courses
        }).save()

        console.log({...req.body})
        res.status(201).json({ message: 'Instructor successfully added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Cannot add instructor' });
    }
});

module.exports = router;
