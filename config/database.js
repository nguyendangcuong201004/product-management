const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect database Successful !!!");
    }
    catch (error) {
        console.log("Connect database Error");  
        console.log(error);
    }
}

