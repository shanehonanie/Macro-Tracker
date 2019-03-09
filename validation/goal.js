const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateFoodInput(data) {
	let errors = {};

	data.dailyCalories = !isEmpty(data.dailyCalories) ? data.dailyCalories : '';
	data.dailyProtein = !isEmpty(data.dailyProtein) ? data.dailyProtein : '';
	data.dailyFat = !isEmpty(data.dailyFat) ? data.dailyFat : '';
	data.dailyCarbs = !isEmpty(data.dailyCarbs) ? data.dailyCarbs : '';
	data.dailyFiber = !isEmpty(data.dailyFiber) ? data.dailyFiber : '';
	data.fitnessWeeklyWorkouts = !isEmpty(data.fitnessWeeklyWorkouts)
		? data.fitnessWeeklyWorkouts
		: '';
	data.fitnessCaloriesBurnedPerWeek = !isEmpty(
		data.fitnessCaloriesBurnedPerWeek
	)
		? data.fitnessCaloriesBurnedPerWeek
		: '';
	data.fitnessCardioDaysPerWeek = !isEmpty(data.fitnessCardioDaysPerWeek)
		? data.fitnessCardioDaysPerWeek
		: '';
	data.fitnessWeightTrainingDaysPerWeek = !isEmpty(
		data.fitnessWeightTrainingDaysPerWeek
	)
		? data.fitnessWeightTrainingDaysPerWeek
		: '';
	data.fitnessMinutessPerWorkout = !isEmpty(data.fitnessMinutessPerWorkout)
		? data.fitnessMinutessPerWorkout
		: '';

	if (!Validator.isInt(data.dailyCalories)) {
		errors.dailyCalories = 'Calories must be a number';
	}

	if (!Validator.isInt(data.dailyProtein)) {
		errors.dailyProtein = 'Protein must be a number';
	}

	if (!Validator.isInt(data.dailyFat)) {
		errors.dailyFat = 'Fat must be a number';
	}

	if (!Validator.isInt(data.dailyCarbs)) {
		errors.dailyCarbs = 'Carbs must be a number';
	}

	if (!Validator.isInt(data.dailyFiber)) {
		errors.dailyFiber = 'Fiber must be a number';
	}

	if (!Validator.isInt(data.fitnessWeeklyWorkouts)) {
		errors.fitnessWeeklyWorkouts =
			'# of Weekly Fitness Workouts must be a number';
	}

	if (!Validator.isInt(data.fitnessCaloriesBurnedPerWeek)) {
		errors.fitnessCaloriesBurnedPerWeek =
			'# of Calories Burned per Week must be a number';
	}

	if (!Validator.isInt(data.fitnessCardioDaysPerWeek)) {
		errors.fitnessCardioDaysPerWeek =
			'# of Cardio Days per Week must be a number';
	}

	if (!Validator.isInt(data.fitnessWeightTrainingDaysPerWeek)) {
		errors.fitnessWeightTrainingDaysPerWeek =
			'# of Weight Training Days per Week must be a number';
	}

	if (!Validator.isInt(data.fitnessMinutessPerWorkout)) {
		errors.fitnessMinutessPerWorkout =
			'# of Minutes per Workout must be a number';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
