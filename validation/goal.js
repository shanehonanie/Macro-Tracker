const Validator = require('validator');
const isEmpty = require('./is-empty');
const isEmptyNumber = require('./is-empty');

module.exports = function validateGoalInput(data) {
	let errors = {};
	console.log('data', data);

	data.dailyCalories = !isEmptyNumber(data.dailyCalories)
		? data.dailyCalories
		: '';
	data.dailyProtein = !isEmptyNumber(data.dailyProtein)
		? data.dailyProtein
		: '';
	data.dailyFat = !isEmptyNumber(data.dailyFat) ? data.dailyFat : '';
	data.dailyCarbs = !isEmptyNumber(data.dailyCarbs) ? data.dailyCarbs : '';
	data.dailyFiber = !isEmptyNumber(data.dailyFiber) ? data.dailyFiber : '';
	data.fitnessWeeklyWorkouts = !isEmptyNumber(data.fitnessWeeklyWorkouts)
		? data.fitnessWeeklyWorkouts
		: '';
	data.fitnessCaloriesBurnedPerWeek = !isEmptyNumber(
		data.fitnessCaloriesBurnedPerWeek
	)
		? data.fitnessCaloriesBurnedPerWeek
		: '';
	data.fitnessCardioDaysPerWeek = !isEmptyNumber(data.fitnessCardioDaysPerWeek)
		? data.fitnessCardioDaysPerWeek
		: '';
	data.fitnessWeightTrainingDaysPerWeek = !isEmptyNumber(
		data.fitnessWeightTrainingDaysPerWeek
	)
		? data.fitnessWeightTrainingDaysPerWeek
		: '';
	data.fitnessMinutessPerWorkout = !isEmptyNumber(
		data.fitnessMinutessPerWorkout
	)
		? data.fitnessMinutessPerWorkout
		: '';

	if (Validator.isEmpty(String(data.dailyCalories))) {
		errors.dailyCalories = 'Calories is required';
	}

	if (Validator.isEmpty(String(data.dailyProtein))) {
		errors.dailyProtein = 'Protein is required';
	}

	if (Validator.isEmpty(String(data.dailyFat))) {
		errors.dailyFat = 'Fat is required';
	}

	if (Validator.isEmpty(String(data.dailyCarbs))) {
		errors.dailyCarbs = 'Carbs is required';
	}

	if (Validator.isEmpty(String(data.dailyFiber))) {
		errors.dailyFiber = 'Fiber is required';
	}

	if (Validator.isEmpty(String(data.fitnessWeeklyWorkouts))) {
		errors.fitnessWeeklyWorkouts = '# of Weekly Fitness Workouts is required';
	}

	if (Validator.isEmpty(String(data.fitnessCaloriesBurnedPerWeek))) {
		errors.fitnessCaloriesBurnedPerWeek =
			'# of Calories Burned per Week is required';
	}

	if (Validator.isEmpty(String(data.fitnessCardioDaysPerWeek))) {
		errors.fitnessCardioDaysPerWeek = '# of Cardio Days per Week is required';
	}

	if (Validator.isEmpty(String(data.fitnessWeightTrainingDaysPerWeek))) {
		errors.fitnessWeightTrainingDaysPerWeek =
			'# of Weight Training Days per Week is required';
	}

	if (Validator.isEmpty(String(data.fitnessMinutessPerWorkout))) {
		errors.fitnessMinutessPerWorkout = '# of Minutes per Workout is required';
	}

	if (!Validator.isInt(String(data.dailyCalories))) {
		errors.dailyCalories = 'Calories must be a number';
	}

	if (!Validator.isInt(String(data.dailyProtein))) {
		errors.dailyProtein = 'Protein must be a number';
	}

	if (!Validator.isInt(String(data.dailyFat))) {
		errors.dailyFat = 'Fat must be a number';
	}

	if (!Validator.isInt(String(data.dailyCarbs))) {
		errors.dailyCarbs = 'Carbs must be a number';
	}

	if (!Validator.isInt(String(data.dailyFiber))) {
		errors.dailyFiber = 'Fiber must be a number';
	}

	if (!Validator.isInt(String(data.fitnessWeeklyWorkouts))) {
		errors.fitnessWeeklyWorkouts =
			'# of Weekly Fitness Workouts must be a number';
	}

	if (!Validator.isInt(String(data.fitnessCaloriesBurnedPerWeek))) {
		errors.fitnessCaloriesBurnedPerWeek =
			'# of Calories Burned per Week must be a number';
	}

	if (!Validator.isInt(String(data.fitnessCardioDaysPerWeek))) {
		errors.fitnessCardioDaysPerWeek =
			'# of Cardio Days per Week must be a number';
	}

	if (!Validator.isInt(String(data.fitnessWeightTrainingDaysPerWeek))) {
		errors.fitnessWeightTrainingDaysPerWeek =
			'# of Weight Training Days per Week must be a number';
	}

	if (!Validator.isInt(String(data.fitnessMinutessPerWorkout))) {
		errors.fitnessMinutessPerWorkout =
			'# of Minutes per Workout must be a number';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
