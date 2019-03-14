import React from 'react';
import MealTableRow from './AddFoodRow';

const addFoodTable = props => {
	const tableData = props.data.map(row => {
		return <MealTableRow row={row} />;
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
				</tr>
			</thead>
			<tbody>{tableData}</tbody>
		</table>
	);
};

export default addFoodTable;
