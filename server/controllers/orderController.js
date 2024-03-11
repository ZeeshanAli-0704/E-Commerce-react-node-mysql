// orderController.js

const orderModel = require("../models/orderModel");

exports.getAllOrders = (req, res) => {
    orderModel.getAllOrders()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching orders.");
        });
};

exports.getOrderById = (req, res) => {
    const orderId = req.params.id;
    orderModel.getOrderById(orderId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error fetching order.");
        });
};

exports.getProductsByOrder = (req, res) => {
    const orderId = req.params.id;
    orderModel.getProductsByOrder(orderId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error creating order.");
        });
};

exports.updateOrder = (req, res) => {
    const orderId = req.params.id;
    const newData = req.body; // Assuming newData is an object containing fields to be updated
    orderModel.updateOrder(orderId, newData)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error updating order.");
        });
};

exports.getPastOrdersByCustomerID = (req, res) => {
    const orderId = req.params.id;
    orderModel.getPastOrdersByCustomerID(orderId)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).send("Error deleting order.");
        });
};
