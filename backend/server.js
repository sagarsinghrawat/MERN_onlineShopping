const express = require('express');
const path = require('path')
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const imageUploadRoutes = require('./routes/imageUploadRoutes');


const app = express();
app.use(express.json());

dotenv.config();

connectDB();

app.get('/', (req, res) => {
    res.send('Api Running..')
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/uploads', imageUploadRoutes);

app.get('/api/config/paypal', ( req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/images', express.static('/images') );

app.use(notFound)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen( PORT, console.log(`Listining to ${process.env.NODE_ENV} server Port ${PORT}`));