const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const Address = require('../models/Address.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');

router.post('/new-order', isAuthenticated, (req, res, next) => {

    console.log(req.body, req.payload)

    Address.create({
        ...req.body.addressObject,
        userId: req.payload._id
    })
        .then(createdAddress => {
            return Order.create({
                userId: req.payload._id,
                shippingAddress: createdAddress._id,
                products: req.body.cartArray.map(e => {
                    return {
                        productId: e.product._id,
                        purchaseQuantity: e.quantity
                    };
                })
            })
        })
        .then(newOrder => {
            res.json({ order: newOrder})
        })
        .catch(err => console.log(err))
})

router.get('/past-orders', isAuthenticated, (req, res, next)=> {

    Order.find({ userId: req.payload._id })
    .then(foundOrders => {
        console.log(foundOrders)
        res.json({orders: foundOrders})
    })
    .catch(err => console.log(err))
})



module.exports = router;