import React from 'react';

const mealTableRow = props => {
	return (
		<tr>
			<td key={props.index} colSpan='3'>
				{props.row.food.name}
			</td>
			<td>{props.row.food.calories}</td>
			<td>{props.row.food.protein}</td>
			<td>{props.row.food.carbs}</td>
			<td>{props.row.food.fat}</td>
			<td>{props.row.food.fiber}</td>
		</tr>
	);
};

export default mealTableRow;
