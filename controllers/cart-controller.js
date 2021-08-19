'use strict';

const Product = require('../models/product');

let totalCost = 0;
let products = [];

exports.getProduct = async function(name) {
    const productFromDB = await Product.findOne({ name: name });

    const currentProduct = findCurrentProduct(products, name);
    const currentProductIndex = findCurrentProductIndex(products, name);

    if (currentProduct === undefined) {
        totalCost += productFromDB.price;
        productFromDB.quantity = 1;
        products.push(productFromDB);
    } else {
        products[currentProductIndex]['quantity'] += 1
        totalCost += currentProduct.price * currentProduct.quantity;
    }

    return {
        products,
        totalCost
    };
}

exports.deleteProduct = async function(name) {
    const currentProduct = findCurrentProduct(products, name);
    const currentProductIndex = findCurrentProductIndex(products, name);

    console.log(products + 'In delete product, before deleting it');

    totalCost -= currentProduct.price * currentProduct.quantity;

    products.splice(currentProductIndex, 1);

    console.log(products + 'In delete product, before after it');

    return {
        products,
        totalCost
    };
}

exports.increaseQuantity = async function(name) {
    const currentProduct = findCurrentProduct(products, name);
    const currentProductIndex = findCurrentProductIndex(products, name);

    products[currentProductIndex]['quantity'] += 1;

    totalCost += currentProduct.price;

    return {
        products,
        totalCost
    };
}

exports.decreaseQuantity = async function(name) {
    const currentProduct = findCurrentProduct(products, name);
    const currentProductIndex = findCurrentProductIndex(products, name);

    if (products[currentProductIndex]['quantity'] === 1) {
        console.log('Please press the delete Button');
    } else {
        products[currentProductIndex]['quantity'] -= 1
        totalCost -= currentProduct.price;
    }

    return {
        products,
        totalCost
    };
}

exports.displayCart = async function() {

    return {
        products,
        totalCost
    }
}

function findCurrentProduct(products, name) {
    return products.find((post) => {
        if (post.name === name) {
            return true;
        }
    });
}

function findCurrentProductIndex(products, name) {
    return products.findIndex((post) => {
        if (post.name === name) {
            return true;
        }
    });
}