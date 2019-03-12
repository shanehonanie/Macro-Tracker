import React from 'react';
import { Link } from 'react-router-dom';

const landing = () => {
	return (
		<div className='landing'>
			<div className='dark-overlay landing-inner text-light'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12 text-center'>
							<h1 className='display-3 mb-4'>Macro Tracker</h1>
							<p className='lead'>
								{' '}
								Track daily macros to keep you on track for success
							</p>
							<hr />
							<Link to='/register' className='btn btn-lg btn-info mr-2'>
								Sign Up
							</Link>
							<Link to='/login' className='btn btn-lg btn-light'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default landing;
