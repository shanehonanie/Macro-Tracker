import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';

export class Login extends Component {
	state = {
		email: '',
		password: '',
		error: {},
		isSignUp: false
	};

	componentDidMount() {
		if (this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
			// console.log('componentWillReceieve');
			// console.log('this.state.error', this.state.error);
			// console.log('nextProps', nextProps);
		}
	}

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmitHandler = event => {
		event.preventDefault();

		this.props.onAuth(
			null, //user
			null, //handle
			this.state.email,
			this.state.password,
			null, //password2
			this.state.isSignUp
		);
	};

	render() {
		//const { error } = this.state;
		//console.log('error', error);

		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />;
		}

		return (
			<div className='login'>
				{authRedirect}
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Log In</h1>
							<p className='lead text-center'>
								Sign in to your MacroTracker account
							</p>
							<form noValidate onSubmit={this.onSubmitHandler}>
								<TextFieldGroup
									placeholder='Email Address'
									name='email'
									type='email'
									value={this.state.email}
									onChange={this.inputChangedHandler}
									error={this.state.error.email}
								/>
								<TextFieldGroup
									placeholder='Password'
									name='password'
									type='password'
									value={this.state.password}
									onChange={this.inputChangedHandler}
									error={this.state.error.password}
								/>
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
		onAuth: (name, handle, email, password, password2, isSignup) =>
			dispatch(
				actions.auth(name, handle, email, password, password2, isSignup)
			),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
