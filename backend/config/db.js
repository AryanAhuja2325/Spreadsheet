const mongoose = import('mongoose');
const colors = require('colors');

const connectToDB = async () => {
    try {
        const conn = await (await mongoose).connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            ssl: true,
            tlsAllowInvalidCertificates: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1);
    }
}

module.exports = connectToDB