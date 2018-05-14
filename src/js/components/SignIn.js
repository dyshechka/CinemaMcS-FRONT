import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {signIn} from "../actions/auth_actions";
import {Link} from 'react-router-dom'
import {Container, Row, Col, FormGroup, FormFeedback, Label, Input, UncontrolledAlert} from 'reactstrap';

class SignIn extends Component {
    state = {
        username: {
            value: '',
            isInvalid: false
        },
        password: {
            value: '',
            isInvalid: false
        }
    };

    componentDidUpdate() {
        this.checkAuthorizationAndRedirect();
    }

    componentDidMount() {
        this.checkAuthorizationAndRedirect();
    }

    checkAuthorizationAndRedirect() {
        if (this.props.isAuthorized && this.props.account) {
            if (this.props.account.role.code === 'ADMIN') {
                this.props.history.push('/manageAccounts');
            } else {
                this.props.history.push('/films');
            }
        }
    }

    onChangeLogin = e => this.setState({username: {value: e.target.value, isInvalid: false}});

    onChangePassword = e => this.setState({password: {value: e.target.value, isInvalid: false}});

    onSignIn = () => {
        let valid = true;
        if (!this.state.username.value) {
            this.setState({username: {isInvalid: true}});
            valid = false;
        }
        if (!this.state.password.value) {
            this.setState({password: {isInvalid: true}});
            valid = false;
        }
        if (valid) {
            this.props.login(this.state.username.value, this.state.password.value);
        }
    };

    render() {
        const errorBlock = this.props.error ? (
            <UncontrolledAlert color='danger'>
                {this.props.error}
            </UncontrolledAlert>
        ) : '';

        return (
            <Container className="full-height-block d-flex flex-column justify-content-center">
                <Container className="w-50">
                    <h2 className="text-center mt-2 mb-3">Cinema Cloud Course Project</h2>
                    <h2 className="text-center mt-2 mb-5">Добро пожаловать!</h2>
                    {errorBlock}
                    <FormGroup row>
                        <Col sm={12}>
                            <Input id="username"
                                   type="text"
                                   placeholder="Введите имя пользователя"
                                   value={this.state.username.value}
                                   invalid={this.state.username.isInvalid}
                                   onChange={this.onChangeLogin}/>
                            <FormFeedback>Value is required</FormFeedback>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col sm={12}>
                            <Input id="password"
                                   type="password"
                                   placeholder="Введите пароль"
                                   value={this.state.password.value}
                                   invalid={this.state.password.isInvalid}
                                   onChange={this.onChangePassword}/>
                            <FormFeedback>Value is required</FormFeedback>
                        </Col>
                    </FormGroup>
                    <Container className="text-center p-0">
                        <Row>
                            <Col className="link-underline d-flex justify-content-center flex-column">
                                <Link to="/signup">Зарегистрироваться</Link>
                            </Col>
                            <Col>
                                <button className="btn btn-success login-button" onClick={this.onSignIn}>Войти</button>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isAuthorized: state.authorization,
    error: state.authError,
    account: state.account
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {login: signIn},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);