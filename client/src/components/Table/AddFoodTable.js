import React from 'react';

const addFoodTable = props => {
	const tableData = props.data.map((row, index) => {
		return (
			<tr key={index}>
				<td>{row.foodArr.name}</td>
				<td>{row.mealOfDay}</td>
				<td>{parseFloat(row.serving).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.foodArr.calories).toFixed(0)}</td>
				<td>{parseFloat(row.serving * row.foodArr.protein).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.foodArr.fat).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.foodArr.carbs).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.foodArr.fiber).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.foodArr.sugar).toFixed(2)}</td>
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
					<th>Fat</th>
					<th>Carbs</th>
					<th>Fiber</th>
					<th>Sugar</th>
				</tr>
			</thead>
			<tbody>{tableData}</tbody>
		</table>
	);
};

export default addFoodTable;
