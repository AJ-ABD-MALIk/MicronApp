const database = require("C:/Users/Lenovo/MicronApp/src/models/user.js");
const configuration = require("C:/Users/Lenovo/MicronApp/src/config/config-jwt.js");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // console.log("Request:", req.body);
    validateRequest(req);
    database.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    .then(res.send({message: "User successfully registerd"}))
    .catch(exception => {
        return res.status(500).send({ message:exception.message });
    });

};

exports.signin = (req, res) => {
    validateRequest(req);
    // console.log('Signin Req', req.body.email);
    database.findOne({
            email: req.body.email
    })
    .then(user => {
        if(!user){

            return res.status(404).send({message: "User not found"});
        }

        // Validate Password
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid){
            return res.status(401)
            .send({
                accessToken: Null,
                message: "invalid password"
            });

        }

        // Set token expiry to 10 mins
        // console.log(user.id)
        var token = jwt.sign({id:user.id}, configuration.secret, {
            expiresIn: 86400
        });

        
        user.then(
            res.status(200).send({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                accessToken: token
            }))
    })
    .catch(err => {
        console.log(err);
        // return res.status(500).send({ message:err.message });
    });
};



// Update user credentials
exports.update = (req, res) => {
    console.log("Request:", req.body)
    validateRequest(req);
    
    const id = req.body.id;
    database.updateOne(
        {_id : id},
        { $set: {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email:  req.body.email,
        }}
    )
    .then(output => {
        console.log(output);
        if(output.acknowledged){
            res.send({
                message: "User successfully updated"
            });
        }else {
            res.send({
                message: "Update process failed"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating user details for:" + id
        });
    });
};

exports.delete = (req, res) => {
    // console.log("Request:", req.body)
    validateRequest(req);

    const id = req.body.id;
    database.deleteOne({
        _id: id
    })
    .then(output => {
        if(output.acknowledged){
            res.send({
                message: "User successfully deleted"
            });
        }else {
            res.send({
                message: "Delete process failiure"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Couldn't delete user:" + id
        });
    });
};



function validateRequest(req, res){
    if(!req.body){
        res.status(400).send({
            message: "Request can't be empty!"
        });
    }
}



