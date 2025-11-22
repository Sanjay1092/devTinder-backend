const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://sanjaydb:zunfjLvGpqkRjgND@sanjaydb.qih3ctp.mongodb.net/devTinder")
}


module.exports = connectDB
