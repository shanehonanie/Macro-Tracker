import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './containers/Layout/Navbar';
import Footer from './containers/Layout/Footer';
import Landing from './containers/Layout/Landing';
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import Food from './containers/Food/Food';
import Goal from './containers/Goal/Goal';
import EditGoal from './containers/Goal/EditGoal';
import Profile from './containers/Profile/Profile';
import CreateProfile from './containers/Profile/CreateProfile';
import Dashboard from './containers/Dashboard/Dashboard';
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
					<Route exact path='/food' component={Food} />
					<Route exact path='/goal' component={Goal} />
					<Route exact path='/editGoal' component={EditGoal} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/createProfile' component={CreateProfile} />
					<Route exact path='/dashboard' component={Dashboard} />
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
