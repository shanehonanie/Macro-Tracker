import React from 'react';
import { Link } from 'react-router-dom';

const navigationItem = props => {
	return (
		<ul className={`navbar-nav ${props.margin}auto`}>
			<li className='nav-item'>
				<Link className='nav-link' to={props.to}>
					{props.name}
				</Link>
			</li>
		</ul>
	);
};

export default navigationItem;
