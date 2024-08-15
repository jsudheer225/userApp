const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
require('dotenv').config();
require('./config/database');
const { verifyAccessToken } = require("./config/jwt_helper");


const AuthRoute = require('./routes/users.routes');


const app = express();

var corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user/auth', AuthRoute);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to use app "});
});

const PORT =  process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});