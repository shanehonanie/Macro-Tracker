import React from 'react';
import { Link } from 'react-router-dom';

const foodDiaryTable = props => {
	let calorieSum = 0;
	let proteinSum = 0;
	let carbsSum = 0;
	let fatSum = 0;
	let fiberSum = 0;

	const tableData = props.data.map((row, index) => {
		//console.log('[foodDiaryTable.js] row', row);
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
					{props.onClick ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => props.onClick(row._id)}
						>
							Delete
						</button>
					) : null}
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
						{props.options === true ? (
							<div className='row'>
								<Link
									to={{
										pathname: '/foodDiary/addToDiary',
										state: { date: props.selectedDate, mealName: props.name }
									}}
								>
									Add Food
								</Link>
								|
								<div className='dropdown'>
									<p
										className='dropdown-toggle'
										id='dropdownMenuButton'
										data-toggle='dropdown'
										aria-haspopup='true'
										aria-expanded='false'
									>
										Tools
									</p>
									<div
										className='dropdown-menu'
										aria-labelledby='dropdownMenuButton'
									>
										<button className='dropdown-item' type='button'>
											Quick Add Calories
										</button>
										<Link
											to={{
												pathname: '/rememberMeal',
												state: { data: props.data, date: props.selectedDate }
											}}
										>
											<button className='dropdown-item' type='button'>
												Remember Meal
											</button>
										</Link>
										<button
											className='dropdown-item'
											type='button'
											onClick={() =>
												props.copyYesterday(Date.now(), props.name)
											}
										>
											Copy yesterday
										</button>
										<button className='dropdown-item' type='button'>
											Copy from date
										</button>
										<button className='dropdown-item' type='button'>
											Copy to date
										</button>
									</div>
								</div>
							</div>
						) : null}
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

export default foodDiaryTable;
