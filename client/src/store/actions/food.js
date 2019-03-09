import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addFoodStart = () => {
	return {
		type: actionTypes.ADD_FOOD_START
	};
};

//export const addFoodSuccess = (id, orderData) => {
export const addFoodSuccess = foodData => {
	return {
		type: actionTypes.ADD_FOOD_SUCCESS,
		//orderId: id,
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

// export const purchaseInit = () => {
// 	return {
// 		type: actionTypes.PURCHASE_INIT
// 	};
// };

// export const fetchOrdersSuccess = orders => {
// 	return {
// 		type: actionTypes.FETCH_ORDERS_SUCCESS,
// 		orders: orders
// 	};
// };

// export const fetchOrdersFail = error => {
// 	return {
// 		type: actionTypes.FETCH_ORDERS_FAIL,
// 		error: error
// 	};
// };

// export const fetchOrdersStart = () => {
// 	return {
// 		type: actionTypes.FETCH_ORDERS_START
// 	};
// };

// export const fetchOrders = (token, userId) => {
// 	return dispatch => {
// 		dispatch(fetchOrdersStart());
// 		const queryParams =
// 			'?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
// 		axios
// 			.get('/orders.json' + queryParams)
// 			.then(res => {
// 				const fetchedOrders = [];
// 				for (let key in res.data) {
// 					fetchedOrders.push({
// 						...res.data[key],
// 						id: key
// 					});
// 				}
// 				dispatch(fetchOrdersSuccess(fetchedOrders));
// 			})
// 			.catch(err => {
// 				dispatch(fetchOrdersFail(err));
// 			});
// 	};
// };
