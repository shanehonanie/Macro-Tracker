import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllFoods from './AllFoods/AllFoods';
import AddMeal from './Meals/AddMeal';
import AllFoodFilter from '../../../components/UI/AllFoodFilter';
import * as actions from '../../../store/actions/index';

export class AddToDiary extends Component {
	state = {
		selectedDate: '',
		mealName: '',
		uniqueMeals: [],
		filtered: null,
		filteredText: ''
	};

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	// console.log('[AddToDiary.js] getDerivedStateFromprops nextProps', nextProps);
	// 	// console.log('[AddToDiary.js] getDerivedStateFromprops prevState', prevState);
	// 	if (prevState.uniqueMealItems.length === 0 && nextProps.meals) {
	// 		return {
	// 			uniqueMealItems: nextProps.meals
	// 		};
	// 	}
	// 	return null;
	// }

	componentDidMount() {
		//console.log('[AddToDiary.js] componentDidMount');
		this.setState({
			selectedDate: this.props.location.state.date,
			mealName: this.props.location.state.mealName
		});

		if (this.props.profile === null) {
			this.props.onGetCurrentProfile(this.props.token);
		}
		this.props.onGetFoodsDatabase();

		if (this.props.profile) {
			let uniqueMealsTemp = [
				...new Set(this.props.profile.meals.map(item => item.mealName))
			];
			uniqueMealsTemp.sort();
			this.setState({ uniqueMeals: uniqueMealsTemp });
		}
	}

	addMealsToFoodsHistoryHandler = mealsChecked => {
		let matchingFoods = this.props.profile.meals.filter(item => {
			return mealsChecked.includes(item.mealName);
		});

		// console.log(
		// 	'[AddToDiary.js] addMealsToFoodsHistoryHandler matchingFoods',
		// 	matchingFoods
		// );

		let foodsHistoryArray = [];

		for (let i = 0; i < matchingFoods.length; i++) {
			const foodsHistoryData = {
				foodName: matchingFoods[i].foodName,
				foodId: matchingFoods[i].foodId,
				mealOfDay: this.state.mealName,
				serving: matchingFoods[i].serving,
				date: this.state.selectedDate,
				description: 'testing'
			};
			foodsHistoryArray.push(foodsHistoryData);
		}
		this.props.onCreateFoodsHistoryBulk(foodsHistoryArray, this.props.token);
		//this.props.history.push('/foodDiary');
		this.historyPushToFoodDiary();
	};

	deleteMealClickedHandler = mealName => {
		//console.log('[AddToDiary.js] deleteMealClickedHandler mealName', mealName);
		this.props.onDeleteMeal(mealName, this.props.token);
	};

	onSaveAllFoods = foodsArray => {
		let foodsHistoryArray = [];
		//console.log('[AddToDiary.js] onSaveAllFoods foodsArray', foodsArray);

		for (let i = 0; i < foodsArray.length; i++) {
			const foodsHistoryData = {
				foodName: foodsArray[i].foodArr.name,
				foodId: foodsArray[i].foodArr._id,
				mealOfDay: foodsArray[i].mealOfDay,
				serving: foodsArray[i].serving,
				date: foodsArray[i].date,
				description: foodsArray[i].description
			};
			foodsHistoryArray.push(foodsHistoryData);
		}

		// console.log(
		// 	'[AddToDiary.js] onSaveAllFoods foodsHistoryArray',
		// 	foodsHistoryArray
		// );
		this.props.onCreateFoodsHistoryBulk(foodsHistoryArray, this.props.token);
		// this.props.history.push('/foodDiary');
		this.historyPushToFoodDiary();
	};

	historyPushToFoodDiary = () => {
		this.props.history.push({
			pathname: '/foodDiary',
			state: { selectedDate: this.state.selectedDate }
		});
	};

	getTextFromChild = text => {
		//console.log('AddToDiary.js text: ' + text);
		this.setState({ filteredText: text });
	};

	render() {
		let uniqueMealsTemp = null;

		if (this.props.profile) {
			uniqueMealsTemp = [
				...new Set(this.props.profile.meals.map(item => item.mealName))
			];
			uniqueMealsTemp.sort();
		}
		// console.log('[AddToDiary.js] uniqueMealsTemp', uniqueMealsTemp);

		return (
			<div className='container mt-5'>
				<nav>
					<div className='nav nav-tabs' id='nav-tab' role='tablist'>
						<a
							className='nav-item nav-link active'
							id='nav-allFoods-tab'
							data-toggle='tab'
							href='#nav-allFoods'
							role='tab'
							aria-controls='nav-allFoods'
							aria-selected='true'
						>
							All Foods
						</a>
						<a
							className='nav-item nav-link'
							id='nav-meals-tab'
							data-toggle='tab'
							href='#nav-meals'
							role='tab'
							aria-controls='nav-meals'
							aria-selected='false'
						>
							Meals
						</a>
						<a
							className='nav-item nav-link'
							id='nav-recent-tab'
							data-toggle='tab'
							href='#nav-recent'
							role='tab'
							aria-controls='nav-recent'
							aria-selected='false'
						>
							Recent
						</a>
					</div>
				</nav>
				<div className='tab-content' id='nav-tabContent'>
					<div
						className='tab-pane fade show active mt-1'
						id='nav-allFoods'
						role='tabpanel'
						aria-labelledby='nav-allFoods-tab'
					>
						<AllFoodFilter
							filtered={this.props.filtered}
							filterAllFoods={this.props.onFilterAllFoods}
							clearFilter={this.props.onClearFilter}
							gt={this.getTextFromChild}
						/>
						<AllFoods
							date={this.state.selectedDate}
							mealOfDay={this.state.mealName}
							foodsDatabase={this.props.foodsDatabase}
							onSaveAllFoods={this.onSaveAllFoods}
							filtered={this.props.filtered}
							filteredText={this.state.filteredText}
						/>
					</div>
					<div
						className='tab-pane fade'
						id='nav-meals'
						role='tabpanel'
						aria-labelledby='nav-meals-tab'
					>
						<AddMeal
							meals={uniqueMealsTemp}
							addToHistory={this.addMealsToFoodsHistoryHandler}
							onClick={this.deleteMealClickedHandler}
							profileLoading={this.props.loading}
						/>
					</div>
					<div
						className='tab-pane fade'
						id='nav-recent'
						role='tabpanel'
						aria-labelledby='nav-recent-tab'
					>
						test 3
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		profile: state.profile.profile,
		loading: state.profile.loading,
		error: state.profile.error,
		foodsDatabase: state.food.foods,
		filtered: state.food.filtered
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token)),
		onCreateFoodsHistoryBulk: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistoryBulk(foodsHistoryData, token)),
		onDeleteMeal: (mealName, token) =>
			dispatch(actions.removeMeal(mealName, token)),
		onGetFoodsDatabase: () => dispatch(actions.fetchFoods()),
		onFilterAllFoods: text => dispatch(actions.filterAllFoods(text)),
		onClearFilter: () => dispatch(actions.clearFilter())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToDiary);
