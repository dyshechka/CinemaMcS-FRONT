import React, {Component} from 'react';
import {connect} from "react-redux";
import {Route, Router} from 'react-router';
import history from '../util/history';
import SignIn from '../components/SignIn';
import UserRouter from './UserRouter';
import AdminRouter from './AdminRouter';
import RedirectToSignInComponent from '../components/RedirectToSignComponent';
import SignUp from "../components/SignUp";

class App extends Component {

    isRole = role => this.props.account ? this.props.account.role === role : false;

    isUser = () => this.props.isAuthorized && this.isRole('ROLE_USER');

    isAdmin = () => this.props.isAuthorized && this.isRole('ROLE_ADMIN');

    render() {
        const adminRoutes = this.isAdmin() ? (<AdminRouter/>) : '';
        const userRoutes = this.isUser() ? (<UserRouter/>) : '';
        return(
            <Router history={history}>
                <div>
                    <RedirectToSignInComponent/>
                    <Route exact path='/' component={SignIn}/>
                    <Route exact path='/signup' component={SignUp}/>
                    {userRoutes}
                    {adminRoutes}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.authorization,
    account: state.account
});

export default connect(mapStateToProps, null)(App);