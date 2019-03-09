import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';

export class Goal extends Component {
	state = {
		dailyCalories: '',
		dailyProtein: '',
		dailyFat: '',
		dailyCarbs: '',
		dailyFiber: '',
		fitnessWeeklyWorkouts: '',
		fitnessCaloriesBurnedPerWeek: '',
		fitnessCardioDaysPerWeek: '',
		fitnessWeightTrainingDaysPerWeek: '',
		fitnessMinutessPerWorkout: '',
		error: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	submitHandler = event => {
		event.preventDefault();

		const goalData = {
			dailyCalories: this.state.dailyCalories,
			dailyProtein: this.state.dailyProtein,
			dailyFat: this.state.dailyFat,
			dailyCarbs: this.state.dailyCarbs,
			dailyFiber: this.state.dailyFiber,
			fitnessWeeklyWorkouts: this.state.fitnessWeeklyWorkouts,
			fitnessCaloriesBurnedPerWeek: this.state.fitnessCaloriesBurnedPerWeek,
			fitnessCardioDaysPerWeek: this.state.fitnessCardioDaysPerWeek,
			fitnessWeightTrainingDaysPerWeek: this.state
				.fitnessWeightTrainingDaysPerWeek,
			fitnessMinutessPerWorkout: this.state.fitnessMinutessPerWorkout
		};

		this.props.onCreateGoal(goalData, this.props.token);
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Add to Your Goals</h1>
							<p className='lead text-center'>Let us know your goals</p>
							<small className='d-block pb-3'>* = required fields</small>
							<form onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder='Daily Calories'
									name='dailyCalories'
									value={this.state.dailyCalories}
									onChange={this.inputChangedHandler}
									error={error.dailyCalories}
									info='Daily Calories'
								/>
								<TextFieldGroup
									placeholder='Daily Protein'
									name='dailyProtein'
									value={this.state.dailyProtein}
									onChange={this.inputChangedHandler}
									error={error.dailyProtein}
									info='Daily Protein'
								/>
								<TextFieldGroup
									placeholder='Daily Fat'
									name='dailyFat'
									value={this.state.dailyFat}
									onChange={this.inputChangedHandler}
									error={error.dailyFat}
									info='Daily fat'
								/>
								<TextFieldGroup
									placeholder='Daily Carbohydrates'
									name='dailyCarbs'
									value={this.state.dailyCarbs}
									onChange={this.inputChangedHandler}
									error={error.dailyCarbs}
									info='Daily Carbohydrates'
								/>
								<TextFieldGroup
									placeholder='Daily Fiber'
									name='dailyFiber'
									value={this.state.dailyFiber}
									onChange={this.inputChangedHandler}
									error={error.dailyFiber}
									info='Daily Fiber'
								/>
								<TextFieldGroup
									placeholder='# of Weekly Fitness Workouts'
									name='fitnessWeeklyWorkouts'
									value={this.state.fitnessWeeklyWorkouts}
									onChange={this.inputChangedHandler}
									error={error.fitnessWeeklyWorkouts}
									info='# of Weekly Fitness Workouts'
								/>
								<TextFieldGroup
									placeholder='# of Weekly Calories Burned Per Workout'
									name='fitnessCaloriesBurnedPerWeek'
									value={this.state.fitnessCaloriesBurnedPerWeek}
									onChange={this.inputChangedHandler}
									error={error.fitnessCaloriesBurnedPerWeek}
									info='# of Weekly Calories Burned Per Workout'
								/>
								<TextFieldGroup
									placeholder='# of Cardio Days Per Week'
									name='fitnessCardioDaysPerWeek'
									value={this.state.fitnessCardioDaysPerWeek}
									onChange={this.inputChangedHandler}
									error={error.fitnessCardioDaysPerWeek}
									info='# of Cardio Days Per Week'
								/>
								<TextFieldGroup
									placeholder='# of Weight Training Days Per Week'
									name='fitnessWeightTrainingDaysPerWeek'
									value={this.state.fitnessWeightTrainingDaysPerWeek}
									onChange={this.inputChangedHandler}
									error={error.fitnessWeightTrainingDaysPerWeek}
									info='# of Weight Training Days Per Week'
								/>
								<TextFieldGroup
									placeholder='# of Minutes per Workout'
									name='fitnessMinutessPerWorkout'
									value={this.state.fitnessMinutessPerWorkout}
									onChange={this.inputChangedHandler}
									error={error.fitnessMinutessPerWorkout}
									info='# of Minutes per Workout'
								/>
								<input
									type='submit'
									value='Submit'
									className='btn btn-info btn-block mt-4'
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.goal.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateGoal: (goalData, token) =>
			dispatch(actions.addGoal(goalData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Goal);
