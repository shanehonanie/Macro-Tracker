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
		default: ''
	},
	measurementQty: {
		type: Number
	},
	measurementUnit: {
		type: String
	},
	volumeQty: {
		type: Number
	},
	volumeUnit: {
		type: String
	},
	isMeasurementAsDefault: {
		type: Boolean,
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
	description: {
		type: String,
		default: 'N/A'
	},
	source: {
		type: String,
		default: 'N/A'
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	}
});

module.exports = Food = mongoose.model('food', FoodSchema);
