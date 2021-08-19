'use strict';

const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const cart = req.session.cart;

    if (cart.products.length === 0) {
        res.redirect('/');
    }
    
    res.render('cart', {
        cart: cart.products,
        totalCost: cart.totalCost
    });
});

module.exports = router;