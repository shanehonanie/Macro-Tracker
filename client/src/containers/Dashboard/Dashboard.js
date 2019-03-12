import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner';

export class Goal extends Component {
	componentDidMount() {
		this.props.onGetGoals(this.props.token);
	}

	// editButtonHandler = event => {
	// 	// event.preventDefault();
	// };

	render() {
		let goalNutritionForm = this.props.loading ? (
			<Spinner />
		) : (
			<p>Goals can't be loaded</p>
		);

		if (!this.props.loading && this.props.goal) {
			goalNutritionForm = (
				<table className='table table-striped'>
					<thead className='thead-dark'>
						<tr>
							<th colSpan='2'>Your Daily Summary</th>
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
		}
		return (
			<div>
				{goalNutritionForm}
				<h2>Calories Utilization</h2>
				<div className='progress'>
					<div
						className='progress-bar'
						role='progressbar'
						style={{ width: '25%' }}
						aria-valuenow='25'
						aria-valuemin='0'
						aria-valuemax='100'
					>
						25%
					</div>
				</div>
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
