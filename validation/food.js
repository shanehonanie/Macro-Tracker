const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFoodInput(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : '';
	data.brand = !isEmpty(data.brand) ? data.brand : '';
	data.measurementQty = !isEmpty(data.measurementQty)
		? data.measurementQty
		: '';
	data.measurementUnit = !isEmpty(data.measurementUnit)
		? data.measurementUnit
		: '';
	data.volumeQty = !isEmpty(data.volumeQty) ? data.volumeQty : '';
	data.volumeUnit = !isEmpty(data.volumeUnit) ? data.volumeUnit : '';
	data.isMeasurementAsDefault = !isEmpty(data.isMeasurementAsDefault)
		? data.isMeasurementAsDefault
		: true;
	data.calories = !isEmpty(data.calories) ? data.calories : '';
	data.protein = !isEmpty(data.protein) ? data.protein : '';
	data.fat = !isEmpty(data.fat) ? data.fat : '';
	data.carbs = !isEmpty(data.carbs) ? data.carbs : '';
	data.fiber = !isEmpty(data.fiber) ? data.fiber : '';
	data.sugar = !isEmpty(data.sugar) ? data.sugar : '';

	if (!Validator.isLength(data.name, { min: 2, max: 20 })) {
		errors.name = 'Name needs to be between 2 and 20 characters';
	}

	if (Validator.isEmpty(data.name)) {
		errors.name = 'Name is required';
	}

	// if (
	// 	Validator.isEmpty(data.measurementQty) &&
	// 	Validator.isEmpty(data.volumeQty)
	// ) {
	// 	errors.measurementQty = 'Measurement or Volume Quanity is required';
	// 	errors.volumeQty = 'Measurement or Volume Quanity is required';
	// }

	// if (!Validator.isInt(data.measurementQty)) {
	// 	errors.measurementQty = 'Measurement Quantity must be a number';
	// }

	// if (!Validator.isFloat(data.volumeQty)) {
	// 	errors.volumeQty = 'Volume Quantity must be a number';
	// }

	// if (
	// 	Validator.isEmpty(data.measurementUnit) &&
	// 	Validator.isEmpty(data.volumeUnit)
	// ) {
	// 	errors.measurementUnit = 'Measurement or Volume Unit is required';
	// 	errors.volumeUnit = 'Measurement or Volume Unit is required';
	// }

	// if (!Validator.isLength(data.measurementUnit, { min: 1, max: 10 })) {
	// 	errors.measurementUnit =
	// 		'Measurement Unit needs to be between 1 and 10 characters';
	// }

	// if (!Validator.isLength(data.volumeUnit, { min: 1, max: 10 })) {
	// 	errors.volumetUnit = 'Volume Unit needs to be between 1 and 10 characters';
	// }

	if (Validator.isEmpty(data.isMeasurementAsDefault)) {
		errors.isMeasurementAsDefault = 'isMeasurementAsDefault is required';
	}

	if (!Validator.isBoolean(data.isMeasurementAsDefault)) {
		errors.isMeasurementAsDefault = 'isMeasurementAsDefault must be a Boolean';
	}

	if (!Validator.isInt(data.calories)) {
		errors.calories = 'Calories must be a number';
	}

	if (Validator.isEmpty(data.calories)) {
		errors.calories = 'Calories is required';
	}

	if (!Validator.isInt(data.protein)) {
		errors.protein = 'Protein must be a number';
	}

	if (Validator.isEmpty(data.protein)) {
		errors.protein = 'Protein is required';
	}

	if (!Validator.isInt(data.fat)) {
		errors.fat = 'Fat must be a number';
	}

	if (Validator.isEmpty(data.fat)) {
		errors.fat = 'Fat is required';
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

	if (!Validator.isInt(data.sugar)) {
		errors.sugar = 'Sugar must be a number';
	}

	if (Validator.isEmpty(data.sugar)) {
		errors.sugar = 'Sugar is required';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
