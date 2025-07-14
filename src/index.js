import dotenv from 'dotenv';
dotenv.config({
    path: './.env'
})

import connectDB from './db/database_conn.js';

connectDB();





























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