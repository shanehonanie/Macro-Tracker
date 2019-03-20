import * as actionTypes from '../actions/actionTypes';

const initialState = {
	profile: null,
	error: null,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_PROFILE_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.ADD_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				profile: action.profileData
			};
		case actionTypes.ADD_PROFILE_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};

		case actionTypes.FETCH_PROFILE_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.FETCH_PROFILE_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				profile: action.profileData
			};
		case actionTypes.FETCH_PROFILE_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};

		case actionTypes.ADD_FOODS_HISTORY_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.ADD_FOODS_HISTORY_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				profile: action.profileData
			};
		case actionTypes.ADD_FOODS_HISTORY_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case actionTypes.REMOVE_FOOD_HISTORY_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.REMOVE_FOOD_HISTORY_SUCCESS:
			// deep copy old profile and removeID of foodsHistory
			const newFoodsHistory = state.profile.foodsHistory.filter(item => {
				return item._id !== action.removeId;
			});

			const newProfileData = {
				...state.profile,
				user: { ...state.profile.user },
				foodsHistory: newFoodsHistory
			};
			return {
				...state,
				loading: false,
				error: null,
				profile: newProfileData
			};
		case actionTypes.REMOVE_FOOD_HISTORY_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case actionTypes.ADD_MEAL_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.ADD_MEAL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				profile: action.profileData
			};
		case actionTypes.ADD_MEAL_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};

		case actionTypes.FETCH_MEALS_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.FETCH_MEALS_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				profile: action.profileData
			};
		case actionTypes.FETCH_MEALS_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};

		case actionTypes.REMOVE_MEAL_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.REMOVE_MEAL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				profile: action.profileData
			};
		case actionTypes.REMOVE_MEAL_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};
		default:
			return state;
	}
};

export default reducer;
