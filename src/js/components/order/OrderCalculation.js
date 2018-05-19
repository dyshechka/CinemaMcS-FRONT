import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addSeatToOrder, calculateOrder} from "../../actions/order_actions";
import OrderFilmPlate from "./OrderFilmPlate";
import {Row} from "reactstrap";
import {Link} from "react-router-dom";

class OrderCalculation extends Component {

    getCalculatedOrder = () => {
        return this.props.order ? this.props.order : null;
    };

    componentDidMount() {
        const selectedSeats = this.props.selectedSeats;
        const seatsIds = selectedSeats.map(selectedSeat => selectedSeat.id);
        this.props.calculateOrder({seanceId: this.props.seance.id, seatIds: seatsIds});
    }

    getSeatInfo = (seatId) => {
        const seat = this.props.selectedSeats.filter(selectedSeat => selectedSeat.id === seatId);
        return seat.map(seat => (
            <div className="d-flex flex-row w-75" key={"seat-id-" + seat.id}>
                <div className="mt-1 mb-1 ml-2 mr-2">{"Ряд: " + seat.row}</div>
                <div className="mt-1 mb-1 ml-2 mr-2">{" Место: " + seat.number}</div>
            </div>
        ));
    };

    render() {
        const tickets = this.getCalculatedOrder() ? this.getCalculatedOrder().tickets.map((ticket, index) =>
        (<div className="d-flex flex-row ticket-plate" key={"ticket-" + index}>
            {
                this.getSeatInfo(ticket.seatId)
            }
            <div className="d-flex w-25 justify-content-center flex-column align-items-center">
                <div>
                    {
                        ticket.cost + "Р"
                    }
                </div>
            </div>
        </div>)
        ) : (<div>Loading...</div>);

        const orderSum = (
            <div className="d-flex p-3 mb-3 border-top border-1 border-secondary">
                <div>Итого к оплате: {this.getCalculatedOrder() ? this.getCalculatedOrder().commonCost : ""} Р</div>
                <div>, количество билетов: {this.getCalculatedOrder() ? this.getCalculatedOrder().tickets.length : ""}</div>
            </div>
        );

        return (
            <div>
                <OrderFilmPlate/>
                <div className="d-flex flex-wrap">
                    {tickets}
                </div>
                {orderSum}
                <Row className="justify-content-end">
                    <Link to="/payment-order" className="button-color-one p-2">Оплатить банковской картой</Link>
                </Row>
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
    {addSeatToOrder: addSeatToOrder, calculateOrder: calculateOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderCalculation);