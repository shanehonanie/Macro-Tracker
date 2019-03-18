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
			food: {
				type: Schema.Types.ObjectId,
				ref: 'food'
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
	]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
