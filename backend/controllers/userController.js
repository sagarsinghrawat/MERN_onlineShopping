const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../schema/userSchema')
const generateToken = require('../utils/generateToken')

const authenticateUser = asyncHandler( async( req, res ) => {
    
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if( user && (await bcrypt.compare(password, user.password)) ) {
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })    
    }
    else{
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

const userRegistration = asyncHandler( async( req, res ) => {

    const { name, email, password } = req.body;
    
    const userExist = await User.findOne({ email });

    if( userExist ) {
        res.status(400);
        throw new Error("User Already registered");
    }
    else {
        const user = await User.create({
            name,
            email,
            password
        });

        if( user ) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        }
        else {
            res.status(400)
            throw new Error("Invalid User Data");
        }
    }
})

const getUserProfile = asyncHandler( async( req, res ) => {

    const user = await User.findById(req.user.id)

    if( user ){

        res.send({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            isAdmin: req.user.isAdmin
        })
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});

const updatetUserProfile = asyncHandler( async( req, res ) => {

    const user = await User.findById(req.user.id)

    if( user ){

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if( req.body.password )
            user.password = req.body.password;
        
        const updateUser = await user.save();

        res.send({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })    
    }
    else{
        res.status(404);
        throw new Error('User not found');
    }
});



module.exports = { 
    authenticateUser,
    userRegistration,
    getUserProfile,
    updatetUserProfile
}