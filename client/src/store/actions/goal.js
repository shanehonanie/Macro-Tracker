import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addGoalStart = () => {
	return {
		type: actionTypes.ADD_GOAL_START
	};
};

export const addGoalSuccess = goalsData => {
	return {
		type: actionTypes.ADD_GOAL_SUCCESS,
		goalsData: goalsData
	};
};

export const addGoalFail = error => {
	return {
		type: actionTypes.ADD_GOAL_FAIL,
		error: error
	};
};

export const addGoal = (goalData, token) => {
	return dispatch => {
		dispatch(addGoalStart());

		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.post('/api/goals', goalData, { headers: headers })
			.then(response => {
				console.log('[goals.js] action response.data', response.data);
				dispatch(addGoalSuccess(response.data.name, goalData));
			})
			.catch(err => {
				console.log('[goal.js] actions error', err);
				dispatch(addGoalFail(err.response.data));
			});
	};
};
