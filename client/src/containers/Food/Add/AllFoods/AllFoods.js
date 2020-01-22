import React, { Component } from 'react';

import TextFieldGroupNumber from '../../../../components/UI/TextFieldGroupNumber';
import SelectListGroup from '../../../../components/UI/SelectListGroup';
import AddFoodTable from '../../../../components/Table/AddFoodTable';

export class AllFoods extends Component {
	state = {
		selectedItem: -1,
		mealOfDay: '',
		serving: 1.0,
		date: '',
		foodsArray: []
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		// console.log('[AllFoods.js] getDerivedStateFromprops nextProps', nextProps);
		// console.log('[AllFoods.js] getDerivedStateFromprops prevState', prevState);
		if (prevState.date === '' && nextProps.date) {
			return {
				date: nextProps.date,
				mealOfDay: nextProps.mealOfDay
			};
		}
		return null;
	}

	listItemClickedHandler = (event, index) => {
		// change to default 1 if new item selected
		if (this.state.selectedItem !== index) {
			this.setState({ serving: 1 });
		}

		this.setState({ selectedItem: index });
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
		let foodData = this.props.foodsDatabase;
		let filteredFoodsData = this.props.filtered;

		let foodDB = filteredFoodsData !== null ? filteredFoodsData : foodData;

		const newItem = {
			foodArr: { ...foodDB[this.state.selectedItem] },
			food: foodDB[this.state.selectedItem].name,
			mealOfDay: this.state.mealOfDay,
			serving: this.state.serving,
			date: this.state.date,
			description: 'testing'
		};

		this.setState({
			foodsArray: [...this.state.foodsArray, newItem]
		});
	};

	render() {
		let data = null;
		let filteredData = null;
		let displayFoodList = null;
		let displayFoodItem = null;
		let displayTable = null;
		let foodData = this.props.foodsDatabase;
		let filteredFoodsData = this.props.filtered;

		let foodDB = filteredFoodsData !== null ? filteredFoodsData : foodData;
		//console.log('AllFoods.js filteredText: ' + this.props.filteredText);

		// Select options for status
		const options = [
			{ label: 'Breakfest', value: 'Breakfest' },
			{ label: 'Lunch', value: 'Lunch' },
			{ label: 'Dinner', value: 'Dinner' },
			{ label: 'Snack', value: 'Snack' }
		];

		// Map food items to listItems
		if (!this.props.loading && foodDB) {
			//console.log('foodDB', foodDB);

			data = foodDB.map((food, index) => {
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

			if (this.props.filtered) {
				filteredData = this.props.filtered.map((food, index) => {
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
			}

			displayFoodList = (
				<div className='list-group col-lg-4 mt-1'>
					{this.props.filtered ? filteredData : data}
				</div>
			);
		}

		// if an item in the listgroup has been clicked
		if (this.state.selectedItem !== -1 && foodData) {
			displayFoodItem = (
				<div className='offset-lg-1 col-lg-4'>
					{/* <h1>{foodDB[this.state.selectedItem].name}</h1> */}
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
							{/* Serving of{' '} */}
							{/* {foodDB[this.state.selectedItem].isMeasurementAsDefault
								? foodDB[this.state.selectedItem].measurementQty +
								  ' ' +
								  foodDB[this.state.selectedItem].measurementUnit
								: foodDB[this.state.selectedItem].volumeQty +
								  ' ' +
								  foodDB[this.state.selectedItem].volumeUnit} */}
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
						onClick={() => this.props.onSaveAllFoods(this.state.foodsArray)}
					>
						Save Data
					</button>
				</div>
			</div>
		);
	}
}

export default AllFoods;
