import React from 'react';
import { Link } from 'react-router-dom';

const mealTable = props => {
	let calorieSum = 0;
	let proteinSum = 0;
	let carbsSum = 0;
	let fatSum = 0;
	let fiberSum = 0;

	const tableData = props.data.map((row, index) => {
		//console.log('[MealTable.js] row', row);
		calorieSum += row.serving * row.food.calories;
		proteinSum += row.serving * row.food.protein;
		carbsSum += row.serving * row.food.carbs;
		fatSum += row.serving * row.food.fat;
		fiberSum += row.serving * row.food.fiber;
		return (
			<tr key={index}>
				<td colSpan='3'>{row.food.name}</td>
				<td>{parseFloat(row.serving).toFixed(2)}</td>
				<td>{row.serving * row.food.calories}</td>
				<td>{row.serving * row.food.protein}</td>
				<td>{row.serving * row.food.carbs}</td>
				<td>{row.serving * row.food.fat}</td>
				<td>{row.serving * row.food.fiber}</td>
				<td>
					<button
						type='button'
						className='btn btn-danger'
						onClick={() => props.onClick(row._id)}
					>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<table className='table table-striped'>
			<thead className='thead'>
				<tr>
					<th colSpan='3'>{props.name}</th>
					<th>Serving</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Carbs</th>
					<th>Fat</th>
					<th>Fiber</th>
				</tr>
			</thead>
			<tbody>
				{tableData}
				<tr>
					<td colSpan='3'>
						<div className='row'>
							<Link
								to={{
									pathname: props.linkTo,
									state: { date: props.selectedDate }
								}}
							>
								Add Food
							</Link>
							|
							<div className='dropdown'>
								<h7
									className='dropdown-toggle'
									id='dropdownMenuButton'
									data-toggle='dropdown'
									aria-haspopup='true'
									aria-expanded='false'
								>
									Tools
								</h7>
								<div
									className='dropdown-menu'
									aria-labelledby='dropdownMenuButton'
								>
									<a className='dropdown-item' href='#'>
										Action
									</a>
									<a className='dropdown-item' href='#'>
										Another action
									</a>
									<a className='dropdown-item' href='#'>
										Something else here
									</a>
								</div>
							</div>
						</div>
					</td>
					<td />
					<td>{calorieSum}</td>
					<td>{proteinSum}</td>
					<td>{carbsSum}</td>
					<td>{fatSum}</td>
					<td>{fiberSum}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default mealTable;
