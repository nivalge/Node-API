const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');


const getProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500); 
        throw new Error(error.message);
    }
})

const getProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500); 
        throw new Error(error.message);
        //res.status(500).json({message: error.message})
    }
})

const updateProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product on database
        if(!product) {
            return res.status(404).json({message: 'Product not found'})
            }
            const updatedProduct = await Product.findById(id)
            res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500); 
        throw new Error(error.message);
    }
})

const deleteProduct = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const products = await Product.findByIdAndDelete(id)
        if(!products) {
            res.status(404); 
            throw new Error('cannot find the product with ID '+ id);
        }
        res.status(200).json(products)
        res.status(200).json({message: 'Product deleted successfully'})

    } catch (error) {
        res.status(500); 
        throw new Error(error.message);
    }
})

const insertProduct = asyncHandler(async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product); 
    } catch (error) {
        res.status(500); 
        throw new Error(error.message);
    }
})

module.exports = {
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    insertProduct
}