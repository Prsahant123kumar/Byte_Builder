const express = require('express');
const router = express.Router();
const User = require('../models/User')

const bcrypt=require('bcryptjs');
const { body, validationResult } = require('express-validator');

router.post('/CreateUser', [

    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
],
    async (req, res) => {

        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ error: err.array() });
        }

        const salt=await bcrypt.genSalt(10)
        const setpassword=await bcrypt.hash(req.body.password,salt)

        try {
            await User.create({
                name: req.body.name,
                password: setpassword,
                email: req.body.email,
            }).then(res.json({ success: true }))
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }

    })



router.post('/loginuser', [

    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({ error: err.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            console.log(userData)
            if (!userData) {
                return res.status(400).json({ error: "Please Login with correct credential" });
            }
            const checkPassword=await bcrypt.compare(req.body.password,userData.password)
            if (!checkPassword) {
                return res.status(400).json({ error: "Please Login with correct credential" });
            }
            return res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }

    })

module.exports = router