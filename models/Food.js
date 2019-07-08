const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	brand: {
		type: String,
		required: true
	},
	measurement: {
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
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
});

module.exports = Food = mongoose.model('food', FoodSchema);
