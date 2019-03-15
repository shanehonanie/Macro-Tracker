import React from 'react';

const addFoodTable = props => {
	const tableData = props.data.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.food.name}</td>
				<td>{row.mealOfDay}</td>
				<td>{row.serving}</td>
				<td>{row.serving * row.food.calories}</td>
				<td>{row.serving * row.food.protein}</td>
				<td>{row.serving * row.food.carbs}</td>
				<td>{row.serving * row.food.fat}</td>
				<td>{row.serving * row.food.fiber}</td>
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
					<th>Serving</th>
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
