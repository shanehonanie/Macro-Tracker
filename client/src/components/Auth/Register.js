import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import classnames from 'classnames';
import * as actions from '../../store/actions/index';

export class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		error: {},
		isSignUp: true
	};

	componentDidMount() {
		if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmitHandler = event => {
		event.preventDefault();

		this.props.onAuth(
			this.state.name,
			this.state.email,
			this.state.password,
			this.state.password2,
			this.state.isSignUp
		);
	};

	render() {
		const { error } = this.state;

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className='register'>
				{authRedirect}
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Sign Up</h1>
							<p className='lead text-center'>
								Create your MacroTracker account
							</p>
							<form noValidate onSubmit={this.onSubmitHandler}>
								<div className='form-group'>
									<input
										type='text'
										className={classnames('form-control form-control-lg', {
											'is-invalid': error.name
										})}
										placeholder='Name'
										name='name'
										value={this.state.name}
										onChange={this.inputChangedHandler}
									/>
									{error.name && (
										<div className='invalid-feedback'>{error.name}</div>
									)}
								</div>
								<div className='form-group'>
									<input
										type='email'
										className={classnames('form-control form-control-lg', {
											'is-invalid': error.email
										})}
										placeholder='Email Address'
										name='email'
										value={this.state.email}
										onChange={this.inputChangedHandler}
									/>
									{error.email && (
										<div className='invalid-feedback'>{error.email}</div>
									)}
								</div>
								<div className='form-group'>
									<input
										type='password'
										className={classnames('form-control form-control-lg', {
											'is-invalid': error.password
										})}
										placeholder='Password'
										name='password'
										value={this.state.password}
										onChange={this.inputChangedHandler}
									/>
									{error.password && (
										<div className='invalid-feedback'>{error.password}</div>
									)}
								</div>
								<div className='form-group'>
									<input
										type='password'
										className={classnames('form-control form-control-lg', {
											'is-invalid': error.password2
										})}
										placeholder='Confirm Password'
										name='password2'
										value={this.state.password2}
										onChange={this.inputChangedHandler}
									/>
									{error.password2 && (
										<div className='invalid-feedback'>{error.password2}</div>
									)}
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

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuthenticated: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAuth: (name, email, password, password2, isSignup) =>
			dispatch(actions.auth(name, email, password, password2, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
