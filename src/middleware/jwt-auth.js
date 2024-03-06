const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')
const configuration = require("C:/Users/Lenovo/MicronApp/src/config/config-jwt.js");
const database = require("C:/Users/Lenovo/MicronApp/src/models/user.js");
const User = database.user;

verifyToken = (req, res, next) => {
    const bearer = req.headers['authorization'];
    let token = bearer.split(" ")[1];
    // console.log(token);

    if(!token){
        return res.status(403).send({
            message: "Token Error"
        });
    }

    jwt.verify(token, configuration.secret, (err, decoded) => {
        if(err){
            console.log(err);
            return res.status(401).send({
                message: "Unathorized User"
            });
        }
        req.id = decoded.id;
        // console.log(req.id, decoded.id)
        next();

    });

};



module.exports = verifyToken;