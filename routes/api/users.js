const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");


const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.post('/register', (req, res) => {
    // const { errors, isValid } = validateRegisterInput(req.body);

    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            // errors.email = 'Email already exists';
            // return res.status(400).json(errors);
            return res.status(400).json({email: "A user has already registered with this address"})
        } else {
            const newUser = new User({
                handle: req.body.handle,
                email: req.body.email,
                password: req.body.password
            })
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
        if (!user) {
            // Use the validations to send the error
            errors.email = "User not found";
            return res.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                res.json({ msg: "Success" });
            } else {
                // And here:
                errors.password = "Incorrect password";
                return res.status(400).json(errors);
            }
        });
    });
});

module.exports = router;
