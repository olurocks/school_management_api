const { body, validationResult } = require('express-validator');
const User = require('../../../models/user');

const validateUser = [
    body('name').exists().withMessage('name is required').isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    console.log(user)
                    return Promise.reject('Email address already in use')
                }
            } catch (error) {
                if (error.code === 11000) {
                    return Promise.reject('Email address already in use')
                }
                console.log(error)
                return Promise.reject('an error occored while processing your request')
            }
        }),

    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
        next();
    }
];


module.exports = validateUser;
