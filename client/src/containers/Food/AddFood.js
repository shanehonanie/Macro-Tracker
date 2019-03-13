import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Table from './Table';
// import TextFieldGroup from '../../components/UI/TextFieldGroup';
// import SelectListGroup from '../../components/UI/SelectListGroup';
// import TextAreaFieldGroup from '../../components/UI/TextAreaFieldGroup';

export class AddFood extends Component {
	state = {
		food: '',
		mealOfDay: '',
		description: '',
		date: '',
		error: {}
	};

	componentDidMount() {
		this.props.onGetCurrentProfile(this.props.token);
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

	render() {
		let breakfestItems = null;
		let displayTable = null;

		if (this.props.profile !== null) {
			breakfestItems = this.props.profile.foodsHistory;
			displayTable = <Table data={breakfestItems} />;

			console.log('breakfestItems', breakfestItems[0].food.name);
		}

		return (
			<div className='add-food'>
				<div className='container'>
					<table className='table table-striped'>
						<thead className='thead'>
							<tr>
								<th colSpan='3'>Breakfest</th>
								<th>Calories</th>
								<th>Protein</th>
								<th>Carbs</th>
								<th>Fat</th>
								<th>Fiber</th>
							</tr>
						</thead>
						<tbody>{displayTable}</tbody>
					</table>
				</div>

				<div className='container'>
					<table className='table'>
						<tbody>
							<tr>
								<th>Totals</th>
								<td>1</td>
								<td>2</td>
								<td>3</td>
							</tr>
							<tr>
								<th>Your Daily Goal</th>
								<td>John</td>
								<td>Peter</td>
								<td>John</td>
							</tr>
							<tr>
								<th>Remaining</th>
								<td>Carter</td>
								<td>Parker</td>
								<td>Rambo</td>
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
		error: state.profile.error
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsHistory: (foodsHistoryData, token) =>
			dispatch(actions.addFoodsHistory(foodsHistoryData, token)),
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddFood);
