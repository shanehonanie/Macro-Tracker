import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Landing from './components/Layout/Landing';
import Register from './containers/Auth/Register';
import Login from './containers/Auth/Login';
import Logout from './containers/Auth/Logout';
import Food from './containers/Food/Food';
import Goal from './containers/Goal/Goal';
import EditGoal from './containers/Goal/EditGoal';
import AddFood from './containers/Food/AddFood';
import RememberMeal from './containers/Food/RememberMeal';
import Breakfest from './containers/Food/AddTo/Breakfest';
import Lunch from './containers/Food/AddTo/Lunch';
import Dinner from './containers/Food/AddTo/Dinner';
import Snack from './containers/Food/AddTo/Snack';
import Profile from './containers/Profile/Profile';
import Dashboard from './containers/Dashboard/Dashboard';
import * as actions from './store/actions/index';

import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.onTryAutoSignin();
	}

	render() {
		let routes = (
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/' component={Landing} />
				<Redirect to='/' />
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route exact path='/food' component={Food} />
					<Route exact path='/goal' component={Goal} />
					<Route exact path='/editGoal' component={EditGoal} />
					<Route exact path='/addFood' component={AddFood} />
					<Route exact path='/addBreakfestFood' component={Breakfest} />
					<Route exact path='/addLunchFood' component={Lunch} />
					<Route exact path='/addDinnerFood' component={Dinner} />
					<Route exact path='/addSnackFood' component={Snack} />
					<Route exact path='/rememberMeal' component={RememberMeal} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/logout' component={Logout} />
					<Redirect to='/dashboard' />
				</Switch>
			);
		}

		return (
			<div className='App'>
				<Navbar isUserAuthenticated={this.props.isAuthenticated} />
				{routes}
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token != null
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignin: () => dispatch(actions.authCheckState())
	};
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(App)
);
