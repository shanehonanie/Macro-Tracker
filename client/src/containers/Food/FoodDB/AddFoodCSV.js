import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class AddFoodCSV extends Component {
	state = {
		selectedFile: null
	};

	onChange = e => {
		//console.log(e.target.files);
		console.log('e.target.files[0]', e.target.files[0]);

		switch (e.target.name) {
			case 'selectedFile':
				if (e.target.files.length > 0) {
					// Accessed .name from file
					this.setState({ selectedFile: e.target.files[0] });
					// this.setState({ fileName: e.target.files[0].name });
				}
				break;
			default:
				this.setState({ [e.target.name]: e.target.value });
		}
	};

	onSubmit = e => {
		// e.preventDefault();
		this.props.onCreateFoodsFromCSV(this.state.selectedFile, this.props.token);
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div>
					<div className='row'>
						<div className='col-6'>
							<p>
								Please upload a .csv file in the format from the provided
								template.
							</p>
						</div>
						<div className='col-6'>
							<p>Template Download</p>
							<a
								href={
									process.env.PUBLIC_URL + '/MT Food Template v1 12 02 2019.csv'
								}
							>
								{' '}
								<img
									src={process.env.PUBLIC_URL + '/csv-image.png'}
									alt='CSV template'
									className='csv-image'
								/>
							</a>
						</div>
					</div>
					<input
						id='file'
						type='file'
						name='selectedFile'
						accept='.csv, text/csv, text/plain'
						onChange={event => this.onChange(event)}
					/>{' '}
				</div>
				<input type='submit' value='Submit' className='btn btn-info mt-4' />
			</form>
		);
	}
}

const mapStateToProps = state => {
	return {
		error: state.food.error,
		token: state.auth.token
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onCreateFoodsFromCSV: (file, token) =>
			dispatch(actions.addFoodsCSV(file, token))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFoodCSV);
