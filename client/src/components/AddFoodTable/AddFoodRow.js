import React from 'react';

const addFoodRow = props => {
	console.log('props.row', props.row.food.calories);
	return (
		<tr>
			<td key={props.row.date}>{props.row.food.name}</td>
			<td>{props.row.mealOfDay}</td>
			<td>{props.row.food.calories}</td>
			<td>{props.row.food.protein}</td>
			<td>{props.row.food.carbs}</td>
			<td>{props.row.food.fat}</td>
			<td>{props.row.food.fiber}</td>
		</tr>
	);
};

export default addFoodRow;
