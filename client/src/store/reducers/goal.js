import * as actionTypes from '../actions/actionTypes';

const initialState = {
	goals: [],
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
			const newGoal = {
				...action.goalData,
				id: action.goalId
			};
			return {
				...state,
				loading: false,
				error: null,
				goals: state.goals.concat(newGoal)
			};
		case actionTypes.ADD_GOAL_FAIL:
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
