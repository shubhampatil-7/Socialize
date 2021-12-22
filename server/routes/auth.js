import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

//Register
router.post('/register', async (req, res) =>{
    

    try{
        //Bcrypt password(hashing the password)
        const salt = await bcrypt.genSalt(10);
        const hasedPassword = await bcrypt.hash(req.body.password, salt)

        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hasedPassword,
        })
        console.log("data collected")
        //save the user and respond
        const user = await newUser.save();
        res.status(200).json(user);

    } catch(error){
        res.status(500).json(error)
    }

})

//LOGIN

router.post('/login', async(req, res) =>{
    try{
        const user = await User.findOne({
        email: req.body.email
        })
        !user && res.status(404).send("User not Found");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(404).json("Wrong Password")

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err)
    }
    
})

export default router;