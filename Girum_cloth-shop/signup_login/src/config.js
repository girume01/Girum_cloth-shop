const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-tut");

connect.then(() => {
    console.log("MongoDB Connected successfully");
})

.catch(() => {
    console.log("MongoDB connection failed");
});

//create a schema

const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

//collection part

const collection = new mongoose.model("users", Loginschema);

module.exports = collection;