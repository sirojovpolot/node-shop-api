const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.products_create = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.status(500).json({ error: err });
    });
}

exports.products_getById = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: 'Xatolik' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.update_product = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

exports.delete_product = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}