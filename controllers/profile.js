const Profile = require('../models/Profile');
const Food = require('../models/Food');
const validateProfileInput = require('../validation/profile');
const validateFoodsHistoryInput = require('../validation/foodsHistory');
const validateQuickAddInput = require('../validation/quickAdd');

// @route GET api/profile/handle/:handle
// @desc Get profile by handle
// @access Public
exports.getProfileByHandle = (req, res) => {
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
};

// @route GET api/profile/all
// @desc Get all profiles
// @access Public
exports.getAllProfiles = (req, res) => {
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
};

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public
exports.getProfileByUserId = (req, res) => {
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
};

// @route GET api/profile
// @desc Get current user profile
// @access Private
exports.getProfile = (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.user.id })
		.populate('user', ['name'])
		//.populate('foodsHistory.food', ['name'])
		.populate('foodsHistory.food') //All data
		.then(profile => {
			if (!profile) {
				errors.noProfile = 'Profile not found for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err => res.status(404).json(err));
};

// @route POST api/profile
// @desc Create user profile
// @access Private
exports.createProfile = (req, res) => {
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
};

// @route POST api/profile/foodsHistoryBulk
// @desc Add Food array to profile foodsHistory
// @access Private
exports.addFoodsArrayToProfile = (req, res) => {
	let errors = {};
	let foodNames = req.body.map(food => food.foodName);

	Profile.findOne({ user: req.user.id }).then(profile => {
		Food.find({ name: { $in: foodNames } })
			.then(foods => {
				if (foods.length !== foodNames.length)
					errors.name = 'Not all food names found';
			})
			.catch(err => res.status(404).json(err));

		// there must be at least 1 item in array & no name error
		if (req.body.length > 0 && !errors.name) {
			for (let i = 0; i < req.body.length; i++) {
				const newFoodItem = {
					food: req.body[i].foodId,
					mealOfDay: req.body[i].mealOfDay,
					serving: req.body[i].serving,
					description: req.body[i].description,
					date: req.body[i].date
				};
				profile.foodsHistory.push(newFoodItem);
			}

			profile.save(function(err, profile) {
				profile.populate('foodsHistory.food', function(err, profile) {
					res.json(profile);
				});
			});
		} else {
			//send back the error object with 400 status
			return res.status(400).json(errors);
		}
	});
};

// @route POST api/profile/foodsHistory
// @desc Add Food item to profile
// @access Private
// TODO: Add edit capability
exports.addFoodItemToFoodsHistory = (req, res) => {
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
					serving: req.body.serving,
					description: req.body.description,
					//date: Date.now() //for testing
					date: req.body.date
				};

				// Add to foodsHistory array
				profile.foodsHistory.push(newFoodItem);

				profile.save().then(profile => res.json(profile));
			})
			.catch(err => res.status(404).json(err));
	});
};

// @route POST api/profile/foodsHistory/:food_item_id
// @desc Edit exisiting Food item in foodHistory array
// @access Private
exports.editFoodItemInFoodsHistory = (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		// Get edit index
		const editIndex = profile.foodsHistory
			.map(item => item.id)
			.indexOf(req.params.food_item_id);

		// Edit the fields if they exist in req.body
		if (req.body.mealOfDay)
			profile.foodsHistory[editIndex].mealOfDay = req.body.mealOfDay;
		if (req.body.serving)
			profile.foodsHistory[editIndex].serving = req.body.serving;
		if (req.body.description)
			profile.foodsHistory[editIndex].description = req.body.description;
		if (req.body.date) profile.foodsHistory[editIndex].date = req.body.date;

		// Save
		profile
			.save()
			.then(profile => res.json(profile))
			.catch(err => res.status(404).json(err));
	});
};

// @route DELETE api/profile/foodsHistory/:food_item_id
// @desc Delete Food item from profile
// @access Private
exports.deleteFoodItemFromFoodsHistory = (req, res) => {
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
};

// @route POST api/profile/meals
// @desc Add Meal to profile
// @access Private
exports.addMealToProfile = (req, res) => {
	let errors = {};

	Profile.findOne({ user: req.user.id }).then(profile => {
		if (profile.meals.some(item => item.mealName === req.body[0].mealName)) {
			errors.mealName = 'Meal Name already exists';
			return res.status(404).json(errors);
		}

		for (let i = 0; i < req.body.length; i++) {
			const newMealItem = {
				mealName: req.body[i].mealName,
				foodName: req.body[i].foodName,
				foodId: req.body[i].foodId,
				serving: req.body[i].serving,
				mealOfDay: req.body[i].mealOfDay,
				qty: req.body[i].qty
			};
			//push the meal to array in memory
			profile.meals.push(newMealItem);
		}

		//there is at least a meal item and no name error then save to DB
		if (req.body.length > 0 && !errors.mealName) {
			//console.log('[profile.js routes/api profile.meals', profile.meals);
			// profile.save().then(profile => res.json(profile));
			profile.save(function(err, profile) {
				profile.populate('foodsHistory.food', function(err, profile) {
					res.json(profile);
				});
			});
		}
	});
};

// @route DELETE api/profile/meals/:meal_name
// @desc Delete All matching meal names from profile
// @access Private
exports.deleteMatchingMealNames = (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		// filter out the matching meal names
		const newMealsArray = profile.meals.filter(
			meal => meal.mealName !== req.params.meal_name
		);
		profile.meals = newMealsArray;

		// Save
		profile.save(function(err, profile) {
			profile.populate('foodsHistory.food', function(err, profile) {
				res.json(profile);
			});
		});
	});
};

// @route POST api/profile/quickAddCalories
// @desc Quick add calories to profile
// @access Private
exports.quickAddCaloriesToProfile = (req, res) => {
	const { errors, isValid } = validateQuickAddInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then(profile => {
		const newQuickAddItem = {
			date: req.body.date,
			//date: Date.now(),
			mealOfDay: req.body.mealOfDay,
			calories: req.body.calories,
			protein: req.body.protein,
			fat: req.body.fat,
			carbs: req.body.carbs,
			fiber: req.body.fiber,
			sugar: req.body.sugar
		};
		//push the quickAdd to array in memory
		profile.quickAdds.push(newQuickAddItem);

		// save to DB
		profile.save(function(err, profile) {
			profile.populate('foodsHistory.food', function(err, profile) {
				res.json(profile);
			});
		});
	});
};

// @route DELETE api/profile/quickAddCalories/:quick_id
// @desc Delete Quick Calories from
// @access Private
exports.deleteQuickCaloriesFromProfile = (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		// Get remove index
		const removeIndex = profile.quickAdds
			.map(item => item.id)
			.indexOf(req.params.quick_id);

		// Splice out of array
		profile.quickAdds.splice(removeIndex, 1);

		// save to DB
		profile.save(function(err, profile) {
			if (err) {
				res.status(404).json(err);
			}
			profile.populate('foodsHistory.food', function(err, profile) {
				res.json(profile);
			});
		});
	});
};
