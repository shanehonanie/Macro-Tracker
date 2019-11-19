import React from 'react';
import { Link } from 'react-router-dom';

const dateOptions = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
};

const foodDiaryTable = props => {
	let calorieSum = 0;
	let proteinSum = 0;
	let fatSum = 0;
	let carbsSum = 0;
	let fiberSum = 0;
	let sugarSum = 0;

	// const copyFromDates = props.last7Days.map((row, index) => {
	// 	return (
	// 		<button
	// 			key={index}
	// 			className='dropdown-item'
	// 			type='button'
	// 			onClick={() => props.copyFromDate(row, props.selectedDate, props.name)}
	// 		>
	// 			{row.toLocaleDateString('en-US', dateOptions)}
	// 		</button>
	// 	);
	// });

	const tableData = props.data.map((row, index) => {
		//console.log('[foodDiaryTable.js] row', row);
		calorieSum += row.serving * row.food.calories;
		proteinSum += row.serving * row.food.protein;
		fatSum += row.serving * row.food.fat;
		carbsSum += row.serving * row.food.carbs;
		fiberSum += row.serving * row.food.fiber;
		sugarSum += row.serving * row.food.sugar;
		return (
			<tr key={index}>
				<td colSpan='3'>{row.food.name}</td>
				<td>{parseFloat(row.serving).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.food.calories).toFixed(0)}</td>
				<td>{parseFloat(row.serving * row.food.protein).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.food.fat).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.food.carbs).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.food.fiber).toFixed(2)}</td>
				<td>{parseFloat(row.serving * row.food.sugar).toFixed(2)}</td>
				<td>
					{props.onClickDelete ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => props.onClickDelete(row.food.name, row._id)}
						>
							Delete
						</button>
					) : null}
				</td>
			</tr>
		);
	});

	let dropdownContents = null;

	if (!props.showCopyFrom) {
		dropdownContents = (
			<form>
				<Link
					to={{
						pathname: '/quickAdd',
						state: {
							date: props.selectedDate,
							mealName: props.name
						}
					}}
				>
					<button className='dropdown-item' type='button'>
						Quick add calories
					</button>
				</Link>
				<Link
					to={{
						pathname: '/rememberMeal',
						state: {
							data: props.dataNoCombined,
							date: props.selectedDate
						}
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
						props.copyFromDate(null, props.selectedDate, props.name)
					}
				>
					Copy yesterday
				</button>
				{/* <button
					className='dropdown-item'
					type='button'
					onClick={props.toggleShowCopyFrom}
				>
					Copy from date
				</button> */}
				{/* <button className='dropdown-item' type='button'>
					Copy to date
				</button> */}
			</form>
		);
	}
	// else {
	// 	dropdownContents = copyFromDates;
	// 	// dropdownContents = 'copyFromDates';
	// }

	return (
		<table className='table table-striped'>
			<thead className='thead'>
				<tr>
					<th colSpan='3'>{props.name}</th>
					<th>Serving</th>
					<th>Calories</th>
					<th>Protein</th>
					<th>Fat</th>
					<th>Carbs</th>
					<th>Fiber</th>
					<th>Sugar</th>
				</tr>
			</thead>
			<tbody>
				{tableData}
				<tr>
					<td colSpan='3'>
						{props.options === true ? (
							<div className='row mx-auto'>
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
										{dropdownContents}
									</div>
								</div>
							</div>
						) : null}
					</td>
					<td />
					<td>{parseFloat(calorieSum).toFixed(0)}</td>
					<td>{parseFloat(proteinSum).toFixed(2)}</td>
					<td>{parseFloat(fatSum).toFixed(2)}</td>
					<td>{parseFloat(carbsSum).toFixed(2)}</td>
					<td>{parseFloat(fiberSum).toFixed(2)}</td>
					<td>{parseFloat(sugarSum).toFixed(2)}</td>
				</tr>
			</tbody>
		</table>
	);
};

export default foodDiaryTable;
