import React from 'react';

const tableRow = props => {
	return (
		<tr>
			<td key={props.row.date} colSpan='3'>
				{props.row.food.name}
			</td>
			<td>test</td>
			<td>test</td>
			<td>test</td>
			<td>test</td>
			<td>test</td>
		</tr>
	);
};

export default tableRow;
