const mongoose = require("mongoose");
const express = require("express");
const app = express();
const db = require("./config/keys").mongoURI;

const User = require('./models/User');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));

    app.get("/", (req, res) => {
        const user = new User({
            handle: "Blah",
            email: "blah@aa.io",
            password: "password"
        })
        user.save();
        res.send("Hello World!");
    })

app.use("/api/users", users);
app.use("/api/tweets", tweets);
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
