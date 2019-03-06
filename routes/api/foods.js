const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validatorFoodInput = require('../../validation/food');

// Load Food & User Models
const Food = require('../../models/Food');
const User = require('../../models/User');

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

// @route POST api/foods
// @desc Create or edit food object
// @access Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatorFoodInput(req.body);

		//Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		// Get fields
		const foodFields = {};
		foodFields.createdBy = req.user.id;

		if (req.body.name) foodFields.name = req.body.name;
		if (req.body.brand) foodFields.brand = req.body.brand;
		if (req.body.portion) foodFields.portion = req.body.portion;
		if (req.body.measurement) foodFields.measurement = req.body.measurement;
		if (req.body.meal) foodFields.meal = req.body.meal;
		if (req.body.calories) foodFields.calories = req.body.calories;
		if (req.body.fat) foodFields.fat = req.body.fat;
		if (req.body.protein) foodFields.protein = req.body.protein;
		if (req.body.carbs) foodFields.carbs = req.body.carbs;
		if (req.body.fiber) foodFields.fiber = req.body.fiber;

		Food.findOne({ name: req.body.name }).then(food => {
			//Update
			if (food) {
				Food.findOneAndUpdate(
					{ name: req.body.name },
					{ $set: foodFields },
					{ new: true }
				).then(food => res.json(profile)); //Update Success
			} else {
				//Create

				//Check if name already exists
				Food.findOne({ name: req.body.name }).then(food => {
					if (food) {
						errors.name = 'That name already exists';
						res.status(400).json(errors);
					}
				});
				//Save Profile
				new Food(foodFields).save().then(food => res.json(food));
			}
		});
	}
);

module.exports = router;
