import * as actionTypes from '../actions/actionTypes';

const initialState = {
	profile: null,
	foodsHistory: [],
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

		case actionTypes.ADD_FOODS_HISTORY_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.ADD_FOODS_HISTORY_SUCCESS:
			const newFoodsHistory = {
				...action.foodsHistoryData
				//id: action.profileId
			};
			return {
				...state,
				loading: false,
				error: null,
				foodsHistory: state.foodsHistory.concat(newFoodsHistory)
			};
		case actionTypes.ADD_FOODS_HISTORY_FAIL:
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
