import React, { Component } from 'react';

export class Register extends Component {
	constructor() {
		super();
	}

	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	onChangeHandler = event => {
		this.setState({ [event.target.name]: [event.target.value] });
	};

	onSubmitHandler = event => {
		event.preventDefault();
	};

	render() {
		return (
			<div className='register'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Sign Up</h1>
							<p className='lead text-center'>
								Create your MacroTracker account
							</p>
							<form onSubmit={this.onSubmitHandler}>
								<div className='form-group'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Name'
										name='name'
										value={this.state.name}
										onChange={this.onChangeHandler}
									/>
								</div>
								<div className='form-group'>
									<input
										type='email'
										className='form-control form-control-lg'
										placeholder='Email Address'
										name='email'
										value={this.state.email}
										onChange={this.onChangeHandler}
									/>
								</div>
								<div className='form-group'>
									<input
										type='password'
										className='form-control form-control-lg'
										placeholder='Password'
										name='password'
										value={this.state.password}
										onChange={this.onChangeHandler}
									/>
								</div>
								<div className='form-group'>
									<input
										type='password'
										className='form-control form-control-lg'
										placeholder='Confirm Password'
										name='password2'
										value={this.state.password2}
										onChange={this.onChangeHandler}
									/>
								</div>
								<input type='submit' className='btn btn-info btn-block mt-4' />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
