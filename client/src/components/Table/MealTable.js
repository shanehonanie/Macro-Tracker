import React from 'react';
import { Link } from 'react-router-dom';

const mealTable = props => {
	let calorieSum = 0;
	let proteinSum = 0;
	let carbsSum = 0;
	let fatSum = 0;
	let fiberSum = 0;

	const tableData = props.data.map((row, index) => {
		calorieSum += row.food.calories;
		proteinSum += row.food.protein;
		carbsSum += row.food.carbs;
		fatSum += row.food.fat;
		fiberSum += row.food.fiber;
		return (
			<tr key={index}>
				<td colSpan='3'>{row.food.name}</td>
				<td>{row.food.calories}</td>
				<td>{row.food.protein}</td>
				<td>{row.food.carbs}</td>
				<td>{row.food.fat}</td>
				<td>{row.food.fiber}</td>
			</tr>
		);
	});

	return (
		<table className='table table-striped'>
			<thead className='thead'>
				<tr>
					<th colSpan='3'>{props.name}</th>
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
						<Link
							to={{
								pathname: props.linkTo,
								state: { date: props.selectedDate }
							}}
						>
							Add Food
						</Link>
					</td>
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
