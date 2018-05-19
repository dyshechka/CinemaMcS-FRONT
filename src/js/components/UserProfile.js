import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUserOrders} from "../actions/userProfile_actions";

class UserProfile extends Component {

    componentDidMount() {
        this.props.getUserOrders();
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <div className="text-center"><h3>Профиль пользователя</h3></div>
                <div className="d-flex flex-wrap order-block-wrapper">
                </div>
                <div className="text-center"><h3>Список заказов</h3></div>
                <div className="d-flex flex-wrap order-block-wrapper">
                    {this.props.orderList ? this.props.orderList.map(order => (
                        <div className="d-flex order-block">
                            <div>{"Номер заказа: " + order.orderId}</div>
                            <div>{"Название фильма: " + order.tickets[0].film}</div>
                            <div>{"Стоимость: " + order.commonCost + "P"}</div>
                            <div>{"Количество билетов: " + order.tickets.length}</div>
                        </div>
                    )) : (<div>Loading...</div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    orderList: state.userProfile ? state.userProfile.userOrders : null
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {getUserOrders},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (UserProfile);