const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected Sucessfully");
    } catch (error){
        console.log("Databse Connection Failed")
        console.log(error);
        
    }
}

module.exports = connectDB;