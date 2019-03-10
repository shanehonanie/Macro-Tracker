import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addProfileStart = () => {
	return {
		type: actionTypes.ADD_PROFILE_START
	};
};

export const addProfileSuccess = profileData => {
	return {
		type: actionTypes.ADD_PROFILE_SUCCESS,
		profileData: profileData
	};
};

export const addProfileFail = error => {
	return {
		type: actionTypes.ADD_PROFILE_FAIL,
		error: error
	};
};

export const addProfile = (profileData, token) => {
	return dispatch => {
		dispatch(addProfileStart());

		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.post('/api/profile', profileData, { headers: headers })
			.then(response => {
				console.log('[profile.js] action response.data', response.data);
				dispatch(addProfileSuccess(profileData));
			})
			.catch(err => {
				console.log('[profile.js] actions error', err);
				dispatch(addProfileFail(err.response.data));
			});
	};
};

export const addFoodsHistoryStart = () => {
	return {
		type: actionTypes.ADD_FOODS_HISTORY_START
	};
};

export const addFoodsHistorySuccess = foodsHistoryData => {
	return {
		type: actionTypes.ADD_FOODS_HISTORY_SUCCESS,
		foodsHistoryData: foodsHistoryData
	};
};

export const addFoodsHistoryFail = error => {
	return {
		type: actionTypes.ADD_FOODS_HISTORY_FAIL,
		error: error
	};
};

export const addFoodsHistory = (foodsHistoryData, token) => {
	return dispatch => {
		dispatch(addFoodsHistoryStart());

		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.post('/api/profile/foodsHistory', foodsHistoryData, { headers: headers })
			.then(response => {
				console.log('[profile.js] action response.data', response.data);
				dispatch(addFoodsHistorySuccess(response.data.name, foodsHistoryData));
			})
			.catch(err => {
				console.log('[profile.js] actions error', err);
				dispatch(addFoodsHistoryFail(err.response.data));
			});
	};
};
