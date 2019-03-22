import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuickAddTable from '../../../../components/Table/QuickAddTable';
import * as actions from '../../../../store/actions/index';

export class QuickAdd extends Component {
	state = {
		mealOfDay: this.props.location.state.mealName,
		date: this.props.location.state.date,
		calories: 0,
		protein: 0,
		carbs: 0,
		fats: 0,
		fiber: 0
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	formatDate = string => {
		var options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(string).toLocaleDateString([], options);
	};

	// saveQuickAddtoFoodsHistory = () => {
	// console.log(
	// 	'[QuickAdd.js] saveQuickAddtoFoodsHistory quickAddData',
	// 	quickAddData
	// );
	// let foodsHistoryArray = [];
	// create newItem to format data correctly
	// const newItem = {
	// 	foodName: 'Quick Add',
	// 	foodId: '',
	// 	mealOfDay: this.state.mealOfDay,
	// 	serving: 1,
	// 	date: this.state.date,
	// 	description: 'testing'
	// };
	// foodsHistoryArray.push(newItem);
	// this.props.onCreateFoodsHistoryBulk(foodsHistoryArray, this.props.token);
	// };

	render() {
		return (
			<div className='container'>
				<div className='row'>
					{' '}
					<h2>Quick Add to {this.formatDate(this.state.date)}</h2>
				</div>
				<QuickAddTable
					inputChangedHandler={this.inputChangedHandler}
					mealOfDay={this.state.mealOfDay}
					calories={this.state.calories}
					protein={this.state.protein}
					carbs={this.state.carbs}
					fats={this.state.fats}
					fiber={this.state.fiber}
				/>
				<button type='button' className='btn btn-success' onClick={() => {}}>
					Save Data
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
		// profile: state.profile.profile,
		// goal: state.goal.goal,
		// profileLoading: state.profile.loading,
		// goalsLoading: state.goal.loading,
		// error: state.profile.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsHistoryBulk: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistoryBulk(foodsHistoryData, token))
	};
};

export default connect(
	null,
	mapDispatchToProps
)(QuickAdd);
