import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import * as actions from './store/actions/index';

import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignin();
	}

	render() {
		return (
			<div className='App'>
				<Navbar />
				<Route exact path='/' component={Landing} />
				<div className='container'>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
				</div>
				<Footer />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignin: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(App)
);
