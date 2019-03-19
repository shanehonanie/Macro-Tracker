import React, { Component } from 'react';

import AllFoods from './AllFoods/AllFoods';

export class AddTo extends Component {
	state = {
		selectedDate: '',
		mealName: ''
	};

	componentDidMount() {
		this.setState({
			selectedDate: this.props.location.state.date,
			mealName: this.props.location.state.mealName
		});
	}

	render() {
		console.log('[AddToDiary.js] render this.state', this.state);
		return (
			<div className='container'>
				<nav>
					<div className='nav nav-tabs' id='nav-tab' role='tablist'>
						<a
							className='nav-item nav-link active'
							id='nav-home-tab'
							data-toggle='tab'
							href='#nav-home'
							role='tab'
							aria-controls='nav-home'
							aria-selected='true'
						>
							All Foods
						</a>
						<a
							className='nav-item nav-link'
							id='nav-profile-tab'
							data-toggle='tab'
							href='#nav-profile'
							role='tab'
							aria-controls='nav-profile'
							aria-selected='false'
						>
							Recent
						</a>
						<a
							className='nav-item nav-link'
							id='nav-contact-tab'
							data-toggle='tab'
							href='#nav-contact'
							role='tab'
							aria-controls='nav-contact'
							aria-selected='false'
						>
							Meals
						</a>
					</div>
				</nav>
				<div className='tab-content' id='nav-tabContent'>
					<div
						className='tab-pane fade show active'
						id='nav-home'
						role='tabpanel'
						aria-labelledby='nav-home-tab'
					>
						<AllFoods
							date={this.state.selectedDate}
							mealOfDay={this.state.mealName}
						/>
					</div>
					<div
						className='tab-pane fade'
						id='nav-profile'
						role='tabpanel'
						aria-labelledby='nav-profile-tab'
					>
						test 2
					</div>
					<div
						className='tab-pane fade'
						id='nav-contact'
						role='tabpanel'
						aria-labelledby='nav-contact-tab'
					>
						test 3
					</div>
				</div>
			</div>
		);
	}
}

export default AddTo;
