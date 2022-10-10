const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
title: {
    type: String,
    required: true,
},
description: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
imageUrl: {
 type: String,

},
quantityInStock: {
    type: Number
}

})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;