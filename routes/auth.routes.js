const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
 
const { isAuthenticated } = require('./../middleware/jwt.middleware.js'); 

router.post('/signup', (req, res, next)=> {
    
    const { email, password } = req.body

    if(!email || !password) {
        res.json({ error: 'email and password are required' });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) {
            res.json({ error: 'Provide a valid email address.' });
            return;
        }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
         if (!passwordRegex.test(password)) {
            res.json({ error: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.' });
            return;
        }

    User.findOne({ email })
    .then(foundUser => {
        if(foundUser) {
        res.json({ error: 'user already exists' });
        return;
        }

    return User.create({
        email,
        password: bcryptjs.hashSync(password)
        })
        
    })
    .then(createdUser => {
        const { email, _id } = createdUser;
        const user = { email, _id };
        res.json({ user: user});
    })
    .catch(err=> {
        console.log(err);
        res.json({ error: err })
    })
});

router.post('/login', (req, res, next) => {
    
    const { email, password } = req.body

    if(!email || !password) {
        res.json({ error: 'email and password required' })
        return;
    }

    User.findOne({email: email})
        .then(foundUser => {

            if(!foundUser) {
                res.json({ error: 'invalid email or password' })
                return; 
            }
           
            const isValidPassword = bcryptjs.compareSync(password, foundUser.password);

            if(!isValidPassword) {
                res.json({ error: 'invalid email or password' })
                return;
            }

            const payload = {
                email: foundUser.email,
                _id: foundUser._id
            }

            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                expiresIn: "6h",
                algorithm: "HS256"
            })

            res.json({ authToken });

        })
        .catch(err=> {
            console.log(err);
            res.json({ error: err })
        })
})

router.get('/verify', isAuthenticated, (req, res, next) => {      
    console.log(`req.payload`, req.payload);
    res.json(req.payload);
  });

router.delete('/delete-user', isAuthenticated, (req, res, next) => {

    User.findByIdAndDelete(req.payload._id)
    .then(deletedUser=>res.json({deletedUser: deletedUser}))
    .catch(err=>console.log(err))
})


module.exports = router;