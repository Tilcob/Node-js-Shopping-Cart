'use strict';

const express = require('express');

const router = express.Router();

const Product = require('../models/product');

router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: 0
    });

    try {
        await product.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;