const { body, validationResult } = require('express-validator');

function validateUser(req, res, next) {
    const validationMiddleware = [
        body('email').notEmpty().withMessage('Please enter your email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];

    return validationMiddleware;
}

module.exports = { validateUser };
