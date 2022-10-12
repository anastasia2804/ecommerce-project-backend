const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({

userId: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
},
firstName: {
    type: String,
},
lastName: {
    type: String,
},
addressLine1: {
    type: String,
},
addressLine2: {
    type: String,
},
city: {
    type: String,
},
state: {
    type: String,
},
zipCode: {
    type: Number
}
})

const Address = mongoose.model('Address', addressSchema);

module.exports = Address