import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addSeatToOrder, calculateOrder} from "../../actions/order_actions";
import OrderFilmPlate from "./OrderFilmPlate";

class OrderPayment extends Component {

    componentDidMount() {
        const selectedSeats = this.props.selectedSeats;
        const seatsIds = selectedSeats.map(selectedSeat => selectedSeat.id);
        this.props.calculateOrder({seanceId: this.props.seance.id, seatIds: seatsIds});
    }

    render() {
        return (
            <div>
                <OrderFilmPlate/>
                Order payment
            </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order ? state.order.calculatedOrder : null,
    selectedSeats: state.order ? state.order.selectedSeats : [],
    seance: state.seance,
    hall: state.hall
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {calculateOrder: calculateOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderPayment);