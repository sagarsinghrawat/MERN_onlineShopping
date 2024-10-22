const express = require('express');
const path = require('path')
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json());

dotenv.config();

connectDB();

if( process.env.NODE_ENV === 'development'){
     app.use(morgan('dev'));
}

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', ( req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

if( process.env.NODE_ENV === 'production' ) {
    app.use( express.static( path.join(__dirname , "/../frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/../frontend/build', 'index.html'));
    })
}

app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen( PORT, console.log(`Listining to ${process.env.NODE_ENV} server Port ${PORT}`));