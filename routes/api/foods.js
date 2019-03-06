const express = require('express');
const router = express.Router();

// Load Food Model
const Food = require('../../models/Food');

// @route GET api/foods/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Foods Works' }));

// @route GET api/foods
// @desc Get all foods in database
// @access Public
router.get('/', (req, res) => {
	const errors = {};

	Food.find({})
		.then(foods => {
			if (!foods) {
				errors.noFoods = 'No Foods in database';
				return res.status(404).json(errors);
			}
			res.json(foods);
		})
		.catch(err => res.status(404).json(err));
});

module.exports = router;
