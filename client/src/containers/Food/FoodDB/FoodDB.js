import React from 'react';

import AddFoodSingle from './AddFoodSingle';
import AddFoodCSV from './AddFoodCSV';

export const FoodDB = () => {
	return (
		<div className='container'>
			<nav>
				<div className='nav nav-tabs' id='nav-tab' role='tablist'>
					<a
						className='nav-item nav-link active'
						id='nav-addSingle-tab'
						data-toggle='tab'
						href='#nav-addSingle'
						role='tab'
						aria-controls='nav-addSingle'
						aria-selected='true'
					>
						Add Single Food
					</a>
					<a
						className='nav-item nav-link'
						id='nav-addMultiple-tab'
						data-toggle='tab'
						href='#nav-addMultiple'
						role='tab'
						aria-controls='nav-addMultiple'
						aria-selected='true'
					>
						Add Multiple Foods
					</a>
				</div>
			</nav>
			<div className='tab-content' id='nav-tabContent'>
				<div
					className='tab-pane fade show active'
					id='nav-addSingle'
					role='tabpanel'
					aria-labelledby='nav-addSingle-tab'
				>
					<AddFoodSingle />
				</div>
				<div
					className='tab-pane fade'
					id='nav-addMultiple'
					role='tabpanel'
					aria-labelledby='nav-addMultiple-tab'
				>
					<AddFoodCSV />
				</div>
			</div>
		</div>
	);
};

export default FoodDB;
