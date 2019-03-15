import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../store/actions/index';
import MealTable from '../../components/Table/MealTable';
// import TextFieldGroup from '../../components/UI/TextFieldGroup';
// import SelectListGroup from '../../components/UI/SelectListGroup';
// import TextAreaFieldGroup from '../../components/UI/TextAreaFieldGroup';

export class AddFood extends Component {
	state = {
		food: '',
		mealOfDay: '',
		description: '',
		date: '',
		error: {},
		calendarDate: new Date()
	};

	componentDidMount() {
		this.props.onGetCurrentProfile(this.props.token);
		this.props.onGetGoals(this.props.token);
	}

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

	handleChange(date) {
		this.setState({
			calendarDate: date
		});

		// let day = date.getDate(); //returns date (1 to 31) you can getUTCDate() for UTC date
		// let month = date.getMonth() + 1; // returns 1 less than month count since it starts from 0
		// let year = date.getFullYear(); //returns year
		//console.log('month-day-year', `${month}/${day}/${year}`);
		//console.log('calendarDate in handleChange', this.state.calendarDate);
	}

	deleteClickedHandler = rowId => {
		//console.log('[AddFood.js] rowId', rowId);
		this.props.onDeleteFoodHistory(rowId, this.props.token);
	};

	isCalendarDate = otherDate => {
		// use tempDate because otherDate will be a Date String not a Date object
		let tempDate = new Date(otherDate);
		if (
			this.state.calendarDate.getMonth() === tempDate.getMonth() &&
			this.state.calendarDate.getDate() === tempDate.getDate() &&
			this.state.calendarDate.getFullYear() === tempDate.getFullYear()
		)
			return true;

		return false;
		// console.log('[AddFood.js] isCalendardate otherDate', otherDate);
		// console.log('otherDate instanceof Date', otherDate instanceof Date);
		// console.log('typeof otherDate', typeof otherDate);
	};

	render() {
		let breakfestItems = null;
		let lunchItems = null;
		let dinnerItems = null;
		let snackItems = null;
		let breakfestTable = null;
		let lunchTable = null;
		let dinnerTable = null;
		let snackTable = null;
		let calorieSum = 0;
		let proteinSum = 0;
		let carbsSum = 0;
		let fatSum = 0;
		let fiberSum = 0;
		let goalCalories = 0;
		let goalProtein = 0;
		let goalCarbs = 0;
		let goalFat = 0;
		let goalFiber = 0;
		let allItemsInSelectedDay = null;

		if (this.props.profile !== null) {
			allItemsInSelectedDay = this.props.profile.foodsHistory.filter(item =>
				this.isCalendarDate(item.date)
			);

			breakfestItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Breakfest' && this.isCalendarDate(item.date)
			);

			lunchItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Lunch' && this.isCalendarDate(item.date)
			);

			dinnerItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Dinner' && this.isCalendarDate(item.date)
			);

			snackItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Snack' && this.isCalendarDate(item.date)
			);

			breakfestTable = (
				<MealTable
					data={breakfestItems}
					name='Breakfest'
					linkTo={'/addBreakfestFood'}
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
				/>
			);
			lunchTable = (
				<MealTable
					data={lunchItems}
					name='Lunch'
					linkTo={'/addLunchFood'}
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
				/>
			);
			dinnerTable = (
				<MealTable
					data={dinnerItems}
					name='Dinner'
					linkTo={'/addDinnerFood'}
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
				/>
			);
			snackTable = (
				<MealTable
					data={snackItems}
					name='Snacks'
					linkTo={'/addSnackFood'}
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
				/>
			);

			for (let i = 0; i < allItemsInSelectedDay.length; i++) {
				calorieSum += allItemsInSelectedDay[i].food.calories;
				proteinSum += allItemsInSelectedDay[i].food.protein;
				carbsSum += allItemsInSelectedDay[i].food.carbs;
				fatSum += allItemsInSelectedDay[i].food.fat;
				fiberSum += allItemsInSelectedDay[i].food.fiber;
			}

			goalCalories = this.props.goal.dailyCalories;
			goalProtein = this.props.goal.dailyProtein;
			goalCarbs = this.props.goal.dailyCarbs;
			goalFat = this.props.goal.dailyFat;
			goalFiber = this.props.goal.dailyFiber;
		}

		return (
			<div className='add-food'>
				<div className='container'>
					<DatePicker
						selected={this.state.calendarDate}
						onChange={this.handleChange.bind(this)}
					/>
				</div>
				<div className='container'>{breakfestTable}</div>
				<div className='container'>{lunchTable}</div>
				<div className='container'>{dinnerTable}</div>
				<div className='container'>{snackTable}</div>

				<div className='container'>
					<table className='table'>
						<tbody>
							<tr>
								<th>Totals</th>
								<td>{calorieSum}</td>
								<td>{proteinSum}</td>
								<td>{carbsSum}</td>
								<td>{fatSum}</td>
								<td>{fiberSum}</td>
							</tr>
							<tr>
								<th>Your Daily Goal</th>
								<td>{goalCalories}</td>
								<td>{goalProtein}</td>
								<td>{goalCarbs}</td>
								<td>{goalFat}</td>
								<td>{goalFiber}</td>
							</tr>
							<tr>
								<th>Remaining</th>
								<td>{goalCalories - calorieSum}</td>
								<td>{goalProtein - proteinSum}</td>
								<td>{goalCarbs - carbsSum}</td>
								<td>{goalFat - fatSum}</td>
								<td>{goalFiber - fiberSum}</td>
							</tr>
							<tr>
								<th />
								<th>Calories</th>
								<th>Protein</th>
								<th>Carbs</th>
								<th>Fat</th>
								<th>Fiber</th>
							</tr>
						</tbody>
					</table>
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
		goal: state.goal.goal,
		error: state.profile.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsHistory: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistory(foodsHistoryData, token)),
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token)),
		onDeleteFoodHistory: (removeId, token) =>
			dispatch(actions.removeFoodHistory(removeId, token)),
		onGetGoals: token => dispatch(actions.fetchGoals(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFood);
