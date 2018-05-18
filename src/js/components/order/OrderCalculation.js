import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addSeatToOrder} from "../../actions/order_actions";
import OrderFilmPlate from "./OrderFilmPlate";

class OrderCalculation extends Component {

    render() {
        return (
            <div>
                <OrderFilmPlate/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedSeats: state.order ? state.order.selectedSeats : []
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {addSeatToOrder: addSeatToOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderCalculation);