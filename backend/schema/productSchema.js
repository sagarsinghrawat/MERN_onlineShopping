const Joi = require('joi');
const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({

    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true});

const productSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema );

function validateProduct(product) {

    const schema = Joi.object({
        _id: Joi.any(),
        name : Joi.string().required(),
        brand: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().min(0).required(),
        countInStock: Joi.number().min(0).required(),
        description: Joi.string().required(),
        image: Joi.string().required()
    })

    return schema.validate(product);
    
}

exports.Product = Product
exports.validateProduct = validateProduct