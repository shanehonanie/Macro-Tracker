const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
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
			description: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);