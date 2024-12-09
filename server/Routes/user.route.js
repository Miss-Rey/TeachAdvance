const router = require('express').Router();
const { User, validate } = require('../Models/user')
const bcrypt = require('bcryptjs');

router.post('/', async(req,res) =>{
    try{
        const { error } = validate(req.body);

        if (error){
            return res.status(400).send({message: error.details[0].message})
        }

        const user = await User.findOne({email: req.body.email});

        if (user){
            return res.status(409).send({message: "User already exist "})
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashedPassword}).save();
        res.status(200).json('User creates successfully')

    } catch (error){
        res.status(500).json({error: error.message})
    }

})

module.exports = router;