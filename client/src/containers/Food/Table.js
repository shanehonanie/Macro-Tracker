import React from 'react';
import TableRow from './TableRow';

const table = props => {
	return props.data.map(row => {
		console.log('[Tabls.js] row', row);
		return <TableRow row={row} />;
	});
};

export default table;
