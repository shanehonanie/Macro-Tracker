const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const keys = require('../config/keys');
const { createProfile } = require('./profile');

// @route POST api/users/register
// @desc Register User and return JWT Token
// @access Public
exports.registerUser = (req, res) => {
	console.log('inside register User');
	const { errors, isValid } = validateRegisterInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// Check if the email exists, if not then create a new user
	User.findOne({ email: req.body.email }).then(user => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			});

			//encrypt the new user's password and save
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;

					newUser.password = hash;
					newUser
						.save()
						.then(user => {
							const payload = { id: user.id, name: user.name };

							// Create & Sign the token
							jwt.sign(
								payload,
								keys.secretOrKey,
								{ expiresIn: 3600 },
								(err, token) => {
									res.json({
										success: true,
										user: user.name,
										id: user.id,
										token: 'Bearer ' + token,
										expiresIn: 3600
									});
								}
							);

							// Create a new profile for the new user
							//createProfile(req, res);
						})
						.catch(err => console.log(err));
				});
			});
		}
	});
};

// @route POST api/users/login
// @desc Login User / Returning JWT Token
// @access Public
exports.loginUser = (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	// Check Validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email }).then(user => {
		// Check for user
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		// Check Password
		bcrypt.compare(password, user.password).then(isVerified => {
			if (isVerified) {
				// User Matched
				const payload = { id: user.id, name: user.name };

				// Sign the token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{ expiresIn: 3600 },
					(err, token) => {
						res.json({
							success: true,
							user: user.name,
							id: user.id,
							token: 'Bearer ' + token,
							expiresIn: 3600
						});
					}
				);
			} else {
				errors.password = 'Password Incorrect';
				return res.status(400).json(errors);
			}
		});
	});
};

// @route GET api/users/current
// @desc Return the current user
// @access Private
exports.getCurrentUser = (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
};
