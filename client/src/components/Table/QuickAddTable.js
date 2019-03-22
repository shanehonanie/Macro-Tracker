import React from 'react';
import SelectListGroup from '../UI/SelectListGroup';
import TextFieldGroupNumber from '../UI/TextFieldGroupNumber';

const quickAddTable = props => {
	const options = [
		{ label: 'Breakfest', value: 'Breakfest' },
		{ label: 'Lunch', value: 'Lunch' },
		{ label: 'Dinner', value: 'Dinner' },
		{ label: 'Snack', value: 'Snack' }
	];
	return (
		<table className='table table-dark'>
			<tbody>
				<tr>
					<td>Meal Name</td>
					<td>
						<SelectListGroup
							//placeholder='* Meal of Day'
							name='mealOfDay'
							value={props.mealOfDay}
							onChange={props.inputChangedHandler}
							options={options}
							error={null}
							// info='Select the meal of the day'
						/>
					</td>
				</tr>
				<tr>
					<td>Calories</td>
					<td>
						<TextFieldGroupNumber
							// placeholder='Daily Calories'
							name='calories'
							value={props.calories}
							onChange={props.inputChangedHandler}
							error={null}
							// info='Daily Calories'
						/>
					</td>
				</tr>
				<tr>
					<td>Protein</td>
					<td>
						<TextFieldGroupNumber
							// placeholder='Daily Calories'
							name='protein'
							value={props.protein}
							onChange={props.inputChangedHandler}
							error={null}
							// info='Daily Calories'
						/>
					</td>
				</tr>
				<tr>
					<td>Carbohydrates</td>
					<td>
						<TextFieldGroupNumber
							// placeholder='Daily Calories'
							name='carbs'
							value={props.carbs}
							onChange={props.inputChangedHandler}
							error={null}
							// info='Daily Calories'
						/>
					</td>
				</tr>
				<tr>
					<td>Fats</td>
					<td>
						<TextFieldGroupNumber
							// placeholder='Daily Calories'
							name='fats'
							value={props.fats}
							onChange={props.inputChangedHandler}
							error={null}
							// info='Daily Calories'
						/>
					</td>
				</tr>
				<tr>
					<td>Fiber</td>
					<td>
						<TextFieldGroupNumber
							// placeholder='Daily Calories'
							name='fiber'
							value={props.fiber}
							onChange={props.inputChangedHandler}
							error={null}
							// info='Daily Calories'
						/>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default quickAddTable;
