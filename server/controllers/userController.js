// userController.js

const userModel = require("../models/userModel");

exports.register = (req, res) => {
    const { email, password, isAdmin, fname, lname } = req.body;
    userModel.register(email, password, isAdmin, fname, lname)
        .then(result => {
            console.log("Successful Register");
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error registering user.");
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    userModel.login(email, password)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error logging in.");
        });
};
