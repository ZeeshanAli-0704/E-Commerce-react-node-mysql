// orderModel.js

const pool = require("../database/connection");
exports.getAllOrders = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT O.orderId, U.fname, U.lname, O.createdDate, O.totalPrice " +
            "FROM orders O INNER JOIN users U ON O.userId = U.userId;",
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


exports.getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT U.fname, U.lname, O.totalPrice, U.createdDate, O.address " +
            "FROM orders O INNER JOIN users U ON O.userId = U.userId " +
            "WHERE O.orderId = ?;",
            [orderId],
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

exports.getProductsByOrder = (orderId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT P2.productId, P2.name, P.quantity, P.totalPrice " +
            "FROM orders O INNER JOIN productsInOrder P ON O.orderId = P.orderId " +
            "INNER JOIN product P2 ON P.productId = P2.productId " +
            "WHERE O.orderId = ?;",
            [orderId],
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


exports.updateOrder = (orderId, newData) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "UPDATE orders SET ? WHERE orderId = ?",
            [newData, orderId],
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

exports.getPastOrdersByCustomerID = (orderId) => {
    const query =
        "SELECT O.orderId, P.name, O.createdDate, PIN.quantity, PIN.totalPrice " +
        "FROM orders O INNER JOIN productsInOrder PIN ON O.orderId = PIN.orderId  " +
        "INNER JOIN product P ON PIN.productId = P.productId " +
        "WHERE O.userId = ? " +
        "ORDER BY O.orderID DESC;";
    return new Promise((resolve, reject) => {
        pool.query(query, [orderId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

