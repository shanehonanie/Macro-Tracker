import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';

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
								<TextFieldGroup
									placeholder='Name'
									name='name'
									value={this.state.name}
									onChange={this.inputChangedHandler}
									error={this.state.error.name}
								/>
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
								<TextFieldGroup
									placeholder='Confirm Password'
									name='password2'
									type='password'
									value={this.state.password2}
									onChange={this.inputChangedHandler}
									error={this.state.error.password2}
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
		onAuth: (name, email, password, password2, isSignup) =>
			dispatch(actions.auth(name, email, password, password2, isSignup)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);
