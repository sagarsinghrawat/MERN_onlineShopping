const express = require('express');
const { fetchOrderByAdmin } = require('../controllers/adminController')
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, updateOrderToDeliver } = require('../controllers/orderController')
const { protect, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router();

router.route('/').post( protect, addOrderItems ).get( protect, isAdmin, fetchOrderByAdmin);
router.route('/myorders').get( protect, getMyOrders );
router.route('/:id').get( protect, getOrderById );
router.route('/:id/pay').put( protect, updateOrderToPaid );
router.route('/:id/deliver').put( protect, isAdmin, updateOrderToDeliver )

module.exports = router