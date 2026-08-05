const mongoose = require("mongoose");
const uri = process.env.MONGO_URI;

const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

const connectDB = async () => {
    try {
        console.log("env:" + process.env.MONGO_URI+ "\n\n");
        if (!uri) {
            console.error("MONGO_URI not found in environment variables.");
            process.exit(1);
        }
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;