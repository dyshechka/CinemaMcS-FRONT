import React, {Component, Fragment} from 'react';
import {Row, Button, Container} from "reactstrap";
import {loadAccount, logout} from "../actions/auth_actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Link, withRouter} from 'react-router-dom';

class MenuBar extends Component {

    componentDidUpdate() {
        this.checkAndLoadAccount();
    }

    componentDidMount() {
        this.checkAndLoadAccount();
    }

    checkAndLoadAccount() {
        if (this.props.account == null && this.props.isAuthorized) {
            this.props.loadAccount();
        }
    }

    onLogout = () => {
        this.props.logout();
    };

    getMenuActivePosition = () => {
        return this.props.history.location.pathname;
    };

    render() {
        const menuButtonClasses = 'main-menu-button button-color-one';
        const menuActiveButtonClasses = 'main-menu-button button-color-one-selected';
        return (
            <Fragment>
                <Row className="justify-content-center">
                    <Link to='/schedule' className={this.getMenuActivePosition() === '/schedule' ? menuActiveButtonClasses : menuButtonClasses}>Расписание</Link>
                    <Link to='/films' className={this.getMenuActivePosition() === '/films' ? menuActiveButtonClasses : menuButtonClasses}>Фильмы</Link>
                    <Button className="main-menu-button button-color-one">Вакансии</Button>
                    <Button className="main-menu-button button-color-one">Личный кабинет</Button>
                    <Button className="main-menu-button btn-danger" onClick={this.onLogout}>Выйти</Button>
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.isAuthorized,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {logout, loadAccount},
    dispatch
);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuBar));