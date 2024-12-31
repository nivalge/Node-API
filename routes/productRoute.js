const express = require('express');
const Product = require('../models/productModel');
const { getProducts, getProduct, updateProduct, deleteProduct, insertProduct } = require('../controllers/productController');

const router = express.Router();

// get all the product
router.get('/', getProducts)

// products fetch by id 
router.get('/:id', getProduct)

// update the product
router.put('/:id', updateProduct)

//delete product
router.delete('/:id', deleteProduct)

// insert product
router.post('/', insertProduct)

module.exports = router;