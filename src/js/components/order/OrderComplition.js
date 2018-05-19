import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {approveOrder, calculateOrder, cleanOrder} from "../../actions/order_actions";
import {Row} from "reactstrap";
import {Link} from "react-router-dom";

class OrderComplition extends Component {

    componentDidMount() {
        const selectedSeats = this.props.selectedSeats;
        const seatsIds = selectedSeats.map(selectedSeat => selectedSeat.id);
        this.props.calculateOrder({seanceId: this.props.seance.id, seatIds: seatsIds});
        this.getOrderComplitionRequest();
    }

    getOrderComplitionRequest = () => {
        const request = {
            orderId: null,
            tickets: this.props.order.tickets,
            commonCost: this.props.order.commonCost
        };
        this.props.approveOrder(request);
    };

    getApprovedOrder = () => {
        return this.props.approvedOrder ? this.props.approvedOrder : null;
    };

    dateFormat = (incDate) => {
        let date = new Date(incDate);
        let formatDate = date.getDate();
        const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        formatDate = formatDate + '.' + month + '.' + date.getFullYear() + ' ';
        formatDate = formatDate + date.getHours() + ':';
        const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();
        formatDate = formatDate + minutes;
        return formatDate;
    };

    getSeatInfo = (seat) => {
        if (seat === undefined) {
            return ("");
        }
        return (
            <div className="d-flex flex-row">
                {"Ряд: " + seat.row}
                {" Место: " + seat.number}
            </div>
        )
    };

    render() {
        const orderInfo = (
            this.getApprovedOrder() ? (
                <div className="order-box">
                    <div className="font-weight-bold p-3 text-center">Ваш заказ №{this.getApprovedOrder().orderId} от {this.dateFormat(this.getApprovedOrder().orderDate)}</div>
                    <div className="inner-order-box">
                        <div className="d-flex">
                            <div className="d-flex flex-column" style={{width: 200 + "px"}}>
                                <div className="text-center font-weight-bold">{"Билетов:"}</div>
                                <div className="big-digit text-center">{this.getApprovedOrder().tickets.length}</div>
                            </div>
                            <div className="d-flex flex-column" style={{width: 200 + "px"}}>
                                <div className="">{this.getApprovedOrder().tickets[0].film}</div>
                                <div className="">{this.dateFormat(this.props.seance.time)}</div>
                            </div>
                        </div>
                        <div className="p-2 text-center border-top border-1 border-secondary">{this.props.hall.rows.name + " зал"}</div>
                        <div className="d-flex flex-column align-items-center">
                            {this.getApprovedOrder().tickets.map(ticket => (
                                <div key={"ticket-" + ticket.seatId} className="d-flex w-50 justify-content-center p-2">
                                    <div>{this.getSeatInfo(this.props.selectedSeats.filter(seat => seat.id === ticket.seatId)[0])}</div>
                                    <div>{", " + ticket.cost + "Р"}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
            : (<div>Loading...</div>)
        );
        return (
            <div>
                {orderInfo}
                <Row className="justify-content-center p-3">
                    <Link to="/schedule" className="button-color-one p-2" onClick={() => {this.props.cleanOrder()}}>Вернуться в расписание</Link>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order ? state.order.calculatedOrder : null,
    approvedOrder: state.order ? state.order.approvedOrder : null,
    selectedSeats: state.order ? state.order.selectedSeats : [],
    seance: state.seance,
    hall: state.hall
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {calculateOrder, approveOrder, cleanOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderComplition);