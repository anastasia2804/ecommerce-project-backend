const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
 
const { isAuthenticated } = require('./../middleware/jwt.middleware.js'); 

router.post('/signup', (req, res, next)=> {
    
    const { username, password } = req.body

    if(!username || !password) {
        res.json({ error: 'username and password required' });
        return;
    }

    User.findOne({ username })
    .then(foundUser => {

        if(foundUser) {
        res.json({ error: 'username already exists' });
        return;
        }

    return User.create({
        username,
        password: bcryptjs.hashSync(password)
        })
        
    })
    .then(createdUser => {
        console.log(createdUser);
        res.json({ user: createdUser});
    })
    .catch(err=> {
        console.log(err);
        res.json({ error: err })
    })
});

router.post('/login', (req, res, next) => {
    
    const { username, password } = req.body

    if(!username || !password) {
        res.json({ error: 'username and password required' })
        return;
    }

    User.findOne({username: username})
        .then(foundUser => {

            if(!foundUser) {
                res.json({ error: 'invalid username or password' })
                return; 
            }
           
            const isValidPassword = bcryptjs.compareSync(password, foundUser.password);

            if(!isValidPassword) {
                res.json({ error: 'invalid username or password' })
                return;
            }

            const payload = {
                username: foundUser.username,
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


module.exports = router;