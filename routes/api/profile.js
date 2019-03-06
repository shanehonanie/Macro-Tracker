const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const Profile = require('../../models/Profile');
// const User = require('../../models/User');
// const Food = require('../../models/Food');

// @route GET api/profile/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		//.populate()
		.then(profile => {
			if (!profile) {
				errors.noProfile = 'No Profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		//.populate()
		.then(profile => {
			if (!profile) {
				errors.noProfile = 'No Profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
});

// @route GET api/profile
// @desc Get current user profile
// @access Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				if (!profile) {
					errors.noProfile = 'Profile not found for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route POST api/profile
// @desc Create user profile
// @access Private
// router.post(
// 	'/',
// 	passport.authenticate('jwt', { session: false }),
// 	(req, res) => {
// 		// Get fields
// 		const profileFields = {};
// 		profileFields.user = req.user.id;
// 	}
// );

module.exports = router;
