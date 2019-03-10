import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

export class Navbar extends Component {
	logoutHandler = event => {
		event.preventDefault();
		this.props.onLogout();
	};

	render() {
		const authLinks = (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item'>
					<a href='' onClick={this.logoutHandler} className='href'>
						Logout
					</a>
				</li>
			</ul>
		);

		const guestLinks = (
			<ul className='navbar-nav ml-auto'>
				<li className='nav-item'>
					<Link className='nav-link' to='/register'>
						Sign Up
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link' to='/login'>
						Login
					</Link>
				</li>
			</ul>
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

					<div className='collapse navbar-collapse' id='mobile-nav'>
						<ul className='navbar-nav auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/profile'>
									{' '}
									Profile
								</Link>
							</li>
						</ul>

						<ul className='navbar-nav auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/goal'>
									{' '}
									Goals
								</Link>
							</li>
						</ul>

						<ul className='navbar-nav auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/food'>
									{' '}
									Food Database
								</Link>
							</li>
						</ul>

						<ul className='navbar-nav auto'>
							<li className='nav-item'>
								<Link className='nav-link' to='/createProfile'>
									{' '}
									Create Profile
								</Link>
							</li>
						</ul>
						{this.props.isAuthenticated ? authLinks : guestLinks}
					</div>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => dispatch(actions.logout())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navbar);
