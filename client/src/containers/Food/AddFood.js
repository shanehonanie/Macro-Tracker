import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';
import SelectListGroup from '../../components/UI/SelectListGroup';
import TextAreaFieldGroup from '../../components/UI/TextAreaFieldGroup';

export class AddFood extends Component {
	state = {
		food: '',
		mealOfDay: '',
		description: '',
		//date: '',
		error: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	submitHandler = event => {
		event.preventDefault();

		const foodsHistoryData = {
			food: this.state.food,
			mealOfDay: this.state.mealOfDay,
			description: this.state.description
		};

		this.props.onCreateFoodsHistory(foodsHistoryData, this.props.token);
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;

		// Select options for status
		const options = [
			{ label: '* Meal of Day', value: 0 },
			{ label: 'Breakfest', value: 'Breakfest' },
			{ label: 'Lunch', value: 'Lunch' },
			{ label: 'Dinner', value: 'Dinner' },
			{ label: 'Snack 1', value: 'Snack 1' },
			{ label: 'Snack 2', value: 'Snack 2' },
			{ label: 'Snack 3', value: 'Snack 3' },
			{ label: 'Snack 4', value: 'Snack 4' },
			{ label: 'Snack 5', value: 'Snack 5' },
			{ label: 'Other', value: 'Other' }
		];

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Add to Food History</h1>
							<p className='lead text-center'>Fill out the food information</p>
							<small className='d-block pb-3'>* = required fields</small>
							<form onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder='* Food Name'
									name='food'
									value={this.state.food}
									onChange={this.inputChangedHandler}
									error={error.food}
									info='Name of food'
								/>
								<SelectListGroup
									placeholder='* Meal of Day'
									name='mealOfDay'
									value={this.state.mealOfDay}
									onChange={this.inputChangedHandler}
									options={options}
									error={error.mealOfDay}
									info='Select the meal of the day'
								/>
								<TextAreaFieldGroup
									placeholder='* Short Description'
									name='description'
									value={this.state.description}
									onChange={this.inputChangedHandler}
									error={error.description}
									info='Note if needed'
								/>
								<input
									type='submit'
									value='Submit'
									className='btn btn-info btn-block mt-4'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.profile.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsHistory: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistory(foodsHistoryData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFood);
