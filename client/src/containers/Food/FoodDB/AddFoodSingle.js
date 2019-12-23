import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import TextFieldGroup from '../../../components/UI/TextFieldGroup';
import SelectListGroup from '../../../components/UI/SelectListGroup';
import Alert from '../../../components/Layout/Alert';

export class AddFoodSingle extends Component {
	state = {
		name: '',
		brand: '',
		measurementQty: '',
		measurementUnit: '',
		volumeQty: '',
		volumeUnit: '',
		isMeasurementAsDefault: '',
		calories: '',
		protein: '',
		fat: '',
		carbs: '',
		fiber: '',
		sugar: '',
		source: '',
		description: '',
		error: {},
		alert: null
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

		const { error } = this.state;

		//console.log('[Food.js] submitHandler this.props.userId', this.props.userId);
		const foodData = {
			name: this.state.name,
			brand: this.state.brand,
			measurementQty: this.state.measurementQty,
			measurementUnit: this.state.measurementUnit,
			volumeQty: this.state.volumeQty,
			volumeUnit: this.state.volumeUnit,
			isMeasurementAsDefault: this.state.isMeasurementAsDefault,
			calories: this.state.calories,
			fat: this.state.fat,
			protein: this.state.protein,
			carbs: this.state.carbs,
			fiber: this.state.fiber,
			sugar: this.state.sugar,
			source: this.state.source,
			description: this.state.description
		};

		this.props.onCreateFood(foodData, this.props.token);

		if (Object.entries(error).length === 0 && error.constructor === Object) {
			this.resetForm();
			this.showAlert('Food Data Successfully Submitted', 'success');
			window.scrollTo(0, 0);
		}
	};

	resetForm = () => {
		this.setState({ name: '' });
		this.setState({ brand: '' });
		this.setState({ measurementQty: '' });
		this.setState({ measurementUnit: '' });
		this.setState({ volumeQty: '' });
		this.setState({ volumeUnit: '' });
		this.setState({ isMeasurementAsDefault: '' });
		this.setState({ calories: '' });
		this.setState({ protein: '' });
		this.setState({ fat: '' });
		this.setState({ carbs: '' });
		this.setState({ fiber: '' });
		this.setState({ sugar: '' });
		this.setState({ source: '' });
		this.setState({ description: '' });
		this.setState({ error: {} });
	};

	showAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });
		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;

		// Select options for default measurement
		const options = [
			{ label: 'Measurement', value: 'Measurement' },
			{ label: 'Volume', value: 'Volume' }
		];

		return (
			<div className='create-profile'>
				<div className='container'>
					<Alert alert={this.state.alert} />
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
								<SelectListGroup
									name='isMeasurementAsDefault'
									value={this.state.isMeasurementAsDefault}
									onChange={this.inputChangedHandler}
									options={options}
									error={null}
									info='Measurement Qty/Unit or Volume Qty/Unit is required, Choose the Default'
								/>
								<TextFieldGroup
									placeholder='Measurement Qty'
									name='measurementQty'
									value={this.state.measurementQty}
									onChange={this.inputChangedHandler}
									error={error.measurementQty}
									info='Amount of measurement'
								/>
								<TextFieldGroup
									placeholder='Measurement Unit'
									name='measurementUnit'
									value={this.state.measurementUnit}
									onChange={this.inputChangedHandler}
									error={error.measurementUnit}
									info='Unit of measure'
								/>
								<TextFieldGroup
									placeholder='Volume Qty'
									name='volumeQty'
									value={this.state.volumeQty}
									onChange={this.inputChangedHandler}
									error={error.volumeQty}
									info='Amount of volume'
								/>
								<TextFieldGroup
									placeholder='Volume Unit'
									name='volumeUnit'
									value={this.state.volumeUnit}
									onChange={this.inputChangedHandler}
									error={error.volumeUnit}
									info='Volume of measure'
								/>
								<TextFieldGroup
									placeholder='Brand'
									name='brand'
									value={this.state.brand}
									onChange={this.inputChangedHandler}
									error={error.brand}
									info='Brand of food'
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
									placeholder='* Protein'
									name='protein'
									value={this.state.protein}
									onChange={this.inputChangedHandler}
									error={error.protein}
									info='Protein in food'
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
								<TextFieldGroup
									placeholder='* Sugar'
									name='sugar'
									value={this.state.sugar}
									onChange={this.inputChangedHandler}
									error={error.sugar}
									info='Sugar in food'
								/>
								<TextFieldGroup
									placeholder='Description'
									name='description'
									value={this.state.description}
									onChange={this.inputChangedHandler}
									error={error.description}
									info='Description'
								/>
								<TextFieldGroup
									placeholder='Source'
									name='source'
									value={this.state.source}
									onChange={this.inputChangedHandler}
									error={error.source}
									info='Source of nutrition info'
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

export default connect(mapStateToProps, mapDispatchToProps)(AddFoodSingle);
