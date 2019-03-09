import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';

export class Food extends Component {
	state = {
		name: '',
		brand: '',
		portion: '',
		measurement: '',
		meal: '',
		calories: '',
		fat: '',
		protein: '',
		carbs: '',
		fiber: '',
		error: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
			// console.log('componentWillReceieve');
			// console.log('this.state.error', this.state.error);
			//console.log('nextProps', nextProps);
		}
	}

	submitHandler = event => {
		event.preventDefault();

		//console.log('[Food.js] submitHandler this.props.userId', this.props.userId);
		const foodData = {
			name: this.state.name,
			brand: this.state.brand,
			portion: this.state.portion,
			measurement: this.state.measurement,
			meal: this.state.meal,
			calories: this.state.calories,
			fat: this.state.fat,
			protein: this.state.protein,
			carbs: this.state.carbs,
			fiber: this.state.fiber
		};

		this.props.onCreateFood(foodData, this.props.token);
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Add to Food Database</h1>
							<p className='lead text-center'>
								Fill out the nutrion information about the food
							</p>
							<small className='d-block pb-3'>* = required fields</small>
							<form onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder='* Name'
									name='name'
									value={this.state.name}
									onChange={this.inputChangedHandler}
									error={error.name}
									info='Name of food'
								/>
								<TextFieldGroup
									placeholder='* Brand'
									name='brand'
									value={this.state.brand}
									onChange={this.inputChangedHandler}
									error={error.brand}
									info='Brand of food'
								/>
								<TextFieldGroup
									placeholder='* Portion'
									name='portion'
									value={this.state.portion}
									onChange={this.inputChangedHandler}
									error={error.portion}
									info='Portion of food'
								/>
								<TextFieldGroup
									placeholder='* Measurement'
									name='measurement'
									value={this.state.measurement}
									onChange={this.inputChangedHandler}
									error={error.measurement}
									info='Measurement in grams or ounces'
								/>
								<TextFieldGroup
									placeholder='* Calories'
									name='calories'
									value={this.state.calories}
									onChange={this.inputChangedHandler}
									error={error.calories}
									info='Calories in food'
								/>
								<TextFieldGroup
									placeholder='* Fat'
									name='fat'
									value={this.state.fat}
									onChange={this.inputChangedHandler}
									error={error.fat}
									info='Fat in food'
								/>
								<TextFieldGroup
									placeholder='* Protein'
									name='protein'
									value={this.state.protein}
									onChange={this.inputChangedHandler}
									error={error.protein}
									info='Protein in Food'
								/>
								<TextFieldGroup
									placeholder='* Carbs'
									name='carbs'
									value={this.state.carbs}
									onChange={this.inputChangedHandler}
									error={error.carbs}
									info='Carbs in food'
								/>
								<TextFieldGroup
									placeholder='* Fiber'
									name='fiber'
									value={this.state.fiber}
									onChange={this.inputChangedHandler}
									error={error.fiber}
									info='Fiber in food'
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
		error: state.food.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFood: (foodData, token) =>
			dispatch(actions.addFood(foodData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Food);
