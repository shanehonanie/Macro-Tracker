const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateQuickAddInput(data) {
	let errors = {};

	data.date = !isEmpty(data.date) ? data.date : '';
	data.mealOfDay = !isEmpty(data.mealOfDay) ? data.mealOfDay : '';
	data.calories = !isEmpty(data.calories) ? data.calories : '';
	data.protein = !isEmpty(data.protein) ? data.protein : '';
	data.fat = !isEmpty(data.fat) ? data.fat : '';
	data.carbs = !isEmpty(data.carbs) ? data.carbs : '';
	data.fiber = !isEmpty(data.fiber) ? data.fiber : '';
	data.sugar = !isEmpty(data.sugar) ? data.sugar : '';

	// console.log('data', data);

	if (Validator.isEmpty(data.date)) {
		errors.date = 'Date is required';
	}

	if (Validator.isEmpty(data.mealOfDay)) {
		errors.mealOfDay = 'Meal of day is required';
	}

	// if (!Validator.isInt(data.calories)) {
	// 	errors.calories = 'Calories must be a number';
	// }

	if (Validator.isEmpty(data.calories)) {
		errors.calories = 'Calories is required';
	}

	// if (!Validator.isInt(data.fat)) {
	// 	errors.fat = 'Fat must be a number';
	// }

	if (Validator.isEmpty(data.fat)) {
		errors.fat = 'Fat is required';
	}

	// if (!Validator.isInt(data.protein)) {
	// 	errors.protein = 'Protein must be a number';
	// }

	if (Validator.isEmpty(data.protein)) {
		errors.protein = 'Protein is required';
	}

	// if (!Validator.isInt(data.carbs)) {
	// 	errors.carbs = 'Carbs must be a number';
	// }

	if (Validator.isEmpty(data.carbs)) {
		errors.carbs = 'Carbs is required';
	}

	// if (!Validator.isInt(data.fiber)) {
	// 	errors.fiber = 'Fiber must be a number';
	// }

	if (Validator.isEmpty(data.fiber)) {
		errors.fiber = 'Fiber is required';
	}

	// if (!Validator.isInt(data.sugar)) {
	// 	errors.sugar = 'Sugar must be a number';
	// }

	if (Validator.isEmpty(data.sugar)) {
		errors.sugar = 'Sugar is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
