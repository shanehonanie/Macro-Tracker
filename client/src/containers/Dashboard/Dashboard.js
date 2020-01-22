import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';

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
					fat: quickCaloriesArray[i].fat,
					carbs: quickCaloriesArray[i].carbs,
					fiber: quickCaloriesArray[i].fiber,
					sugar: quickCaloriesArray[i].sugar
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

		let allCalorieSum = 0;
		let allProteinSum = 0;
		let allCarbsSum = 0;
		let allFatSum = 0;
		let allFiberSum = 0;
		let allSugarSum = 0;
		let breakfestCaloriesSum = 0;
		let lunchCaloriesSum = 0;
		let dinnerCaloriesSum = 0;
		let snackCaloriesSum = 0;

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

			breakfestCaloriesSum = combinedBreakfestItems.reduce(
				(a, b) => a + b.food.calories * b.serving,
				0
			);
			lunchCaloriesSum = combinedLunchItems.reduce(
				(a, b) => a + b.food.calories * b.serving,
				0
			);
			dinnerCaloriesSum = combinedDinnerItems.reduce(
				(a, b) => a + b.food.calories * b.serving,
				0
			);
			snackCaloriesSum = combinedSnackItems.reduce(
				(a, b) => a + b.food.calories * b.serving,
				0
			);

			for (let i = 0; i < combinedAllItems.length; i++) {
				let qty = combinedAllItems[i].serving;

				allCalorieSum += qty * combinedAllItems[i].food.calories;
				allProteinSum += qty * combinedAllItems[i].food.protein;
				allCarbsSum += qty * combinedAllItems[i].food.carbs;
				allFatSum += qty * combinedAllItems[i].food.fat;
				allFiberSum += qty * combinedAllItems[i].food.fiber;
				allSugarSum += qty * combinedAllItems[i].food.sugar;
			}
		}

		let goalNutritionForm = this.props.loading ? (
			<Spinner />
		) : (
			<p>Goals can't be loaded</p>
		);

		if (!this.props.loading && this.props.goal) {
			goalNutritionForm = (
				<div className='container mt-5'>
					<table className='table table-striped'>
						<thead className='thead-dark'>
							<tr>
								<th colSpan='1'>Daily Summary</th>
								<th className='d-none d-sm-table-cell'>Goal</th>
								<th>Used</th>
								<th className='d-none d-sm-table-cell'>Remaining</th>
								<th>Utilization</th>
							</tr>
						</thead>
						<tbody>
							{/* Calories Section */}
							<tr>
								<td>Calories</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyCalories).toFixed(2)}
								</td>
								<td>{parseFloat(allCalorieSum).toFixed(2)}</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(
										this.props.goal.dailyCalories - allCalorieSum
									).toFixed(2)}
								</td>
								<td>
									<div className='progress' style={{ height: '20px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(allCalorieSum / this.props.goal.dailyCalories) *
														100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(allCalorieSum / this.props.goal.dailyCalories) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(allCalorieSum / this.props.goal.dailyCalories) *
												100
											).toFixed(2)}
											%
										</div>
									</div>
								</td>
							</tr>
							{/* Protein Section */}
							<tr>
								<td>Protein</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyProtein).toFixed(2)}
								</td>
								<td>{parseFloat(allProteinSum).toFixed(2)}</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(
										this.props.goal.dailyProtein - allProteinSum
									).toFixed(2)}
								</td>
								<td>
									<div className='progress' style={{ height: '20px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(allProteinSum / this.props.goal.dailyProtein) * 100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(allProteinSum / this.props.goal.dailyProtein) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(allProteinSum / this.props.goal.dailyProtein) *
												100
											).toFixed(2)}
											%
										</div>
									</div>
								</td>
							</tr>
							{/* Fat Section */}
							<tr>
								<td>Fat</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyFat).toFixed(2)}
								</td>
								<td>{parseFloat(allFatSum).toFixed(2)}</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyFat - allFatSum).toFixed(2)}
								</td>
								<td>
									<div className='progress' style={{ height: '20px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(allFatSum / this.props.goal.dailyFat) * 100 + '%',
												color: 'black'
											}}
											aria-valuenow={
												(allFatSum / this.props.goal.dailyFat) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{((allFatSum / this.props.goal.dailyFat) * 100).toFixed(
												2
											)}
											%
										</div>
									</div>
								</td>
							</tr>
							{/* Carbs Section */}
							<tr>
								<td>Carbs</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyCarbs).toFixed(2)}
								</td>
								<td>{parseFloat(allCarbsSum).toFixed(2)}</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyCarbs - allCarbsSum).toFixed(
										2
									)}
								</td>
								<td>
									<div className='progress' style={{ height: '20px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(allCarbsSum / this.props.goal.dailyCarbs) * 100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(allCarbsSum / this.props.goal.dailyCarbs) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(allCarbsSum / this.props.goal.dailyCarbs) *
												100
											).toFixed(2)}
											%
										</div>
									</div>
								</td>
							</tr>
							{/* Fiber Section */}
							<tr>
								<td>Fiber</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyFiber).toFixed(2)}
								</td>
								<td>{parseFloat(allFiberSum).toFixed(2)}</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailyFiber - allFiberSum).toFixed(
										2
									)}
								</td>
								<td>
									<div className='progress' style={{ height: '20px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(allFiberSum / this.props.goal.dailyFiber) * 100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(allFiberSum / this.props.goal.dailyFiber) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(allFiberSum / this.props.goal.dailyFiber) *
												100
											).toFixed(2)}
											%
										</div>
									</div>
								</td>
							</tr>
							{/* Sugar Section */}
							<tr>
								<td>Sugar</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailySugar).toFixed(2)}
								</td>
								<td>{parseFloat(allSugarSum).toFixed(2)}</td>
								<td className='d-none d-sm-table-cell'>
									{parseFloat(this.props.goal.dailySugar - allSugarSum).toFixed(
										2
									)}
								</td>
								<td>
									<div className='progress' style={{ height: '20px' }}>
										<div
											className='progress-bar'
											role='progressbar'
											style={{
												width:
													(allSugarSum / this.props.goal.dailySugar) * 100 +
													'%',
												color: 'black'
											}}
											aria-valuenow={
												(allSugarSum / this.props.goal.dailySugar) * 100
											}
											aria-valuemin='0'
											aria-valuemax='100'
										>
											{(
												(allSugarSum / this.props.goal.dailySugar) *
												100
											).toFixed(2)}
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
		return (
			<div className='container'>
				<div className='row justify-content-md-center'>{goalNutritionForm}</div>
				<div className='row justify-content-md-center'>
					<div className='col-md-6'>
						<Chart
							width={'100%'}
							height={'350px'}
							chartType='PieChart'
							loader={<Spinner />}
							data={[
								['Macro', 'In grams'],
								['Protein', allProteinSum],
								['Carbs', allCarbsSum],
								['Fat', allFatSum]
							]}
							options={{
								title: 'Daily Macros'
							}}
							rootProps={{ 'data-testid': '1' }}
						/>
					</div>
					<div className='col-md-6'>
						<Chart
							width={'100%'}
							height={'350px'}
							chartType='PieChart'
							loader={<Spinner />}
							data={[
								['Meal', 'Calories'],
								['Breakfest', breakfestCaloriesSum],
								['Lunch', lunchCaloriesSum],
								['Dinner', dinnerCaloriesSum]
							]}
							options={{
								title: 'Calories per Meal (No Snack)'
								// pieHole: 0.4
							}}
							rootProps={{ 'data-testid': '2' }}
						/>
					</div>
					<div className='col-md-6'>
						<Chart
							width={'100%'}
							height={'350px'}
							chartType='PieChart'
							loader={<Spinner />}
							data={[
								['Meal', 'Calories'],
								['Breakfest', breakfestCaloriesSum],
								['Lunch', lunchCaloriesSum],
								['Dinner', dinnerCaloriesSum],
								['Snack', snackCaloriesSum]
							]}
							options={{
								title: 'Calories per Meal (With Snack)'
								// pieHole: 0.4
							}}
							rootProps={{ 'data-testid': '2' }}
						/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
