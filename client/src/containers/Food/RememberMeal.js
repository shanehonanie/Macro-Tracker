import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../../components/UI/TextFieldGroup';
import MealTable from '../../components/Table/MealTable';
import * as actions from '../../store/actions/index';

export class RememberMeal extends Component {
	state = {
		mealName: '',
		foodsData: this.props.location.state.data,
		qty: 1,
		error: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	saveMealHandler = () => {
		const mealItems = [];

		for (let i = 0; i < this.state.foodsData.length; i++) {
			const newMealItem = {
				mealName: this.state.mealName,
				food: this.state.foodsData[i].food._id,
				serving: this.state.foodsData[i].serving,
				mealOfDay: this.state.foodsData[i].mealOfDay,
				qty: this.state.qty
			};
			mealItems.push(newMealItem);
		}

		console.log('mealItems', mealItems);
		this.props.onCreateMeal(mealItems, this.props.token);
		this.props.history.push('/addFood');
	};

	cancelMealHandler = () => {
		this.props.history.goBack();
	};

	render() {
		const { error } = this.state;

		return (
			<div className='container'>
				<div className='row'>
					{' '}
					<h1>Remember a Meal</h1>
				</div>
				<div className='row'>
					{' '}
					<h4>Name this meal (i.e. "Healthy Supper")</h4>
				</div>
				<div className='row'>
					<div className='col-6'>
						<TextFieldGroup
							placeholder=' '
							name='mealName'
							value={this.state.mealName}
							onChange={this.inputChangedHandler}
							error={error.mealName}
							info='Meal Name'
						/>
					</div>
					<div className='col-2'>
						<button
							type='button'
							className='btn btn-success'
							onClick={this.saveMealHandler}
						>
							Save Meal
						</button>
					</div>
					<div className='col-2'>
						<button
							type='button'
							className='btn btn-danger'
							onClick={this.cancelMealHandler}
						>
							Cancel
						</button>
					</div>
				</div>
				<div className='row'>
					<MealTable
						data={this.state.foodsData}
						name='Items in Meal'
						linkTo={null}
						selectedDate={null}
						onClick={null}
						copyYesterday={null}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		error: state.profile.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateMeal: (mealData, token) =>
			dispatch(actions.addMeal(mealData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RememberMeal);
