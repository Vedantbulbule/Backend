//express connected checking starting process - backend: 1 mai  operation

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://vedantbulbule:epicgames1@cluster0.nuje696.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');

//use of bcryptjs below.
const bcryptjs = require("bcryptjs");
app.use(cors());

//use of jwt 
const jwt = require('jsonwebtoken');
const JWT_SECRET = "eyJhbGciOiJIUzI1NiJ9";


//start express and change port.
app.use(express.json());
app.listen(5000, () => {
    console.log("server started");
})

//postman starting process - backend: 2 main operation 

app.post("/post", async(req, res) => {
    console.log(req.body);
    const { data } = req.body;
    if (data == "web") {
        res.send({ status: "ok" })
    }
});

//

mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to db")
    }).catch((e) => console.log(e));

// create url in db postman.
require("./userDetails"); //calling previous file in app.js
const User = mongoose.model("UserInfo");

app.post("/register", async(req, res) => {
    const { fname, lname, email, password } = req.body;

    //encrypt password code.
    const encryptPassword = await bcryptjs.hash(password, 10);

    try {

        //existing user unique id.      
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.json({ error: "UserExist" });
        }

        await User.create({
            fname: fname,
            lname: lname,
            email: email,
            password: encryptPassword,

        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});


//login section
app.post("/login-user", async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ error: "User not found " })
    }
    if (await bcryptjs.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: 'ok', data: token });
        } else {
            return res.json({ error: "error" });
        }
    }
    res.json({ status: "error", error: "Invalid Password" });
});



//user-data url fetch

app.post("/userData", async(req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log(user);
        const useremail = user.email;
        useremail.findone({ email: username })
            .then((data) => {
                res.send({ status: "ok", data: data });
            }).catch((error) => {
                ress.send({ statuc: "error", data: error });
            });
    } catch (error) {}

});

//create api url created and further process.
app.get('/getAllUser', async(req, res) => {
    try {
        const allUser = await User.find({});
        res.send({ status: "ok", data: allUser });
    } catch (error) {
        console.log(error);
    }
})

//delete data from db
app.post('/deleteUser', async(req, res) => {
    const { userid } = req.body;
    try {
        User.remove({ id: '65a902e78e10bc1e94da3d53' }, function(err, req) {
            console.log(error);
        });
        res.send({ status: "ok", data: "Deleted" });
    } catch (error) {
        console.log(error);
    }
})