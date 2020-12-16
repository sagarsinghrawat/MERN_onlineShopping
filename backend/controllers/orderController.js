const asyncHandler = require('express-async-handler')
const Order = require('../schema/orderSchema')

const addOrderItems = asyncHandler( async( req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        taxPrice, 
        itemsPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body

    if( orderItems && orderItems.length === 0 ){
        res.status(400)
        throw new Error('No order Items')
    } else {

        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            taxPrice, 
            itemsPrice, 
            shippingPrice, 
            totalPrice 
        });

        const createOrder = await order.save();
        res.status(201).send(createOrder);
    }
});

const getOrderById = asyncHandler( async( req, res ) => {
    
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if( order ) {
        res.status(200).json(order)
    } else{
        res.status(404)
        throw new Error('Order not found')
    }
})

const updateOrderToPaid = asyncHandler( async( req, res ) => {
    
    const order = await Order.findById(req.params.id);

    if( order ) {

        order.isPaid = true,
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updateOrder = await order.save();
        res.status(200).json(updateOrder);

    } else{
        res.status(404)
        throw new Error('Order not found')
    }
})

const updateOrderToDeliver = asyncHandler( async( req, res ) => {
    
    const order = await Order.findById(req.params.id);

    if( order ) {
        order.isDelivered = true,
        order.deliveredAt = Date.now();
        
        const updateOrder = await order.save();
        res.status(200).json(updateOrder);

    } else{
        res.status(404)
        throw new Error('Order not found')
    }
})

const getMyOrders = asyncHandler( async( req, res ) => {
    const orders = await Order.find({ user: req.user._id});
    res.status(200).json(orders)
})

module.exports = {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliver,
    getMyOrders
}