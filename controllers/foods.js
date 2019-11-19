const fs = require('fs');

const csv = require('csv-parser');
const Food = require('../models/Food');
const validatorFoodInput = require('../validation/food');

// @route GET api/foods
// @desc Get all foods in database
// @access Public
exports.getAllFood = (req, res) => {
	const errors = {};

	Food.find({})
		.then(foods => {
			if (!foods) {
				errors.noFoods = 'No Foods in database';
				return res.status(404).json(errors);
			}
			res.json(foods);
		})
		.catch(err => res.status(404).json(err));
};

// @route POST api/foods
// @desc Create food object
// @access Private
exports.createFood = (req, res) => {
	const { errors, isValid } = validatorFoodInput(req.body);

	//Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// Get fields
	const foodFields = {};
	foodFields.createdBy = req.user.id;

	if (req.body.name) foodFields.name = req.body.name;
	if (req.body.brand) foodFields.brand = req.body.brand;
	if (req.body.measurementQty)
		foodFields.measurementQty = req.body.measurementQty;
	if (req.body.measurementUnit)
		foodFields.measurementUnit = req.body.measurementUnit;
	if (req.body.volumeQty) foodFields.volumeQty = req.body.volumeQty;
	if (req.body.volumeUnit) foodFields.volumeUnit = req.body.volumeUnit;
	if (req.body.isMeasurementAsDefault)
		foodFields.isMeasurementAsDefault =
			req.body.isMeasurementAsDefault === 'Measurement' ? true : false;
	if (req.body.calories) foodFields.calories = req.body.calories;
	if (req.body.protein) foodFields.protein = req.body.protein;
	if (req.body.fat) foodFields.fat = req.body.fat;
	if (req.body.carbs) foodFields.carbs = req.body.carbs;
	if (req.body.fiber) foodFields.fiber = req.body.fiber;
	if (req.body.sugar) foodFields.sugar = req.body.sugar;
	if (req.body.source) foodFields.source = req.body.source;
	if (req.body.description) foodFields.description = req.body.description;

	Food.findOne({ name: req.body.name }).then(food => {
		// Duplicate
		if (food) {
			errors.name = 'That name already exists';
			return res.status(400).json(errors);
		} else {
			// Create & Save Food
			new Food(foodFields)
				.save()
				.then(food => res.json(food))
				.catch(err => res.status(404).json(err));
		}
	});
};

// @route POST api/foods/csv
// @desc Create multiple food objects from CSV file
// @access Private
exports.createFoodsFromCSV = (req, res) => {
	const fileData = [];

	fs.createReadStream(req.file.path)
		.pipe(csv())
		.on('data', line => fileData.push(JSON.parse(JSON.stringify(line))))
		.on('end', () => {
			// console.log(fileData.length);

			const newFoodsArray = [];

			for (let i = 0; i < fileData.length; i++) {
				// Get fields
				const foodFields = {};
				foodFields.createdBy = req.user.id;

				if (fileData[i].Name) foodFields.name = fileData[i].Name;
				if (fileData[i].Default)
					foodFields.isMeasurementAsDefault =
						fileData[i].Default === 'M' ? true : false;
				if (fileData[i].Measurement)
					foodFields.measurementQty = fileData[i].Measurement;
				if (fileData[i]['Measurement Unit'])
					foodFields.measurementUnit = fileData[i]['Measurement Unit'];
				if (fileData[i].Volume) foodFields.volumeQty = fileData[i].Volume;
				if (fileData[i]['Volume Unit'])
					foodFields.volumeUnit = fileData[i]['Volume Unit'];
				if (fileData[i].Brand) foodFields.brand = fileData[i].Brand;
				if (fileData[i].Calories) foodFields.calories = fileData[i].Calories;
				if (fileData[i].Protein) foodFields.protein = fileData[i].Protein;
				if (fileData[i].Fat) foodFields.fat = fileData[i].Fat;
				if (fileData[i].Carbs) foodFields.carbs = fileData[i].Carbs;
				if (fileData[i].Fiber) foodFields.fiber = fileData[i].Fiber;
				if (fileData[i].Sugar) foodFields.sugar = fileData[i].Sugar;
				if (fileData[i].Source) foodFields.source = fileData[i].Source;
				if (fileData[i].Description)
					foodFields.description = fileData[i].Description;

				newFoodsArray.push(foodFields);
			}
			fs.unlinkSync(req.file.path); //remove temp file

			Food.insertMany(newFoodsArray)
				.then(foods => res.json(foods))
				.catch(err => res.status(404).json(err));

			console.log('# Foods Added: ' + newFoodsArray.length);
		});
};
