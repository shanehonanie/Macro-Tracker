import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import * as actions from '../../store/actions/index';
import FoodDiaryTable from '../../components/Table/FoodDiaryTable';
import Spinner from '../../components/UI/Spinner';
// import TextFieldGroup from '../../components/UI/TextFieldGroup';
// import SelectListGroup from '../../components/UI/SelectListGroup';
// import TextAreaFieldGroup from '../../components/UI/TextAreaFieldGroup';

export class FoodDiary extends Component {
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
		//console.log('yeseterdaysdate', this.getYesterdaysDate(Date.now()));
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	submitHandler = event => {
		event.preventDefault();
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	handleChange(date) {
		this.setState({
			calendarDate: date
		});
	}

	deleteClickedHandler = rowId => {
		//console.log('[FoodDiary.js] rowId', rowId);
		this.props.onDeleteFoodHistory(rowId, this.props.token);
	};

	isCalendarDate = otherDate => {
		// console.log('[FoodDiary.js] isCalendardate otherDate', otherDate);
		// console.log('otherDate instanceof Date', otherDate instanceof Date);
		// console.log('typeof otherDate', typeof otherDate);

		// use tempDate because otherDate will be a Date String not a Date object
		let tempDate = new Date(otherDate);

		if (
			this.state.calendarDate.getMonth() === tempDate.getMonth() &&
			this.state.calendarDate.getDate() === tempDate.getDate() &&
			this.state.calendarDate.getFullYear() === tempDate.getFullYear()
		)
			return true;

		return false;
	};

	isEqualCalendarDate = (date1, date2) => {
		const date1Obj = new Date(date1);
		const date2Obj = new Date(date2);

		if (
			date1Obj.getMonth() === date2Obj.getMonth() &&
			date1Obj.getDate() === date2Obj.getDate() &&
			date1Obj.getFullYear() === date2Obj.getFullYear()
		)
			return true;

		return false;
	};

	getYesterdaysDate = todaysdate => {
		let theDate = new Date(todaysdate);
		theDate.setDate(theDate.getDate() - 1);
		return theDate;
	};

	copyFromYesterday = (todaysDate, meal) => {
		let todaysDateObj = this.state.calendarDate;
		// console.log('[FoodDiary.js] copyFromYesterday todaysDateObj', todaysDateObj);
		// console.log('[FoodDiary.js] copyFromYesterday meal', meal);
		const yesterdaysMeals = this.props.profile.foodsHistory.filter(
			item =>
				item.mealOfDay === meal &&
				this.isEqualCalendarDate(
					item.date,
					this.getYesterdaysDate(todaysDateObj)
				)
		);

		let foodsHistoryArray = [];

		for (let i = 0; i < yesterdaysMeals.length; i++) {
			// create newItem because yesterdaysMeals stores food array and not food name & change date
			const newItem = {
				foodName: yesterdaysMeals[i].food.name,
				foodId: yesterdaysMeals[i].food._id,
				mealOfDay: yesterdaysMeals[i].mealOfDay,
				serving: yesterdaysMeals[i].serving,
				date: todaysDateObj,
				description: yesterdaysMeals[i].description
			};
			foodsHistoryArray.push(newItem);
		}
		this.props.onCreateFoodsHistoryBulk(foodsHistoryArray, this.props.token);

		// console.log(
		// 	'[AddFoods.js] copyFromYesterday yesterdays meals',
		// 	yesterdaysMeals
		// );
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
		let allTableMeals = this.props.loading ? (
			<Spinner />
		) : (
			<p>Data can't be loaded</p>
		);

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
				item => item.mealOfDay === 'Snacks' && this.isCalendarDate(item.date)
			);

			breakfestTable = (
				<FoodDiaryTable
					data={breakfestItems}
					name='Breakfest'
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
					copyYesterday={this.copyFromYesterday}
					options={true}
				/>
			);
			lunchTable = (
				<FoodDiaryTable
					data={lunchItems}
					name='Lunch'
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
					copyYesterday={this.copyFromYesterday}
					options={true}
				/>
			);
			dinnerTable = (
				<FoodDiaryTable
					data={dinnerItems}
					name='Dinner'
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
					copyYesterday={this.copyFromYesterday}
					options={true}
				/>
			);
			snackTable = (
				<FoodDiaryTable
					data={snackItems}
					name='Snacks'
					selectedDate={this.state.calendarDate}
					onClick={this.deleteClickedHandler}
					copyYesterday={this.copyFromYesterday}
					options={true}
				/>
			);

			for (let i = 0; i < allItemsInSelectedDay.length; i++) {
				let qty = allItemsInSelectedDay[i].serving;

				calorieSum += qty * allItemsInSelectedDay[i].food.calories;
				proteinSum += qty * allItemsInSelectedDay[i].food.protein;
				carbsSum += qty * allItemsInSelectedDay[i].food.carbs;
				fatSum += qty * allItemsInSelectedDay[i].food.fat;
				fiberSum += qty * allItemsInSelectedDay[i].food.fiber;
			}

			goalCalories = this.props.goal.dailyCalories;
			goalProtein = this.props.goal.dailyProtein;
			goalCarbs = this.props.goal.dailyCarbs;
			goalFat = this.props.goal.dailyFat;
			goalFiber = this.props.goal.dailyFiber;
		}

		allTableMeals = (
			<div className='container'>
				<div className='row'>{breakfestTable}</div>
				<div className='row'>{lunchTable}</div>
				<div className='row'>{dinnerTable}</div>
				<div className='row'>{snackTable}</div>
			</div>
		);

		return (
			<div className='add-food'>
				<div className='container'>
					<DatePicker
						selected={this.state.calendarDate}
						onChange={this.handleChange.bind(this)}
					/>
				</div>
				{allTableMeals}
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
		onCreateFoodsHistoryBulk: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistoryBulk(foodsHistoryData, token)),
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token)),
		onDeleteFoodHistory: (removeId, token) =>
			dispatch(actions.removeFoodHistory(removeId, token)),
		onGetGoals: token => dispatch(actions.fetchGoals(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FoodDiary);
