import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';

export class Goal extends Component {
	componentDidMount() {
		// console.log('[CreateProfile.js] componentDidMount');
		this.props.onGetGoals(this.props.token);
	}

	editButtonHandler = event => {
		// event.preventDefault();
		this.props.history.push('/editGoal');
	};

	render() {
		let goalNutritionForm = this.props.loading ? (
			<Spinner />
		) : (
			<p>Goals can't be loaded</p>
		);

		let goalFitnessForm = null;

		if (!this.props.loading && this.props.goal) {
			goalNutritionForm = (
				<table className='table table-striped'>
					<thead className='thead-dark'>
						<tr>
							<th>Daily Nutrition Goals</th>
							<th>
								<button
									type='button'
									className='btn btn-primary'
									onClick={this.editButtonHandler}
								>
									Edit
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Calories</td>
							<td>{this.props.goal.dailyCalories}</td>
						</tr>
						<tr>
							<td>Protein</td>
							<td>{this.props.goal.dailyProtein}</td>
						</tr>
						<tr>
							<td>Fat</td>
							<td>{this.props.goal.dailyFat}</td>
						</tr>
						<tr>
							<td>Carbs</td>
							<td>{this.props.goal.dailyCarbs}</td>
						</tr>
						<tr>
							<td>Fiber</td>
							<td>{this.props.goal.dailyFiber}</td>
						</tr>
					</tbody>
				</table>
			);

			goalFitnessForm = (
				<table className='table table-striped'>
					<thead className='thead-dark'>
						<tr>
							<th>Fitness</th>
							<th>
								<button
									type='button'
									className='btn btn-primary'
									onClick={this.editButtonHandler}
								>
									Edit
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Workouts / Week</td>
							<td>{this.props.goal.fitnessWeeklyWorkouts + ' workouts'}</td>
						</tr>
						<tr>
							<td>Calories Burned / Week</td>
							<td>
								{this.props.goal.fitnessCaloriesBurnedPerWeek + ' calories'}
							</td>
						</tr>
						<tr>
							<td>Cardio Days / Week</td>
							<td>{this.props.goal.fitnessCardioDaysPerWeek + ' days'}</td>
						</tr>
						<tr>
							<td>Weight Training Days / Week</td>
							<td>
								{this.props.goal.fitnessWeightTrainingDaysPerWeek + ' days'}
							</td>
						</tr>
						<tr>
							<td>Minutes / Workout</td>
							<td>{this.props.goal.fitnessMinutessPerWorkout + ' mins'}</td>
						</tr>
					</tbody>
				</table>
			);
		}
		return (
			<div>
				{goalNutritionForm} {goalFitnessForm}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		goal: state.goal.goal,
		loading: state.goal.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetGoals: token => dispatch(actions.fetchGoals(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Goal);
