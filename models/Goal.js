const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GoalSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	dailyCalories: {
		type: Number,
		default: 2000
	},
	dailyProtein: {
		type: Number
	},
	dailyFat: {
		type: Number
	},
	dailyCarbs: {
		type: Number
	},
	dailyFiber: {
		type: Number
	},
	fitnessWeeklyWorkouts: {
		type: Number
	},
	fitnessCaloriesBurnedPerWeek: {
		type: Number
	},
	fitnessCardioDaysPerWeek: {
		type: Number
	},
	fitnessWeightTrainingDaysPerWeek: {
		type: Number
	},
	fitnessMinutessPerWorkout: {
		type: Number
	}
});

module.exports = Goal = mongoose.model('goals', GoalSchema);
