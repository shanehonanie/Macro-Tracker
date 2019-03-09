import * as actionTypes from '../actions/actionTypes';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// case actionTypes.PURCHASE_INIT:
		// 	return {
		// 		...state,
		// 		purchased: false
		// 	};
		case actionTypes.ADD_FOOD_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.ADD_FOOD_SUCCESS:
			const newOrder = {
				...action.orderData,
				id: action.orderId
			};
			return {
				...state,
				loading: false,
				purchased: true,
				orders: state.orders.concat(newOrder)
			};
		case actionTypes.ADD_FOOD_FAIL:
			return {
				...state,
				loading: false
			};
		case actionTypes.FETCH_FOODS_START:
			return {
				...state,
				loading: true
			};
		case actionTypes.FETCH_FOODS_SUCCESS:
			return {
				...state,
				orders: action.orders,
				loading: false
			};
		case actionTypes.FETCH_FOODS_FAIL:
			return {
				...state,
				loading: false
			};
		default:
			return state;
	}
};

export default reducer;
