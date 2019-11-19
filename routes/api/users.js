const express = require('express');
const passport = require('passport');
const {
	registerUser,
	loginUser,
	getCurrentUser
} = require('../../controllers/users');

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router
	.route('/current')
	.get(passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router;
