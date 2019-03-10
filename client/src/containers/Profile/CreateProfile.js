import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';

export class CreateProfile extends Component {
	state = {
		handle: '',
		error: {}
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.error) {
			this.setState({ error: nextProps.error });
		}
	}

	submitHandler = event => {
		event.preventDefault();

		const profileData = {
			handle: this.state.handle
		};

		this.props.onCreateProfile(profileData, this.props.token);
	};

	inputChangedHandler = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;

		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'>Create Profile</h1>
							<p className='lead text-center'>Fill out profile information</p>
							<small className='d-block pb-3'>* = required fields</small>
							<form onSubmit={this.submitHandler}>
								<TextFieldGroup
									placeholder='* Handle/Username'
									name='handle'
									value={this.state.handle}
									onChange={this.inputChangedHandler}
									error={error.handle}
									info='Handle/Username'
								/>
								<input
									type='submit'
									value='Submit'
									className='btn btn-info btn-block mt-4'
								/>
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
		error: state.profile.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateProfile: (profileData, token) =>
			dispatch(actions.addProfile(profileData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProfile);
