const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect( process.env.MONGO_URI,{
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;