import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addSeatToOrder} from "../../actions/order_actions";

class Seat extends Component {

    state = {
      selected: false
    };

    componentDidMount() {
        this.state.selected = !this.props.seat.free;
    }

    buildSeatStyles = (seat) => {
        if (this.state.selected) {
            return "seat-selected"
        } else if (!seat.free) {
            return "seat-blocked";
        } else if (seat.vip) {
            return "seat-vip";
        } else {
            return "";
        }
    };

    handleSeatClick = (seat) => {
        const seatId = seat.id;
        let index = this.props.selectedSeats.indexOf(seatId);
        if (index === -1) {
            this.selectSeat(seatId);
        } else {
            this.deselectSeat(seatId);
        }
    };

    selectSeat = (seatId) => {
        this.props.selectedSeats.push(seatId);
        this.props.addSeatToOrder(this.props.selectedSeats);
        this.setState({
            selected: true
        });
    };

    deselectSeat = (seatId) => {
        let index = this.props.selectedSeats.indexOf(seatId);
        if (index !== -1) this.props.selectedSeats.splice(index, 1);
        this.props.addSeatToOrder(this.props.selectedSeats);
        this.setState({
            selected: false
        });
    };

    render() {
        return (
            <div
                className={"seat-cell " + this.buildSeatStyles(this.props.seat)}
                onClick={() => this.state.selected ? "" : this.handleSeatClick(this.props.seat)}
            >{this.props.seat.id}</div>
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


export default connect(mapStateToProps, mapDispatchToProps) (Seat);