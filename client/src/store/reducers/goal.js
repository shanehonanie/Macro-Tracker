import * as actionTypes from '../actions/actionTypes';

const initialState = {
	goal: null,
	error: null,
	loading: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_GOAL_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.ADD_GOAL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				goal: action.goalData
			};
		case actionTypes.ADD_GOAL_FAIL:
			return {
				...state,
				error: action.error,
				loading: false
			};
		case actionTypes.FETCH_GOAL_START:
			return {
				...state,
				error: null,
				loading: true
			};
		case actionTypes.FETCH_GOAL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				goal: action.goalData
			};
		case actionTypes.FETCH_GOAL_FAIL:
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
