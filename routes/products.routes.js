const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model')

router.get('/products', (req, res, next) => {

    Product.find()
    .then(productsArray => {
        console.log(productsArray)
        res.json({ products: productsArray})
    })
    .catch(err => console.log(err))
})


router.get('/products/:productId', (req, res, next) => {

    const { productId } = req.params;

    Product.findById(productId)
    .then(foundProduct => res.json({ product: foundProduct }))
    .catch(err => res.json(err))


})

module.exports = router;