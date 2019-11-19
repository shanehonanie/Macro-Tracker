const express = require('express');
const passport = require('passport');
const {
	getProfileByHandle,
	getAllProfiles,
	getProfileByUserId,
	getProfile,
	updateProfile,
	addFoodsArrayToProfile,
	addFoodItemToFoodsHistory,
	editFoodItemInFoodsHistory,
	deleteFoodItemFromFoodsHistory,
	addMealToProfile,
	deleteMatchingMealNames,
	quickAddCaloriesToProfile,
	deleteQuickCaloriesFromProfile
} = require('../../controllers/profile');

const router = express.Router();

router.route('/handle/:handle').get(getProfileByHandle);
router.route('/all').get(getAllProfiles);
router.route('/user/:user_id').get(getProfileByUserId);
router
	.route('/')
	.get(passport.authenticate('jwt', { session: false }), getProfile)
	.post(passport.authenticate('jwt', { session: false }), updateProfile);

router
	.route('/foodsHistoryBulk')
	.post(
		passport.authenticate('jwt', { session: false }),
		addFoodsArrayToProfile
	);

router
	.route('/foodsHistory')
	.post(
		passport.authenticate('jwt', { session: false }),
		addFoodItemToFoodsHistory
	);

router
	.route('/foodsHistory/:food_item_id')
	.post(
		passport.authenticate('jwt', { session: false }),
		editFoodItemInFoodsHistory
	)
	.delete(
		passport.authenticate('jwt', { session: false }),
		deleteFoodItemFromFoodsHistory
	);

router
	.route('/meals')
	.post(passport.authenticate('jwt', { session: false }), addMealToProfile);

router
	.route('/meals/:meal_name')
	.post(
		passport.authenticate('jwt', { session: false }),
		deleteMatchingMealNames
	);

router
	.route('/quickAddCalories')
	.post(
		passport.authenticate('jwt', { session: false }),
		quickAddCaloriesToProfile
	);

router
	.route('/quickAddCalories/:quick_id')
	.post(
		passport.authenticate('jwt', { session: false }),
		deleteQuickCaloriesFromProfile
	);

module.exports = router;
