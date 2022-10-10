const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
},

shippingAddress: {
    type: Schema.Types.ObjectId, 
    ref: 'Address'
},

products: [{
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    
    purchaseQuantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
}],

total: {
    type: Number,
    required: true,
    default: 0
},

})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order