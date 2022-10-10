require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require ('cors');
const morgan = require('morgan');

const { isAuthenticated } = require('./middleware/jwt.middleware');

mongoose.connect('mongodb://localhost/project3ECommerce')
.then(connectObject => {
    console.log(`connected to ${connectObject.connections[0].name}`)
})
.catch(err => console.log(err))

const app = express();

app.use(cors({
    origin: ['http://localhost:3000']
}))

const authRoutes = require('./routes/auth.routes')
const productsRoutes = require('./routes/products.routes')

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', authRoutes);
app.use('/', productsRoutes);


app.listen('3001', ()=> {
    console.log('app is listening on port 3001')
});