const dotenv = require('dotenv') 
const Order  = require('./schema/orderSchema')
const { Product } = require('./schema/productSchema')
const {User} = require('./schema/userSchema')
const products = require('./data/products')
const users = require('./data/users')
const connectDB = require('./config/db')

dotenv.config();

connectDB();

const importData = async () => {

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createUsers = await User.insertMany(users);
        
        const adminUser = createUsers.find( p => p.isAdmin );

        const sampleProducts = products.map( product => {
            return { ...product, user: adminUser._id}
        });

        await Product.insertMany(sampleProducts);
        console.log('Data Imported');
        process.exit();

    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Destroy Data');
        process.exit();

    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if( process.argv[2] === '-d') destroyData();
else importData();

