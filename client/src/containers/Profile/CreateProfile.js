import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import TextFieldGroup from '../../components/UI/TextFieldGroup';
import Spinner from '../../components/UI/Spinner';

export class CreateProfile extends Component {
	state = {
		handle: '',
		error: {}
	};

	// Get the current user's profile upon loading
	componentDidMount() {
		// console.log('[CreateProfile.js] componentDidMount');
		this.props.onGetCurrentProfile(this.props.token);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		//if first time loaded or it state.handle is empty and other 2 are not null, set handle
		if (
			(prevProps.profile === null && this.props.profile) ||
			(prevState.handle === '' && prevProps.profile && this.props.profile)
		) {
			this.setState({ handle: this.props.profile.handle });
		}
	}

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
		//console.log('inputChangedHandler event', console.log(event));
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { error } = this.state;

		let createForm = this.props.loading ? (
			<Spinner />
		) : (
			<p>Profile can't be loaded</p>
		);

		if (!this.props.loading && this.props.profile) {
			createForm = (
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
										onChange={e => this.inputChangedHandler(e)}
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

		return <div>{createForm}</div>;
	}
}

const mapStateToProps = state => {
	return {
		error: state.profile.error,
		token: state.auth.token,
		profile: state.profile.profile,
		loading: state.profile.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateProfile: (profileData, token) =>
			dispatch(actions.addProfile(profileData, token)),
		onGetCurrentProfile: token => dispatch(actions.fetchCurrentProfile(token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateProfile);
