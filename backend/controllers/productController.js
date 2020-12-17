const asyncHandler = require('express-async-handler')
const Product = require('../schema/productSchema')

const getProducts = asyncHandler( async( req, res) => {

    const pageSize = 4;
    const page = Number(req.query.pageNumber) || 1;

    const product = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const totalCount = await Product. countDocuments({ ...product });

    const products = await Product.find({...product}).limit(pageSize).skip(pageSize*(page-1));

    res.json({products, totalCount, page, pages: Math.ceil( totalCount/pageSize)});
});

const getProductById = asyncHandler( async ( req, res) => {
    const product = await Product.findById(req.params.id);

    if( !product) {
        res.status(404)
        throw new Error('Product not found');
    }
    else
    res.send(product);
});

const productReviewed = asyncHandler( async ( req, res) => {
    
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id)

    if( product) {

        const isProductReview = product.reviews.find(  p => p.user.toString() ===  req.user.id.toString() )

        if( isProductReview ){
            res.status(400);
            throw new Error("Product already Reviewed");
        }else {

            const review = {
                name: req.user.name,
                rating,
                comment,
                user: req.user._id
            }

            product.reviews.push(review);

            product.numReviews = product.reviews.length;
            const totalRating = product.reviews.reduce((acc, item) => acc+ item.rating, 0);

            product.rating = totalRating/(product.numReviews);

            await product.save();
            res.status(201).json({message: "Product Reviewed"});
        }
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
});

const topRatedProduct = asyncHandler( async ( req, res) => {

    const products = await Product.find({}).sort({rating: -1} ).limit(4);
    res.json(products);
});

module.exports = {
    getProducts,
    getProductById,
    productReviewed,
    topRatedProduct
}


