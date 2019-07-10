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
		fat: 0,
		fiber: 0,
		sugar: 0
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	formatDate = dateStr => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateStr).toLocaleDateString([], options);
	};

	saveQuickCalories = () => {
		const newQuickAdd = {
			date: this.state.date,
			mealOfDay: this.state.mealOfDay,
			calories: this.state.calories.toString(),
			protein: this.state.protein.toString(),
			fat: this.state.fat.toString(),
			carbs: this.state.carbs.toString(),
			fiber: this.state.fiber.toString(),
			sugar: this.state.sugar.toString()
		};
		// console.log('newQuickAdd', newQuickAdd);
		this.props.onCreateQuickCalories(newQuickAdd, this.props.token);
		this.historyPushToFoodDiary();
	};

	historyPushToFoodDiary = () => {
		this.props.history.push({
			pathname: '/foodDiary',
			state: { selectedDate: this.state.date }
		});
	};

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
					fat={this.state.fat}
					carbs={this.state.carbs}
					fiber={this.state.fiber}
					sugar={this.state.sugar}
				/>
				<button
					type='button'
					className='btn btn-success'
					onClick={this.saveQuickCalories}
				>
					Save Data
				</button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateQuickCalories: (quickCaloriesData, token) =>
			dispatch(actions.addQuickCalories(quickCaloriesData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuickAdd);
