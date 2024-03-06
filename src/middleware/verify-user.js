const database = require("C:/Users/Lenovo/MicronApp/src/models/user.js");

checkExistingEmail = (req, res, next) => {

    console.log('Middleware - verifying user existance');
    database.findOne({

            email: req.body.email
        
    })
    .then(user => {
        if(user){
            res.status(400).send({
                message: "Email already in Use"
            });
            return;
        }
        next();
    });
};



module.exports = checkExistingEmail;