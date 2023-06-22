const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUser, renew } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt.js');
const { verifySignUp } = require('../middlewares/verify-signup');
const { verifySignIn } = require('../middlewares/verify-signin');
const router = Router();

// Auth user endpoints
router.post(
    '/new',
    [ // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email valido es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields,
        verifySignUp
    ],
    createUser);

router.post(
    '/',
    [// Middlewares
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'El email valido es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
        validateFields,
        verifySignIn
    ],
    loginUser);

router.get('/renew', validateJWT, renew);

module.exports = router;