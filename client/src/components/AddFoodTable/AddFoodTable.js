import React from 'react';

const addFoodTable = props => {
	const tableData = props.data.map((row, index) => {
		return (
			<tr>
				<td key={index}>{row.food.name}</td>
				<td>{row.mealOfDay}</td>
				<td>{row.food.calories}</td>
				<td>{row.food.protein}</td>
				<td>{row.food.carbs}</td>
				<td>{row.food.fat}</td>
				<td>{row.food.fiber}</td>
				<td>
					<button
						type='button'
						className='btn btn-danger'
						onClick={() => props.onClick(index)}
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
					<th>Food</th>
					<th>Meal</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Carbs</th>
					<th>Fat</th>
					<th>Fiber</th>
					<th>Delete?</th>
				</tr>
			</thead>
			<tbody>{tableData}</tbody>
		</table>
	);
};

export default addFoodTable;
