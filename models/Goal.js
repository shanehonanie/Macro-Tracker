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
		default: -1
	},
	dailyFat: {
		type: Number,
		default: -1
	},
	dailyCarbs: {
		type: Number,
		default: -1
	},
	dailyFiber: {
		type: Number,
		default: -1
	},
	fitnessWeeklyWorkouts: {
		type: Number,
		default: -1
	},
	fitnessCaloriesBurnedPerWeek: {
		type: Number,
		default: -1
	},
	fitnessCardioDaysPerWeek: {
		type: Number,
		default: -1
	},
	fitnessWeightTrainingDaysPerWeek: {
		type: Number,
		default: -1
	},
	fitnessMinutessPerWorkout: {
		type: Number,
		default: -1
	}
});

module.exports = Goal = mongoose.model('goals', GoalSchema);
