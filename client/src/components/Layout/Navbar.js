import React from 'react';
import { Link } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';

const Navbar = props => {
	const authLinks = (
		<div className='collapse navbar-collapse' id='mobile-nav'>
			<NavigationItem name={'Dashboard'} to='/dashboard' />
			<NavigationItem name={'Profile'} to='/profile' />
			<NavigationItem name={'Goals'} to='/goal' />
			<NavigationItem name={'Food Database'} to='/food' />
			<NavigationItem name={'Add Food'} to='/addFood' />
			<NavigationItem name={'Logout'} to='/logout' margin='ml-' />
		</div>
	);

	const guestLinks = (
		<div className='collapse navbar-collapse' id='mobile-nav'>
			<NavigationItem name={'Sign Up'} to='/register' margin='ml-' />
			<NavigationItem name={'Login'} to='/login' />
		</div>
	);

	return (
		<nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
			<div className='container'>
				<Link className='navbar-brand' to='/'>
					MacroTracker
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#mobile-nav'
				>
					<span className='navbar-toggler-icon' />
				</button>
				{props.isUserAuthenticated ? authLinks : guestLinks}
			</div>
		</nav>
	);
};

export default Navbar;
