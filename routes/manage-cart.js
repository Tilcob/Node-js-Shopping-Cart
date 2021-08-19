'use strict';

const express = require('express');

const controller = require('../controllers/cart-controller');

const router = express.Router();

router.post('/getProducts/:name', async (req, res) => {
    const name = req.params.name;

    try {
        const cart = await controller.getProduct(name);

        req.session.cart = cart;

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/delete-product', async (req, res) => {
    const name = req.body.name;

    try {
        const cart = await controller.deleteProduct(name);

        req.session.cart = cart;

        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/increase-quantity', async (req, res) => {
    const name = req.body.name;

    try {
        const cart = await controller.increaseQuantity(name);

        req.session.cart = cart;

        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/decrease-quantity', async (req, res) => {
    const name = req.body.name;

    try {
        const cart = await controller.decreaseQuantity(name);

        req.session.cart = cart;

        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;