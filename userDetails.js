//create schema / structure of nosql mongodb

const mongoose = require("mongoose"); //we need mongo so we call it
const userDetailsSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
}, {
    collection: "UserInfo",
});
mongoose.model("UserInfo", userDetailsSchema);