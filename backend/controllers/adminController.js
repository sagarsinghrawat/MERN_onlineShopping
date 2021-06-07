const asyncHandler  = require('express-async-handler');
const { User, validateUser } = require('../schema/userSchema')
const { Product, validateProduct } = require('../schema/productSchema')
const Order = require('../schema/orderSchema')

const getUsersByAdmin = asyncHandler( async( req, res ) => {

    const users = await User.find({});
    res.status(200).json(users);
});

const userDeleteByadmin = asyncHandler( async( req, res) => {
    const user = await User.findById(req.params.id)

    if( user ){
        await user.remove();
        res.send({message: "User Removed..."})
    } else {
        res.status(400);
        throw new Error('User not Found');
    }
})

const getUserByIdAdmin = asyncHandler( async( req, res) => {

    const user = await User.findById(req.params.id);
    
    if( user ) {
        res.status(200).json(user)
    }
    else{
        res.status(400);
        throw new Error('User not Found');
    }
})

const updateUserByAdmin = asyncHandler( async( req, res ) => {

    const user = await User.findById(req.params.id)

    if( user ){
        
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;

        const updateUser = await user.save();

        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
        })    
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
})

const deleteProductByAdmin = asyncHandler( async( req, res) => {

    const product = await Product.findById(req.params.id);
    if( product ){
        await product.remove();
        res.status(200).json({message: "Product Remove...."})
    } else {
        res.status(404);
        throw new Error('Product not found');  
    }
});

const addProductByAdmin = asyncHandler( async( req, res) => {

    // const product = new Product({
    //     name: req.body.name,
    //     user: req.user._id,
    //     description: req.body.description,
    //     image: req.body.image,
    //     category: req.body.category,
    //     price: req.body.price,
    //     brand: req.body.brand,
    //     countInStock: req.body.countInStock,
    // });

    const product = new Product({
        name: "sample",
        user: req.user._id,
        description: "sample description",
        image: "/image/sample.jpg",
        category: "sample category",
        price: 0,
        brand: "sample brand",
        countInStock: 0,
    });

    const newProduct = await product.save();
    res.status(200).json(newProduct);
});

const updateProductByAdmin = asyncHandler( async( req, res) => {

    const { error } = validateProduct(req.body);
    if( error )  return res.status(400).send(error.details[0].message);
    
    const { name, description, image, category, price, brand, countInStock } = req.body;

    const product = await Product.findById(req.params.id);
    if( product){

        product.name = name;
        product.price = price;
        product.description = description;
        product.brand = brand;
        product.image = image;
        product.countInStock = countInStock;
        product.category = category;

        const updateProduct = await product.save();
        res.status(200).json(updateProduct);
    }
    else{
        res.status(400)
        throw new Error('Product Not found')
    }
});
const fetchOrderByAdmin = asyncHandler( async( req, res ) => {
    
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)

})

module.exports = {
    fetchOrderByAdmin,
    updateProductByAdmin,
    addProductByAdmin,
    deleteProductByAdmin,
    updateUserByAdmin,
    getUserByIdAdmin,
    userDeleteByadmin,
    getUsersByAdmin
}