import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Router, Route} from 'react-router';
import history from '../util/history';
import SignIn from '../components/SignIn';
import UserRouter from '../routers/UserRouter';
import MenuBar from "../components/MenuBar";
import {Container} from "reactstrap";

class App extends Component {
    render() {
        return(
            <Router history={history}>
                <Fragment>
                    <Route exact path='/' component={SignIn}/>
                    <UserRouter/>
                </Fragment>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.authorization,
    account: state.account
});

export default connect(mapStateToProps, null)(App);