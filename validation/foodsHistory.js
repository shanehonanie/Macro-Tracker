const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFoodsHistoryInput(data) {
	let errors = {};

	data.food = !isEmpty(data.food) ? data.food : '';
	data.mealOfDay = !isEmpty(data.mealOfDay) ? data.mealOfDay : '';
	data.serving = !isEmpty(data.serving) ? data.serving : '';
	data.description = !isEmpty(data.description) ? data.description : '';
	data.date = !isEmpty(data.date) ? data.date : '';

	if (Validator.isEmpty(data.food)) {
		errors.food = 'Food is required';
	}

	if (Validator.isEmpty(data.mealOfDay)) {
		errors.mealOfDay = 'Meal of day is required';
	}

	if (Validator.isEmpty(data.serving)) {
		errors.food = 'Serving is required';
	}

	if (Validator.isEmpty(data.description)) {
		errors.description = 'Description is required';
	}

	// if (Validator.isEmpty(data.date)) {
	// 	errors.date = 'Date is required';
	// }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
