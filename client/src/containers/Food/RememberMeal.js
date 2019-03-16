import React, { Component } from 'react';

import TextFieldGroup from '../../components/UI/TextFieldGroup';
import MealTable from '../../components/Table/MealTable';

export class RememberMeal extends Component {
	state = {
		mealName: '',
		foodsData: this.props.location.state.data
	};

	componentDidMount() {
		console.log(
			'[RememberMeal.js] this.props.location.state.data',
			this.state.foodsData
		);
	}

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	saveMealHandler = () => {
		console.log('[RememberMeal.js] saveMealHandler');
	};

	cancelMealHandler = () => {
		console.log('[RememberMeal.js] cancelMealHandler');
	};

	render() {
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
							error={null}
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
							className='btn btn-success'
							onClick={this.cancelMealHandler}
						>
							Save Meal
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

export default RememberMeal;
