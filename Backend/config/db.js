const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected successfully ...");
    }).catch(error => {
        console.log("DB connection is failed ..");
        console.log(error);
    });
}
module.exports =connectDB;

// another way to connectDB........................

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL,
//             {
//                 useNewUrlParser:true,
//                 useUnifiedTopology:true
//             }
//         )
//         console.log("MongoDB connect successfully");
        
//     } catch (error) {
//         console.error("Database connection error: ",error.message);
//         process.exit(1);
        
//     }
// }

// module.exports = connectDB;