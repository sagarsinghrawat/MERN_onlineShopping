import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js';

const protect = asyncHandler( async ( req, res, next ) => {

    if( req.headers.authorization && req.headers.authorization.startsWith("Bearer") ) {

        try {
            const token = req.headers.authorization.split(' ')[1];

            const decode = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decode.id);

            next();

        } catch (error) {
            res.status(401);
            res.send("failed");
        }
    }
    else {
        res.status(401);
        throw new Error('Not Authorized, token invalid');
    }
})

const isAdmin = asyncHandler( async ( req, res, next ) => {

    if( req.user && req.user.isAdmin ) {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not Authorized as an admin');
    }
})

export { 
    protect,
    isAdmin
}