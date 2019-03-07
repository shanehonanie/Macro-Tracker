const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validatorGoalInput = require('../../validation/goal');

// Load Food & User Models
const Goal = require('../../models/Goal');
//const User = require('../../models/User');

// @route GET api/goals/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Goals Works' }));

// @route GET api/goals
// @desc Tests post route
// @access Public
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Goal.findOne({ user: req.user.id })
			.then(goal => {
				if (!goal) {
					errors.noProfile = 'Profile not found for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

module.exports = router;
