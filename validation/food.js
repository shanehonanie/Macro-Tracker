const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFoodInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.brand = !isEmpty(data.brand) ? data.brand : '';
	data.portion = !isEmpty(data.portion) ? data.portion : '';
	data.measurement = !isEmpty(data.measurement) ? data.measurement : '';
	data.meal = !isEmpty(data.meal) ? data.meal : '';
	data.calories = !isEmpty(data.calories) ? data.calories : '';
	data.fat = !isEmpty(data.fat) ? data.fat : '';
	data.protein = !isEmpty(data.protein) ? data.protein : '';
	data.carbs = !isEmpty(data.carbs) ? data.carbs : '';
	data.fiber = !isEmpty(data.fiber) ? data.fiber : '';

	if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
		errors.name = 'Name needs to be between 2 and 20 characters';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name is required';
	}

	if (!Validator.isLength(data.brand, { min: 2, max: 20 })) {
		errors.brand = 'Brand needs to be between 2 and 20 characters';
	}

	if (Validator.isEmpty(data.brand)) {
		errors.brand = 'Brand is required';
	}

	if (Validator.isEmpty(data.portion)) {
		errors.portion = 'Portin is required';
	}

	if (Validator.isEmpty(data.measurement)) {
		errors.measurement = 'Measurement is required';
	}

	// if(Validator.isEmpty(data.meal)) {
	//     errors.meal = 'Meal is required'
	// }

	if (!Validator.isInt(data.calories)) {
		errors.calories = 'Calories must be a number';
	}

	if (Validator.isEmpty(data.calories)) {
		errors.calories = 'Calories is required';
	}

	if (!Validator.isInt(data.fat)) {
		errors.fat = 'Fat must be a number';
	}

	if (Validator.isEmpty(data.fat)) {
		errors.fat = 'Fat is required';
	}

	if (!Validator.isInt(data.protein)) {
		errors.protein = 'Protein must be a number';
	}

	if (Validator.isEmpty(data.protein)) {
		errors.protein = 'Protein is required';
	}

	if (!Validator.isInt(data.carbs)) {
		errors.carbs = 'Carbs must be a number';
	}

	if (Validator.isEmpty(data.carbs)) {
		errors.carbs = 'Carbs is required';
	}

	if (!Validator.isInt(data.fiber)) {
		errors.fiber = 'Fiber must be a number';
	}

	if (Validator.isEmpty(data.fiber)) {
		errors.fiber = 'Fiber is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
