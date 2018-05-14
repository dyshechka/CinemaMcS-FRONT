import React, {Component, Fragment} from 'react';
import {Row, Button, Container} from "reactstrap";

class MenuBar extends Component {
    render() {
        return (
            <Fragment>
                <Row className="justify-content-center">
                    <Button className="main-menu-button button-color-one">Расписание</Button>
                    <Button className="main-menu-button button-color-one">Фильмы</Button>
                    <Button className="main-menu-button button-color-one">Вакансии</Button>
                    <Button className="main-menu-button button-color-one">Личный кабинет</Button>
                    <Button className="main-menu-button btn-danger">Выйти</Button>
                </Row>
            </Fragment>
        );
    }
}

export default MenuBar;