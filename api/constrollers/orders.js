const Order = require('../models/order');
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name price')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

exports.orders_create_order = (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            return order.save();
        }).then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_byId = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .populate('product')
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({
                    message: "Order not found"
                });
            }
        })
        .catch(err => {
            res.status.json({ error: err });
        });
}

exports.orders_delete_order = (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: req.params.orderId })
        .exec()
        .then(result => {
            res.status(200).json({
                result: result,
                message: "Order deleted"
            });

        })
        .catch(err => {
            res.status.json({ error: err });
        });
}