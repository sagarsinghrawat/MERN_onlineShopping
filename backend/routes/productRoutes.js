const express = require('express')
const { addProductByAdmin, deleteProductByAdmin, updateProductByAdmin } = require('../controllers/adminController')
const { getProducts, getProductById, productReviewed, topRatedProduct } = require('../controllers/productController')
const { protect, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router();

router.route('/').get( getProducts ).post( protect, isAdmin, addProductByAdmin);

router.route('/:id/reviews').post( protect, productReviewed )
router.route('/top').get(topRatedProduct);

router.route('/:id')
    .get(getProductById )
    .delete( protect, isAdmin, deleteProductByAdmin)
    .put( protect, isAdmin, updateProductByAdmin );

module.exports = router
