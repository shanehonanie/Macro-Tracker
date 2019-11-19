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
		type: Number,
		default: 0
	},
	dailyFat: {
		type: Number,
		default: 0
	},
	dailyCarbs: {
		type: Number,
		default: 0
	},
	dailyFiber: {
		type: Number,
		default: 0
	},
	dailySugar: {
		type: Number,
		default: 0
	},
	fitnessWeeklyWorkouts: {
		type: Number,
		default: 0
	},
	fitnessCaloriesBurnedPerWeek: {
		type: Number,
		default: 0
	},
	fitnessCardioDaysPerWeek: {
		type: Number,
		default: 0
	},
	fitnessWeightTrainingDaysPerWeek: {
		type: Number,
		default: 0
	},
	fitnessMinutessPerWorkout: {
		type: Number,
		default: 0
	}
});

module.exports = Goal = mongoose.model('goals', GoalSchema);
