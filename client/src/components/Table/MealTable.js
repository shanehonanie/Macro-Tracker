import React from 'react';
import { Link } from 'react-router-dom';

const mealTable = props => {
	const tableData = props.data.map((row, index) => {
		return (
			<tr>
				<td key={index} colSpan='3'>
					{row.food.name}
				</td>
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
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
			</tbody>
		</table>
	);
};

export default mealTable;
