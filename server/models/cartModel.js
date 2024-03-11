// cartModel.js

const pool = require("../database/connection");

exports.getShoppingCart = (userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT S.quantity, P.name, P.price, P.productId FROM shopingcart S INNER JOIN product P ON S.productId = P.productId WHERE S.userId = ?",
            [userId],
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

exports.addToCart = (customerId, productId, quantity, isPresent) => {
    return new Promise((resolve, reject) => {
        if (isPresent) {
            pool.query(
                "UPDATE shopingcart SET quantity = quantity + ? WHERE productId = ? AND userId = ?",
                [quantity, productId, customerId],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        } else {
            pool.query(
                "INSERT INTO shopingcart (userId, productId, quantity) VALUES (?, ?, ?)",
                [customerId, productId, quantity],
                (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        }
    });
};

exports.removeFromCart = (productId, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "DELETE FROM shopingcart WHERE productId = ? AND userId = ?",
            [productId, userId],
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

exports.buy = (customerId, address) => {
    return new Promise((resolve, reject) => {
        // Create order
        pool.query(
            "INSERT INTO orders (userId, address) VALUES (?, ?);",
            [customerId, address],
            (err, orderResult) => {
                if (err) {
                    reject(err);
                } else {
                    // Move items from shopping cart to products in order
                    pool.query(
                        "INSERT INTO productsinorder (orderId, productId, quantity, totalPrice) " +
                        "SELECT (SELECT max(orderId) FROM orders WHERE userId = ?), S.productId, S.quantity, P.price * S.quantity " +
                        "FROM shopingcart S INNER JOIN product P ON S.productId = P.productId " +
                        "WHERE S.userId = ?;",
                        [customerId, customerId],
                        (err, productsResult) => {
                            if (err) {
                                reject(err);
                            } else {
                                // Update total price in order table
                                pool.query(
                                    "UPDATE orders O " +
                                    "SET totalPrice = (SELECT SUM(P.totalPrice) " +
                                    "FROM productsinorder P " +
                                    "WHERE O.orderId = P.orderId " +
                                    "GROUP BY O.orderId) " +
                                    "WHERE userId = ? AND totalPrice IS NULL;",
                                    customerId,
                                    (err, totalPriceResult) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            // Clear shopping cart
                                            pool.query(
                                                "DELETE FROM shopingcart WHERE userId = ?;",
                                                customerId,
                                                (err, clearCartResult) => {
                                                    if (err) {
                                                        reject(err);
                                                    } else {
                                                        resolve({ orderResult, productsResult, totalPriceResult, clearCartResult });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    });
};