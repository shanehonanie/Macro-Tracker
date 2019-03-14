import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

export class Breakfest extends Component {
	state = {
		selectedItem: -1
	};

	componentDidMount() {
		this.props.onGetFoodsDatabase();
	}

	render() {
		let data = null;
		let displayFoodList = null;
		let displayFoodItem = null;

		if (!this.props.loading && this.props.foodsDatabase) {
			console.log('this.props.foodsDatabase', this.props.foodsDatabase);

			data = this.props.foodsDatabase.map((food, index) => {
				console.log(`Food: ${food.name} -- Index: ${index}`);
				return (
					<button
						type='button'
						key={index}
						className='list-group-item list-group-item-action'
					>
						{food.name}
					</button>
				);
			});

			displayFoodList = (
				<div className='list-group offset-lg-1 col-lg-4'>{data}</div>
			);
		}
		return <div className='container'>{displayFoodList}</div>;
	}
}

const mapStateToProps = state => {
	return {
		error: state.profile.error,
		token: state.auth.token,
		foodsDatabase: state.food.foods,
		loading: state.food.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsHistory: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistory(foodsHistoryData, token)),
		onGetFoodsDatabase: () => dispatch(actions.fetchFoods())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Breakfest);
