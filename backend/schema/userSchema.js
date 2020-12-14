import Joi from 'joi';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},{ timestamps: true});


userSchema.pre('save', async function (next) {

    if( !this.isModified('password') ){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema );

function validateUser(user) {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(5).max(50).required(),
        isAdmin: Joi.boolean().required()
    })

    return schema.validate(user);
}

export default User