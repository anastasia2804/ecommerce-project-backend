const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model')
const fileUploader = require('../config/cloudinary.config')


router.get('/products', (req, res, next) => {
    
    Product.find()
    .then(productsArray => {
        console.log(productsArray)
        res.json({ products: productsArray})
    })
    .catch(err => console.log(err))
})


module.exports = router;