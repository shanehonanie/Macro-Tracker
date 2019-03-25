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
		calendarDate: new Date(),
		showCopyFrom: false,
		last7Days: null
	};

	componentDidMount() {
		// console.log('[FoodDiary.js] componentDidMount this.props', this.props);
		// if a date is selected other than today, set incoming date as selected
		if (this.props.location.state && this.props.location.state.selectedDate) {
			this.setState({ calendarDate: this.props.location.state.selectedDate });
			this.setLast7Days(this.props.location.state.selectedDate);
		} else {
			this.setLast7Days(Date.now());
		}

		if (this.props.profile === null)
			this.props.onGetCurrentProfile(this.props.token);

		if (this.props.goal === null) this.props.onGetGoals(this.props.token);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	toggleShowCopyFrom = event => {
		// console.log('[FoodDiary.js] toggleShowCopyFrom event', event);
		//event.preventDefault();
		// event.stopPropagation();

		this.setState({ showCopyFrom: !this.state.showCopyFrom });
	};

	setLast7Days = selectedDate => {
		let dateList = [];

		for (let i = 1; i < 8; i++) {
			let d = new Date(selectedDate);
			d.setDate(d.getDate() - i);
			dateList.push(d);
		}
		this.setState({ last7Days: dateList });
		console.log(dateList);
	};

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

		// calculate the last 7 days
		this.setLast7Days(date);
	}

	deleteClickedHandler = (name, rowId) => {
		// console.log('[FoodDiary.js] rowId', rowId);
		// console.log('[FoodDiary.js] name', name);
		// check if table item to delete is a foodsHistory or quickAdds
		if (name === 'Quick add calories') {
			this.props.onDeleteQuickAdd(rowId, this.props.token);
		} else {
			this.props.onDeleteFoodHistory(rowId, this.props.token);
		}
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

	copyFromDate = (fromDate, curDate, meal) => {
		// console.log('fromDate instanceof Date', fromDate instanceof Date);
		// console.log('typeof fromDate', typeof fromDate);
		// console.log('[FoodDiary.js] copyFromDate fromDate', fromDate);
		// console.log('[FoodDiary.js] copyFromDate curDate', curDate);
		// console.log('[FoodDiary.js] copyFromDate meal', meal);

		// if from date is null, assume its copy from yesterday and assign day before curDate
		if (fromDate === null) {
			fromDate = this.getYesterdaysDate(curDate);
		}

		// filter the meal & from date from all foodsHistory
		const fromDateMeals = this.props.profile.foodsHistory.filter(
			item =>
				item.mealOfDay === meal && this.isEqualCalendarDate(item.date, fromDate)
		);

		// console.log('[FoodDiary.js] copyFromDate fromDateMeals', fromDateMeals);
		let foodsHistoryArray = [];

		// convert to the correct format and assign the new date
		for (let i = 0; i < fromDateMeals.length; i++) {
			const newItem = {
				foodName: fromDateMeals[i].food.name,
				foodId: fromDateMeals[i].food._id,
				mealOfDay: fromDateMeals[i].mealOfDay,
				serving: fromDateMeals[i].serving,
				date: curDate,
				description: fromDateMeals[i].description
			};
			foodsHistoryArray.push(newItem);
		}
		this.props.onCreateFoodsHistoryBulk(foodsHistoryArray, this.props.token);
	};

	transformQuickCalories = mealName => {
		const quickCaloriesArray = this.props.profile.quickAdds.filter(
			item => item.mealOfDay === mealName && this.isCalendarDate(item.date)
		);
		// console.log(
		// 	'[FoodDiary.js] transformQuickCalories quickCaloriesArray',
		// 	quickCaloriesArray
		// );
		let transformedArray = [];

		for (let i = 0; i < quickCaloriesArray.length; i++) {
			const newItem = {
				_id: quickCaloriesArray[i]._id,
				date: quickCaloriesArray[i].date,
				mealOfDay: quickCaloriesArray[i].mealOfDay,
				serving: 1,
				food: {
					name: 'Quick add calories',
					calories: quickCaloriesArray[i].calories,
					protein: quickCaloriesArray[i].protein,
					carbs: quickCaloriesArray[i].carbs,
					fat: quickCaloriesArray[i].fat,
					fiber: quickCaloriesArray[i].fiber
				}
			};
			transformedArray.push(newItem);
		}
		return transformedArray;
	};

	render() {
		// foodsHistory
		let breakfestItems = null;
		let lunchItems = null;
		let dinnerItems = null;
		let snackItems = null;

		// quick add calories
		let breakfestQuickTransform = null;
		let lunchQuickTransform = null;
		let dinnerQuickTransform = null;
		let snackQuickTransform = null;

		// foodsHistory & quick calories combined
		// let combinedBreakfestItems = null;
		// let combinedLunchItems = null;
		// let combinedDinnerItems = null;
		// let combinedSnackItems = null;
		// let combinedAllItems = null;

		let breakfestTable = null;
		let lunchTable = null;
		let dinnerTable = null;
		let snackTable = null;
		let allTableMeals =
			this.props.profileLoading || this.props.goalsLoading ? (
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
		let allQuickTransformInSelectedDay = null;

		if (this.props.profile !== null) {
			breakfestItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Breakfest' && this.isCalendarDate(item.date)
			);
			breakfestQuickTransform = this.transformQuickCalories('Breakfest');

			lunchItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Lunch' && this.isCalendarDate(item.date)
			);
			lunchQuickTransform = this.transformQuickCalories('Lunch');

			dinnerItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Dinner' && this.isCalendarDate(item.date)
			);
			dinnerQuickTransform = this.transformQuickCalories('Dinner');

			snackItems = this.props.profile.foodsHistory.filter(
				item => item.mealOfDay === 'Snack' && this.isCalendarDate(item.date)
			);
			snackQuickTransform = this.transformQuickCalories('Snack');

			allItemsInSelectedDay = this.props.profile.foodsHistory.filter(item =>
				this.isCalendarDate(item.date)
			);
			allQuickTransformInSelectedDay = [
				...breakfestQuickTransform,
				...lunchQuickTransform,
				...dinnerQuickTransform,
				...snackQuickTransform
			];

			// combine foodsHistory & quick calories
			const combinedBreakfestItems = [
				...breakfestItems,
				...breakfestQuickTransform
			];
			const combinedLunchItems = [...lunchItems, ...lunchQuickTransform];
			const combinedDinnerItems = [...dinnerItems, ...dinnerQuickTransform];
			const combinedSnackItems = [...snackItems, ...snackQuickTransform];
			const combinedAllItems = [
				...allItemsInSelectedDay,
				...allQuickTransformInSelectedDay
			];

			// console.log(
			// 	'[FoodDiary.js] combinedBreakfestItems',
			// 	combinedBreakfestItems
			// );

			breakfestTable = (
				<FoodDiaryTable
					data={combinedBreakfestItems}
					dataNoCombined={breakfestItems}
					name='Breakfest'
					selectedDate={this.state.calendarDate}
					onClickDelete={this.deleteClickedHandler}
					copyFromDate={this.copyFromDate}
					showCopyFrom={this.state.showCopyFrom}
					toggleShowCopyFrom={this.toggleShowCopyFrom}
					last7Days={this.state.last7Days}
					options={true}
				/>
			);
			lunchTable = (
				<FoodDiaryTable
					data={combinedLunchItems}
					dataNoCombined={lunchItems}
					name='Lunch'
					selectedDate={this.state.calendarDate}
					onClickDelete={this.deleteClickedHandler}
					copyFromDate={this.copyFromDate}
					showCopyFrom={this.state.showCopyFrom}
					toggleShowCopyFrom={this.toggleShowCopyFrom}
					last7Days={this.state.last7Days}
					options={true}
				/>
			);
			dinnerTable = (
				<FoodDiaryTable
					data={combinedDinnerItems}
					dataNoCombined={dinnerItems}
					name='Dinner'
					selectedDate={this.state.calendarDate}
					onClickDelete={this.deleteClickedHandler}
					copyFromDate={this.copyFromDate}
					showCopyFrom={this.state.showCopyFrom}
					toggleShowCopyFrom={this.toggleShowCopyFrom}
					last7Days={this.state.last7Days}
					options={true}
				/>
			);
			snackTable = (
				<FoodDiaryTable
					data={combinedSnackItems}
					dataNoCombined={snackItems}
					name='Snack'
					selectedDate={this.state.calendarDate}
					onClickDelete={this.deleteClickedHandler}
					copyFromDate={this.copyFromDate}
					showCopyFrom={this.state.showCopyFrom}
					toggleShowCopyFrom={this.toggleShowCopyFrom}
					last7Days={this.state.last7Days}
					options={true}
				/>
			);

			for (let i = 0; i < combinedAllItems.length; i++) {
				let qty = combinedAllItems[i].serving;

				calorieSum += qty * combinedAllItems[i].food.calories;
				proteinSum += qty * combinedAllItems[i].food.protein;
				carbsSum += qty * combinedAllItems[i].food.carbs;
				fatSum += qty * combinedAllItems[i].food.fat;
				fiberSum += qty * combinedAllItems[i].food.fiber;
			}

			goalCalories = this.props.goal.dailyCalories;
			goalProtein = this.props.goal.dailyProtein;
			goalCarbs = this.props.goal.dailyCarbs;
			goalFat = this.props.goal.dailyFat;
			goalFiber = this.props.goal.dailyFiber;
		}

		if (!this.props.profileLoading && !this.props.goalsLoading) {
			//console.log('[FoodDiary.js] breakfestItems', breakfestItems);
			// console.log(
			// 	'[FoodDiary.js] this.props.goalsLoading',
			// 	this.props.goalsLoading
			// );
			allTableMeals = (
				<div className='container'>
					<div className='row'>{breakfestTable}</div>
					<div className='row'>{lunchTable}</div>
					<div className='row'>{dinnerTable}</div>
					<div className='row'>{snackTable}</div>
				</div>
			);
		}

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
		goal: state.goal.goal,
		profileLoading: state.profile.loading,
		goalsLoading: state.goal.loading,
		error: state.profile.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsHistoryBulk: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistoryBulk(foodsHistoryData, token)),
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token)),
		onGetGoals: token => dispatch(actions.fetchGoals(token)),
		onDeleteFoodHistory: (removeId, token) =>
			dispatch(actions.removeFoodHistory(removeId, token)),
		onDeleteQuickAdd: (removeId, token) =>
			dispatch(actions.removeQuickCalories(removeId, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FoodDiary);
