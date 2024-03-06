const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const Connection = require("./connection");



var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// Routes
require("./src/routes/user-routes")(app);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Micron API, Signin or Signup'
    });
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    Connection();
    console.log("Running on port", PORT);
})

