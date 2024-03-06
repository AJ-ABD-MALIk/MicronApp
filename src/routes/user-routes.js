const userServices = require("C:/Users/Lenovo/MicronApp/src/services/user-services.js");
const verifyUser = require("C:/Users/Lenovo/MicronApp/src/middleware/verify-user.js");
const verifyToken = require("C:/Users/Lenovo/MicronApp/src/middleware/jwt-auth.js");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header("Access-Control-Allow-Headers", "Authorization", "Origin",
        "Content-Type", "Accept");
        next();

    });

    // user registration
    app.post("/api/v1/signup", [verifyUser], userServices.signup);

    // user login
    app.post("/api/v1/signin", userServices.signin);

    // user update
    app.post("/api/v1/user/update", [verifyToken], userServices.update);

    // user delete
    app.post("/api/v1/user/delete", [verifyToken], userServices.delete);

};