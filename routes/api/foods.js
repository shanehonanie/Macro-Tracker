const express = require('express');
const passport = require('passport');
const multer = require('multer');
const {
	getAllFood,
	createFood,
	createFoodsFromCSV
} = require('../../controllers/foods');

const router = express.Router();

// for csv file upload/temp directory
const upload = multer({ dest: 'tmp/csv/' });

router
	.route('/')
	.get(getAllFood)
	.post(passport.authenticate('jwt', { session: false }), createFood);

router
	.route('/csv')
	.post(
		upload.single('file'),
		passport.authenticate('jwt', { session: false }),
		createFoodsFromCSV
	);

module.exports = router;
