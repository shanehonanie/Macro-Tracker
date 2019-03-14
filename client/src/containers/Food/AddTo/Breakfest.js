import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import TextFieldGroup from '../../../components/UI/TextFieldGroup';
import SelectListGroup from '../../../components/UI/SelectListGroup';
import AddFoodTable from '../../../components/AddFoodTable/AddFoodTable';

export class Breakfest extends Component {
	state = {
		selectedItem: -1,
		mealOfDay: 'Breakfest',
		foodsArray: []
	};

	componentDidMount() {
		this.props.onGetFoodsDatabase();
	}

	listItemClickedHandler = (event, index) => {
		//console.log('[Breakfest.js] listItemClickedHandler index', index);
		this.setState({ selectedItem: index });
		//console.log('this.state.selectedItem', this.state.selectedItem);
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	addMealClickedHandler = event => {
		const newItem = {
			food: { ...this.props.foodsDatabase[this.state.selectedItem] },
			mealOfDay: this.state.mealOfDay,
			date: new Date(),
			description: 'testing'
		};

		this.setState({
			foodsArray: [...this.state.foodsArray, newItem]
		});

		//console.log('this.state.foodsArray', this.state.foodsArray);
	};

	saveFoodsClickedHandler = event => {
		console.log('saveFoodsClickedHandler');
	};

	render() {
		let data = null;
		let displayFoodList = null;
		let displayFoodItem = null;
		let displayTable = null;

		// Select options for status
		const options = [
			{ label: 'Breakfest', value: 'Breakfest' },
			{ label: 'Lunch', value: 'Lunch' },
			{ label: 'Dinner', value: 'Dinner' },
			{ label: 'Snack', value: 'Snack' }
		];

		if (!this.props.loading && this.props.foodsDatabase) {
			//console.log('this.props.foodsDatabase', this.props.foodsDatabase);

			data = this.props.foodsDatabase.map((food, index) => {
				//console.log(`Food: ${food.name} -- Index: ${index}`);
				return (
					<button
						type='button'
						key={index}
						onClick={event => this.listItemClickedHandler(event, index)}
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

		// if an item in the listgroup has been clicked
		if (this.state.selectedItem !== -1 && this.props.foodsDatabase) {
			displayFoodItem = (
				<div className='offset-lg-1 col-lg-4'>
					<h1>{this.props.foodsDatabase[this.state.selectedItem].name}</h1>
					<div className='row'>
						<TextFieldGroup
							placeholder='* Serving'
							name='serving'
							value={1.0}
							onChange={null}
							error={null}
							info='serving quantity'
						/>
						<p>
							{' '}
							{` serving of ${
								this.props.foodsDatabase[this.state.selectedItem].measurement
							}`}{' '}
						</p>
					</div>
					<div className='row'>
						<p>To which Meal</p>
					</div>
					<div className='row'>
						<SelectListGroup
							//placeholder='* Meal of Day'
							name='mealOfDay'
							value={this.state.mealOfDay}
							onChange={this.inputChangedHandler}
							options={options}
							error={null}
							info='Select the meal of the day'
						/>
					</div>
					<button type='button' onClick={this.addMealClickedHandler}>
						Add
					</button>
					<button type='button'>Nutrition</button>
				</div>
			);

			displayTable = <AddFoodTable data={this.state.foodsArray} />;
		}

		return (
			<div className='container'>
				<div className='row'>
					{displayFoodList}
					{displayFoodItem}
				</div>

				<div className='row mt-4'>{displayTable}</div>
				<div className='row mt-2'>
					<button
						type='button'
						className='btn btn-success'
						onClick={this.saveFoodsClickedHandler}
					>
						Save Data
					</button>
				</div>
			</div>
		);
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
