const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/pagination/:pageNo', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart/:pageNo', shopController.getCart);

router.get('/products/cart', shopController.getCart)

router.post('/cart', shopController.postCart);

router.post('/products/cart/:productId', shopController.addToCart);

router.post('/cart-delete-item/:productId', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.post('/orders/:totalPrice', shopController.createOrder);

module.exports = router;
