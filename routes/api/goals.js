const express = require('express');
const passport = require('passport');
const { getGoals, updateGoals } = require('../../controllers/goals');

const router = express.Router();

router
	.route('/')
	.get(passport.authenticate('jwt', { session: false }), getGoals)
	.post(passport.authenticate('jwt', { session: false }), updateGoals);

module.exports = router;
