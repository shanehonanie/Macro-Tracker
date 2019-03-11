import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';
import Spinner from '../../components/UI/Spinner';

export class EditGoal extends Component {
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

	componentDidMount() {
		// console.log('[CreateProfile.js] componentDidMount');
		this.props.onGetGoals(this.props.token);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (
			prevProps.loading === false &&
			this.props.loading === true &&
			this.props.goal
		) {
			this.setState({
				dailyCalories: this.props.goal.dailyCalories,
				dailyProtein: this.props.goal.dailyProtein,
				dailyFat: this.props.goal.dailyFat,
				dailyCarbs: this.props.goal.dailyCarbs,
				dailyFiber: this.props.goal.dailyFiber,
				fitnessWeeklyWorkouts: this.props.goal.fitnessWeeklyWorkouts,
				fitnessCaloriesBurnedPerWeek: this.props.goal
					.fitnessCaloriesBurnedPerWeek,
				fitnessCardioDaysPerWeek: this.props.goal.fitnessCardioDaysPerWeek,
				fitnessWeightTrainingDaysPerWeek: this.props.goal
					.fitnessWeightTrainingDaysPerWeek,
				fitnessMinutessPerWorkout: this.props.goal.fitnessMinutessPerWorkout
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	submitHandler = event => {
		event.preventDefault();
		console.log('event', event);

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

		let goalForm = this.props.loading ? (
			<Spinner />
		) : (
			<p>Goals can't be loaded</p>
		);

		if (!this.props.loading && this.props.goal) {
			goalForm = (
				<div className='create-profile'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-8 m-auto'>
								<h1 className='display-4 text-center'>Edit Your Goals</h1>
								<p className='lead text-center'>Let us know your goals</p>
								<small className='d-block pb-3'>* = required fields</small>
								<form onSubmit={this.submitHandler}>
									<TextFieldGroup
										placeholder='Daily Calories'
										name='dailyCalories'
										value={String(this.state.dailyCalories)}
										onChange={this.inputChangedHandler}
										error={error.dailyCalories}
										info='Daily Calories'
									/>
									<TextFieldGroup
										placeholder='Daily Protein'
										name='dailyProtein'
										value={String(this.state.dailyProtein)}
										onChange={this.inputChangedHandler}
										error={error.dailyProtein}
										info='Daily Protein'
									/>
									<TextFieldGroup
										placeholder='Daily Fat'
										name='dailyFat'
										value={String(this.state.dailyFat)}
										onChange={this.inputChangedHandler}
										error={error.dailyFat}
										info='Daily fat'
									/>
									<TextFieldGroup
										placeholder='Daily Carbohydrates'
										name='dailyCarbs'
										value={String(this.state.dailyCarbs)}
										onChange={this.inputChangedHandler}
										error={error.dailyCarbs}
										info='Daily Carbohydrates'
									/>
									<TextFieldGroup
										placeholder='Daily Fiber'
										name='dailyFiber'
										value={String(this.state.dailyFiber)}
										onChange={this.inputChangedHandler}
										error={error.dailyFiber}
										info='Daily Fiber'
									/>
									<TextFieldGroup
										placeholder='# of Weekly Fitness Workouts'
										name='fitnessWeeklyWorkouts'
										value={String(this.state.fitnessWeeklyWorkouts)}
										onChange={this.inputChangedHandler}
										error={error.fitnessWeeklyWorkouts}
										info='# of Weekly Fitness Workouts'
									/>
									<TextFieldGroup
										placeholder='# of Weekly Calories Burned Per Workout'
										name='fitnessCaloriesBurnedPerWeek'
										value={String(this.state.fitnessCaloriesBurnedPerWeek)}
										onChange={this.inputChangedHandler}
										error={error.fitnessCaloriesBurnedPerWeek}
										info='# of Weekly Calories Burned Per Workout'
									/>
									<TextFieldGroup
										placeholder='# of Cardio Days Per Week'
										name='fitnessCardioDaysPerWeek'
										value={String(this.state.fitnessCardioDaysPerWeek)}
										onChange={this.inputChangedHandler}
										error={error.fitnessCardioDaysPerWeek}
										info='# of Cardio Days Per Week'
									/>
									<TextFieldGroup
										placeholder='# of Weight Training Days Per Week'
										name='fitnessWeightTrainingDaysPerWeek'
										value={String(this.state.fitnessWeightTrainingDaysPerWeek)}
										onChange={this.inputChangedHandler}
										error={error.fitnessWeightTrainingDaysPerWeek}
										info='# of Weight Training Days Per Week'
									/>
									<TextFieldGroup
										placeholder='# of Minutes per Workout'
										name='fitnessMinutessPerWorkout'
										value={String(this.state.fitnessMinutessPerWorkout)}
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
		return <div>{goalForm}</div>;
	}
}

const mapStateToProps = state => {
	return {
		error: state.goal.error,
		token: state.auth.token,
		goal: state.goal.goal,
		loading: state.goal.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateGoal: (goalData, token) =>
			dispatch(actions.addGoal(goalData, token)),
		onGetGoals: token => dispatch(actions.fetchGoals(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditGoal);
