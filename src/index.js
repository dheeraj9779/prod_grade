import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})

import connectDB from './db/database_conn.js';
import { app } from './app.js';

connectDB()
.then(() => {
    app.on("error", (err) => {
        console.error('Error in Express app:', err);
        throw err;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: `,process.env.PORT);
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !! ",err)
})





























// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
//         app.on("error", (err) => {
//             console.error('Error in Express app:', err);
//             throw err;
//         });
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     }
//     catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//         throw error;
//     }
// })()