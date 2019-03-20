import React, { Component } from 'react';
import { connect } from 'react-redux';

import AllFoods from './AllFoods/AllFoods';
import AddMeal from './Meals/AddMeal';
// import AddMealTable from '../../../components/Table/AddMealTable';
// import Spinner from '../../../components/UI/Spinner';
import * as actions from '../../../store/actions/index';

export class AddToDiary extends Component {
	state = {
		selectedDate: '',
		mealName: '',
		uniqueMeals: []
	};

	componentDidMount() {
		this.setState({
			selectedDate: this.props.location.state.date,
			mealName: this.props.location.state.mealName
		});

		this.props.onGetCurrentProfile(this.props.token);

		if (this.props.profile) {
			let uniqueMealsTemp = [
				...new Set(this.props.profile.meals.map(item => item.mealName))
			];
			uniqueMealsTemp.sort();
			this.setState({ uniqueMeals: uniqueMealsTemp });
		}
	}

	addMealsToFoodsHistoryHandler = mealsChecked => {
		// console.log('[AddToDiary.js] addMealsToFoodsHistoryHandler');
		// console.log('[AddToDiary.js] mealChecked', mealsChecked);
		//console.log(this.props.profile);

		let matchingFoods = this.props.profile.meals.filter(item => {
			return mealsChecked.includes(item.mealName);
		});

		// console.log(
		// 	'[AddToDiary.js] addMealsToFoodsHistoryHandler matchingFoods',
		// 	matchingFoods
		// );

		for (let i = 0; i < matchingFoods.length; i++) {
			const foodsHistoryData = {
				food: matchingFoods[i].food,
				mealOfDay: this.state.mealName,
				serving: matchingFoods[i].serving,
				date: this.state.selectedDate,
				description: 'testing'
			};
			this.props.onCreateFoodsHistory(foodsHistoryData, this.props.token);
		}
		this.props.history.push('/foodDiary');
	};

	render() {
		return (
			<div className='container'>
				<nav>
					<div className='nav nav-tabs' id='nav-tab' role='tablist'>
						<a
							className='nav-item nav-link active'
							id='nav-home-tab'
							data-toggle='tab'
							href='#nav-home'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
						>
							All Foods
						</a>
						<a
							className='nav-item nav-link'
							id='nav-profile-tab'
							data-toggle='tab'
							href='#nav-profile'
							role='tab'
							aria-controls='nav-profile'
							aria-selected='false'
						>
							Meals
						</a>
						<a
							className='nav-item nav-link'
							id='nav-contact-tab'
							data-toggle='tab'
							href='#nav-contact'
							role='tab'
							aria-controls='nav-contact'
							aria-selected='false'
						>
							Recent
						</a>
					</div>
				</nav>
				<div className='tab-content' id='nav-tabContent'>
					<div
						className='tab-pane fade show active'
						id='nav-home'
						role='tabpanel'
						aria-labelledby='nav-home-tab'
					>
						<AllFoods
							date={this.state.selectedDate}
							mealOfDay={this.state.mealName}
							history={this.props.history}
						/>
					</div>
					<div
						className='tab-pane fade'
						id='nav-profile'
						role='tabpanel'
						aria-labelledby='nav-profile-tab'
					>
						<AddMeal
							meals={this.state.uniqueMeals}
							addToHistory={this.addMealsToFoodsHistoryHandler}
						/>
					</div>
					<div
						className='tab-pane fade'
						id='nav-contact'
						role='tabpanel'
						aria-labelledby='nav-contact-tab'
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
		error: state.profile.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token)),
		onCreateFoodsHistory: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistory(foodsHistoryData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddToDiary);
