const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	handle: {
		type: String,
		required: true
	},
	foodsHistory: [
		{
			food: {
				type: Schema.Types.ObjectId,
				ref: 'food'
			},
			mealOfDay: {
				type: String,
				required: true
			},
			serving: {
				type: Number,
				required: true
			},
			description: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	meals: [
		{
			mealName: {
				type: String,
				required: true
			},
			foodName: {
				type: String,
				required: true
			},
			foodId: {
				type: Schema.Types.ObjectId,
				ref: 'food',
				required: true
			},
			serving: {
				type: Number,
				required: true
			},
			mealOfDay: {
				type: String,
				required: true
			},
			qty: {
				type: Number,
				required: true
			}
		}
	],
	quickAdds: [
		{
			date: {
				type: Date,
				default: Date.now
			},
			mealOfDay: {
				type: String,
				required: true
			},
			calories: {
				type: Number,
				required: true
			},
			protein: {
				type: Number,
				required: true
			},
			fat: {
				type: Number,
				required: true
			},
			carbs: {
				type: Number,
				required: true
			},
			fiber: {
				type: Number,
				required: true
			},
			sugar: {
				type: Number,
				required: true
			}
		}
	]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
