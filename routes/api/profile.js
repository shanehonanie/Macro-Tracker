const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateFoodsHistoryInput = require('../../validation/foodsHistory');

// Load Models
const Profile = require('../../models/Profile');
// const User = require('../../models/User');
const Food = require('../../models/Food');

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

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		//.populate()
		.then(profiles => {
			if (!profiles) {
				errors.noProfile = 'There are no profiles';
				return res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch(err => res.status(404).json({ profile: 'There are no profiles' }));
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
			.populate('user', ['name'])
			.populate('foodsHistory.food', ['name'])
			//.populate('foodsHistory.food') //All data
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
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.handle) profileFields.handle = req.body.handle;

		Profile.findOne({ user: req.user.id })
			.then(profile => {
				if (profile) {
					//Update
					Profile.findOneAndUpdate(
						{ user: req.user.id },
						{ $set: profileFields },
						{ new: true }
					)
						.then(profile => res.json(profile)) //Update Success
						.catch(err => res.status(404).json(err));
				} else {
					//Create
					//check if handle exists
					Profile.findOne({ handle: profileFields.handle }).then(profile => {
						if (profile) {
							errors.handle = 'That handle already exists';
							res.status(400).json(errors);
						}

						//Save Profile
						new Profile(profileFields)
							.save()
							.then(profile => res.json(profile))
							.catch(err => res.status(404).json(err));
					});
				}
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route POST api/profile/foodsHistory
// @desc Add Food item to profile
// @access Private
// TODO: Add edit capability
router.post(
	'/foodsHistory',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		//console.log(req.body);
		const { errors, isValid } = validateFoodsHistoryInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Profile.findOne({ user: req.user.id }).then(profile => {
			Food.findOne({ name: req.body.food })
				.then(foodItem => {
					const newFoodItem = {
						food: foodItem,
						mealOfDay: req.body.mealOfDay,
						description: req.body.description,
						date: Date.now()
					};

					// Add to foodsHistory array
					profile.foodsHistory.push(newFoodItem);

					profile.save().then(profile => res.json(profile));
				})
				.catch(err => res.status(404).json(err));
		});
	}
);

// @route DELETE api/profile/foodsHistory/:food_item_id
// @desc Delete Food item to profile
// @access Private
router.delete(
	'/foodsHistory/:food_item_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			// Get remove index
			const removeIndex = profile.foodsHistory
				.map(item => item.id)
				.indexOf(req.params.food_item_id);

			// Splice out of array
			profile.foodsHistory.splice(removeIndex, 1);

			// Save
			profile
				.save()
				.then(profile => res.json(profile))
				.catch(err => res.status(404).json(err));
		});
	}
);

module.exports = router;
