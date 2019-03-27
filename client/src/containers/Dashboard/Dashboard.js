import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';

export class Goal extends Component {
	state = {
		calendarDate: new Date()
	};

	componentDidMount() {
		// if (this.props.profile === null)
		this.props.onGetCurrentProfile(this.props.token);

		// if (this.props.goal === null)
		this.props.onGetGoals(this.props.token);
	}

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

	transformQuickCalories = mealName => {
		const quickCaloriesArray = this.props.profile.quickAdds.filter(
			item => item.mealOfDay === mealName && this.isCalendarDate(item.date)
		);
		// console.log(
		// 	'[Dashboard.js] transformQuickCalories quickCaloriesArray',
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

		let goalNutritionForm = this.props.loading ? (
			<Spinner />
		) : (
			<p>Goals can't be loaded</p>
		);

		if (!this.props.loading && this.props.goal) {
			goalNutritionForm = (
				<div className='container'>
					<table className='table table-striped'>
						<thead className='thead-dark'>
							<tr>
								<th colSpan='1'>Your Daily Summary</th>
								<th>Goal</th>
								<th>Used</th>
								<th>Remaining</th>
								<th>Utilization</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Calories</td>
								<td>{this.props.goal.dailyCalories}</td>
								<td>{calorieSum}</td>
								<td>{this.props.goal.dailyCalories - calorieSum}</td>
								<td>
									<div className='progress' style={{ height: '25px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(calorieSum / this.props.goal.dailyCalories) * 100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(calorieSum / this.props.goal.dailyCalories) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(calorieSum / this.props.goal.dailyCalories) *
												100
											).toFixed(2)}
											%
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>Protein</td>
								<td>{this.props.goal.dailyProtein}</td>
								<td>{proteinSum}</td>
								<td>{this.props.goal.dailyProtein - proteinSum}</td>
								<td>
									<div className='progress' style={{ height: '25px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(proteinSum / this.props.goal.dailyProtein) * 100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(proteinSum / this.props.goal.dailyProtein) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(proteinSum / this.props.goal.dailyProtein) *
												100
											).toFixed(2)}
											%
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>Carbs</td>
								<td>{this.props.goal.dailyCarbs}</td>
								<td>{carbsSum}</td>
								<td>{this.props.goal.dailyCarbs - carbsSum}</td>
								<td>
									<div className='progress' style={{ height: '25px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(carbsSum / this.props.goal.dailyCarbs) * 100 + '%',
												color: 'black'
											}}
											aria-valuenow={
												(carbsSum / this.props.goal.dailyCarbs) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{((carbsSum / this.props.goal.dailyCarbs) * 100).toFixed(
												2
											)}
											%
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>Fat</td>
								<td>{this.props.goal.dailyFat}</td>
								<td>{fatSum}</td>
								<td>{this.props.goal.dailyFat - fatSum}</td>
								<td>
									<div className='progress' style={{ height: '25px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width: (fatSum / this.props.goal.dailyFat) * 100 + '%',
												color: 'black'
											}}
											aria-valuenow={(fatSum / this.props.goal.dailyFat) * 100}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{((fatSum / this.props.goal.dailyFat) * 100).toFixed(2)}%
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td>Fiber</td>
								<td>{this.props.goal.dailyFiber}</td>
								<td>{fiberSum}</td>
								<td>{this.props.goal.dailyFiber - fiberSum}</td>
								<td>
									<div className='progress' style={{ height: '25px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(fiberSum / this.props.goal.dailyFiber) * 100 + '%',
												color: 'black'
											}}
											aria-valuenow={
												(fiberSum / this.props.goal.dailyFiber) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{((fiberSum / this.props.goal.dailyFiber) * 100).toFixed(
												2
											)}
											%
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}
		return <div>{goalNutritionForm}</div>;
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		profile: state.profile.profile,
		goal: state.goal.goal,
		loading: state.goal.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetGoals: token => dispatch(actions.fetchGoals(token)),
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Goal);
