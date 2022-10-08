require('dotenv/config')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { isAuthenticated } = require('./middleware/jwt.middleware');

mongoose.connect('mongodb://localhost/project3ECommerce')
.then(connectObject => {
    console.log(`connected to ${connectObject.connections[0].name}`)
})
.catch(err => console.log(err))

const app = express();

const authRoutes = require('./routes/auth.routes')

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use('/', authRoutes);


app.listen('3000', ()=> {
    console.log('app is listening on port 3000')
});