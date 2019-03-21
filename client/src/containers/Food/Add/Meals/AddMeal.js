import React, { Component } from 'react';

import AddMealTable from '../../../../components/Table/AddMealTable';
import Spinner from '../../../../components/UI/Spinner';

export class AddMeal extends Component {
	state = {
		uniqueMealItems: [],
		checkedMealIndexes: []
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		// console.log('[AddMeal.js] getDerivedStateFromprops nextProps', nextProps);
		// console.log('[AddMeal.js] getDerivedStateFromprops prevState', prevState);
		if (prevState.uniqueMealItems.length === 0 && nextProps.meals) {
			return {
				uniqueMealItems: nextProps.meals
			};
		}
		return null;
	}

	handleInputChange = event => {
		// console.log('name', name);
		// console.log('target', target);
		// console.log('value', value);

		const mealsChecked = this.state.checkedMealIndexes;
		let index;

		// check if box is check or unchecked
		if (event.target.checked) {
			mealsChecked.push(event.target.name);
		} else {
			index = mealsChecked.indexOf(event.target.name);
			mealsChecked.splice(index, 1);
		}

		this.setState({
			checkedMealIndexes: mealsChecked
		});
	};

	render() {
		let displayAddMealTable = this.props.profileLoading ? (
			<Spinner />
		) : (
			<p>Data can't be loaded</p>
		);

		if (!this.props.profileLoading) {
			displayAddMealTable = (
				<div>
					<AddMealTable
						data={this.state.uniqueMealItems}
						checkedOnChange={this.handleInputChange}
						onClick={this.props.onClick}
					/>
					<button
						type='button'
						className='btn btn-success'
						onClick={() =>
							this.props.addToHistory(this.state.checkedMealIndexes)
						}
					>
						Add Checked
					</button>
				</div>
			);
		}
		return <div className='container'>{displayAddMealTable}</div>;
	}
}

export default AddMeal;
