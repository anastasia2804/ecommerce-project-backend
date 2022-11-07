require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');
const morgan = require('morgan');

const { isAuthenticated } = require('./middleware/jwt.middleware');

mongoose.connect(process.env.MONGODB_URI)
.then(connectObject => {
    console.log(`connected to ${connectObject.connections[0].name}`)
})
.catch(err => console.log(err))

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.json());

const authRoutes = require('./routes/auth.routes')
const productsRoutes = require('./routes/products.routes')
const ordersRoutes = require('./routes/orders.routes')


app.use('/', authRoutes);
app.use('/', isAuthenticated, productsRoutes);
app.use('/', isAuthenticated, ordersRoutes);

app.listen(process.env.PORT, ()=> {
    console.log('app is listening')
});

