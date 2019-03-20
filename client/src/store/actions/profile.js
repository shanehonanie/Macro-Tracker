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

export const addFoodsHistorySuccess = profileData => {
	return {
		type: actionTypes.ADD_FOODS_HISTORY_SUCCESS,
		profileData: profileData
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
				//console.log('[profile.js] action response.data', response.data);
				dispatch(addFoodsHistorySuccess(response.data));
			})
			.catch(err => {
				console.log('[profile.js] actions error', err);
				dispatch(addFoodsHistoryFail(err.response.data));
			});
	};
};

export const removeFoodHistoryStart = () => {
	return {
		type: actionTypes.REMOVE_FOOD_HISTORY_START
	};
};

export const removeFoodHistorySuccess = id => {
	return {
		type: actionTypes.REMOVE_FOOD_HISTORY_SUCCESS,
		removeId: id
	};
};

export const removeFoodHistoryFail = error => {
	return {
		type: actionTypes.REMOVE_FOOD_HISTORY_FAIL,
		error: error
	};
};

export const removeFoodHistory = (id, token) => {
	return dispatch => {
		dispatch(removeFoodHistoryStart());

		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.delete('/api/profile/foodsHistory/' + id, { headers: headers })
			.then(response => {
				dispatch(removeFoodHistorySuccess(id));
			})
			.catch(err => {
				console.log('[profile.js]  removeFoodHistory actions error', err);
				dispatch(removeFoodHistoryFail(err.response.data));
			});
	};
};

export const fetchCurrentProfileStart = () => {
	return {
		type: actionTypes.FETCH_PROFILE_START
	};
};

export const fetchCurrentProfileSuccess = profileData => {
	return {
		type: actionTypes.FETCH_PROFILE_SUCCESS,
		profileData: profileData
	};
};

export const fetchCurrentProfileFail = error => {
	return {
		type: actionTypes.FETCH_PROFILE_FAIL,
		error: error
	};
};

export const fetchCurrentProfile = token => {
	return dispatch => {
		dispatch(fetchCurrentProfileStart());

		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.get('/api/profile', { headers: headers })
			.then(response => {
				//console.log('[profile.js] action response.data', response.data);
				dispatch(fetchCurrentProfileSuccess(response.data));
			})
			.catch(err => {
				console.log('[profile.js] actions error', err);
				dispatch(fetchCurrentProfileFail(err.response.data));
			});
	};
};

export const addMealStart = () => {
	return {
		type: actionTypes.ADD_MEAL_START
	};
};

export const addMealSuccess = profileData => {
	return {
		type: actionTypes.ADD_MEAL_SUCCESS,
		profileData: profileData
	};
};

export const addMealFail = error => {
	return {
		type: actionTypes.ADD_MEAL_FAIL,
		error: error
	};
};

export const addMeal = (mealData, token) => {
	return dispatch => {
		dispatch(addMealStart());
		console.log('[profile.js] addMeal reducer mealData', mealData);
		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.post('/api/profile/meals', mealData, { headers: headers })
			.then(response => {
				//console.log('[profile.js] action response.data', response.data);
				dispatch(addMealSuccess(response.data));
			})
			.catch(err => {
				console.log('[profile.js] addMeal reducer error', err);
				dispatch(addMealFail(err.response.data));
			});
	};
};
//////////////////////////
export const removeMealStart = () => {
	return {
		type: actionTypes.REMOVE_MEAL_START
	};
};

export const removeMealSuccess = profileData => {
	return {
		type: actionTypes.REMOVE_MEAL_SUCCESS,
		profileData: profileData
	};
};

export const removeMealFail = error => {
	return {
		type: actionTypes.REMOVE_MEAL_FAIL,
		error: error
	};
};

export const removeMeal = (mealName, token) => {
	return dispatch => {
		dispatch(removeMealStart());
		//console.log('[profile.js] removeMeal reducer mealName', mealName);
		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.delete('/api/profile/meals/' + mealName, { headers: headers })
			.then(response => {
				//console.log('[profile.js] action response.data', response.data);
				dispatch(removeMealSuccess(response.data));
			})
			.catch(err => {
				console.log('[profile.js] removeMeal reducer error', err);
				dispatch(removeMealFail(err.response.data));
			});
	};
};
