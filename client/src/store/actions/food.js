import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addFoodStart = () => {
	return {
		type: actionTypes.ADD_FOOD_START
	};
};

export const addFoodSuccess = foodData => {
	return {
		type: actionTypes.ADD_FOOD_SUCCESS,
		foodData: foodData
	};
};

export const addFoodFail = error => {
	return {
		type: actionTypes.ADD_FOOD_FAIL,
		error: error
	};
};

export const addFood = (foodData, token) => {
	return dispatch => {
		dispatch(addFoodStart());

		var headers = {
			'Content-Type': 'application/json',
			Authorization: token
		};

		axios
			.post('/api/foods', foodData, { headers: headers })
			.then(response => {
				console.log('[food.js] action response.data', response.data);
				dispatch(addFoodSuccess(response.data.name, foodData));
			})
			.catch(err => {
				console.log('[food.js] actions error', err);
				dispatch(addFoodFail(err.response.data));
			});
	};
};

export const fetchFoodsStart = () => {
	return {
		type: actionTypes.FETCH_FOODS_START
	};
};

export const fetchFoodsSuccess = foods => {
	return {
		type: actionTypes.FETCH_FOODS_SUCCESS,
		foods: foods
	};
};

export const fetchFoodsFail = error => {
	return {
		type: actionTypes.FETCH_FOODS_FAIL,
		error: error
	};
};

export const fetchFoods = () => {
	return dispatch => {
		dispatch(fetchFoodsStart());

		axios
			.get('/api/foods')
			.then(response => {
				dispatch(fetchFoodsSuccess(response.data));
			})
			.catch(err => {
				dispatch(fetchFoodsFail(err.response.data));
			});
	};
};

export const filterAllFoods = text => {
	return {
		type: actionTypes.FILTER_ALL_FOODS,
		payload: text
	};
};

export const clearFilter = () => {
	return {
		type: actionTypes.CLEAR_FILTER
	};
};
