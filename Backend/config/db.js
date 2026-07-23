const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectDB;

// This file establishes a connection to the MongoDB database using Mongoose. It uses the connection string from the environment variable MONGO_URL. If the connection is successful, it logs a message indicating that MongoDB is connected. If there is an error during the connection process, it logs the error and exits the process with a failure code.