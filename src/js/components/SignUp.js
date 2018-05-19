import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Col, Container, Input, Label, Row} from 'reactstrap';
import {Link} from "react-router-dom";
import {signUp} from "../actions/auth_actions";

class SignUp extends Component {

    state = {
        username: null,
        password: null,
        email: null,
        firstName: null,
        lastName: null,
        sex: true
    };

    changeUsername = (e) => {
        this.setState({username: e.target.value});
    };

    changePassword = (e) => {
        this.setState({password: e.target.value});
    };

    changeEmail = (e) => {
        this.setState({email: e.target.value});
    };

    changeFirstName = (e) => {
        this.setState({firstName: e.target.value});
    };

    changeLastName = (e) => {
        this.setState({lastName: e.target.value});
    };

    validateUserInfo = () => {
        return this.state.username && this.state.firstName && this.state.lastName && this.state.email && this.state.password;
    };

    render() {
        return (
            <Container className="full-height-block d-flex flex-column justify-content-center">
                <Row className="justify-content-center sign-up-block">
                    <div><h3>Заполните форму регистрации</h3></div>
                </Row>
                <Row className="justify-content-center sign-up-block">
                    <Input className="large-input-field" placeholder="Фамилия" onChange={this.changeLastName}/>
                </Row>
                <Row className="justify-content-center sign-up-block">
                    <Input className="large-input-field" placeholder="Имя" onChange={this.changeFirstName}/>
                </Row>
                <Row className="justify-content-center sign-up-block">
                    <Input type="email" className="large-input-field" placeholder="Email" onChange={this.changeEmail}/>
                </Row>
                <Row className="justify-content-center sign-up-block">
                    <div className="sign-up-input-block">Пол</div>
                    <div className="sign-up-input-block">
                        <Label check>
                            <Input checked="checked" type="radio" name="sex" />{' '}
                            Мужской
                        </Label>
                    </div>
                    <div className="sign-up-input-block">
                        <Label check>
                            <Input type="radio" name="sex" />{' '}
                            Женский
                        </Label>
                    </div>
                </Row>
                <Row className="justify-content-center sign-up-block">
                    <Input className="large-input-field" placeholder="Логин" onChange={this.changeUsername}/>
                </Row>
                <Row className="justify-content-center sign-up-block">
                    <Input className="large-input-field" placeholder="Пароль" onChange={this.changePassword}/>
                </Row>
                <Row className="sign-up-block">
                    <Col className="link-underline d-flex justify-content-center flex-column without-underline">
                        <button disabled={!this.validateUserInfo()} className="btn btn-success sign-up-button" onClick={() => this.props.signUp(this.state)}>Зарегистрироваться</button>
                        <Link className="sign-up-button p-3" to="/">Назад</Link>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => bindActionCreators(
    {signUp},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);