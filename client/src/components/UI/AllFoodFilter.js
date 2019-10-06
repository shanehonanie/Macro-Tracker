import React, { useRef, useEffect } from 'react';

const AllFoodFilter = ({ filterAllFoods, clearFilter, filtered, gt }) => {
	const text = useRef('');

	useEffect(() => {
		if (filtered === null) text.current.value = '';
	});

	const onChange = e => {
		if (text.current.value !== '') {
			filterAllFoods(e.target.value);
		} else {
			clearFilter();
		}
		gt(e.target.value);
	};

	return (
		<form>
			<input
				ref={text}
				type='text'
				placeholder='Filter Foods...'
				onChange={onChange}
			/>
		</form>
	);
};

export default AllFoodFilter;
