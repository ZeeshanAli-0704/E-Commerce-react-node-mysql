// userModel.js

const pool = require("../database/connection");

exports.register = (email, password, isAdmin, fname, lname) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO users (email, password, isAdmin, fname, lname) VALUES (?,?,?,?,?);",
            [email, password, isAdmin, fname, lname],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT userId, isAdmin FROM users WHERE email = ? AND password = ?;",
            [email, password],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
};
