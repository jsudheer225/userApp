const mongoose = require('mongoose');
const dotenv = require('dotenv');

mongoose.connect(
    process.env.MONGO_URL, {
        dbName: process.env.DB_NAME,
    }).then(() => {
        console.log("Connect to Mongo");
    }).catch(err => console.error(err.message));


mongoose.connection.on("connected", () => {
    console.log("Mongo connected to db");
})

mongoose.connection.on('error', (err)=> {
    console.log(err.message);
})

mongoose.connection.on("disconnected", () => {
    console.log("Mongo connection is disconnected");
})