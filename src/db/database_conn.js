import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log('\n MongoDB connected successfully: DB HOST ',connectionInstance.connection.host);
    }
    catch (error){
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure(if any error or unhandled exception)
    }
}

export default connectDB