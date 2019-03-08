const initialState = {
	isAuthenticated: false,
	user: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// case actionTypes.AUTH_START:
		// 	return authStart(state, action);
		// case actionTypes.AUTH_SUCCESS:
		// 	return authSuccess(state, action);
		// case actionTypes.AUTH_FAIL:
		// 	return authFail(state, action);
		// case actionTypes.AUTH_LOGOUT:
		// 	return authLogout(state, action);
		// case actionTypes.SET_AUTH_REDIRECT_PATH:
		// 	return setAuthRedirectPath(state, action);
		default:
			return state;
	}
};

export default reducer;
