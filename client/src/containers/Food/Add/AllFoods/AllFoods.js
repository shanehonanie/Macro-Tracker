import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions/index';
import TextFieldGroupNumber from '../../../../components/UI/TextFieldGroupNumber';
import SelectListGroup from '../../../../components/UI/SelectListGroup';
import AddFoodTable from '../../../../components/Table/AddFoodTable';

export class Breakfest extends Component {
	state = {
		selectedItem: -1,
		mealOfDay: 'Breakfest',
		serving: 1.0,
		date: Date.now(),
		//date: this.props.location.state.date,
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

	deleteClickedHandler = index => {
		const newArray = [...this.state.foodsArray];
		newArray.splice(index, 1);
		this.setState({
			foodsArray: newArray
		});
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	addMealClickedHandler = event => {
		const newItem = {
			foodArr: { ...this.props.foodsDatabase[this.state.selectedItem] },
			food: this.props.foodsDatabase[this.state.selectedItem].name,
			mealOfDay: this.state.mealOfDay,
			serving: this.state.serving,
			date: this.state.date,
			description: 'testing'
		};

		this.setState({
			foodsArray: [...this.state.foodsArray, newItem]
		});

		//console.log('this.state.foodsArray', this.state.foodsArray);
	};

	saveFoodsClickedHandler = event => {
		//console.log('saveFoodsClickedHandler');
		//console.log('this.state.foodsArray[0]', this.state.foodsArray[0]);

		for (let i = 0; i < this.state.foodsArray.length; i++) {
			//console.log('i: ' + i);
			//console.log('this.state.foodsArray[i]', this.state.foodsArray[i]);
			this.props.onCreateFoodsHistory(
				this.state.foodsArray[i],
				this.props.token
			);
		}
		this.props.history.push('/addFood');
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
						<TextFieldGroupNumber
							placeholder='* Serving'
							name='serving'
							value={this.state.serving}
							onChange={this.inputChangedHandler}
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

			displayTable = (
				<AddFoodTable
					data={this.state.foodsArray}
					onClick={this.deleteClickedHandler}
				/>
			);
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
