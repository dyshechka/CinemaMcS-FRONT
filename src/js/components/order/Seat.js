import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {addSeatToOrder, removeSeatFromOrder} from "../../actions/order_actions";

class Seat extends Component {

    state = {
        blocked: false,
        selected: false
    };

    componentDidMount() {
        this.setState({
            blocked: !this.props.seat.free,
            selected: this.props.selectedSeats.indexOf(this.props.seat) !== -1
        });
    }

    componentDidUpdate() {
        const selected = this.props.selectedSeats.indexOf(this.props.seat) !== -1;
        if (selected !== this.state.selected) {
            this.setState({
                selected
            });
        }
    }

    buildSeatStyles = (seat) => {
        if (this.state.selected) {
            return "seat-selected"
        } else if (!seat.free) {
            this.state.blocked = true;
            return "seat-blocked";
        } else if (seat.vip) {
            return "seat-vip";
        } else {
            return "";
        }
    };

    handleSeatClick = (seat) => {
        const seatItem = seat;
        if (this.state.selected) {
            this.props.removeSeatFromOrder(seatItem);
        } else {
            this.props.addSeatToOrder(seatItem);
        }
    };

    render() {
        return (
            <div
                className={"seat-cell " + this.buildSeatStyles(this.props.seat)}
                onClick={() => this.state.blocked ? "" : this.handleSeatClick(this.props.seat)}
            >{this.props.seat.id}</div>
        );
    }
}

const mapStateToProps = state => ({
    selectedSeats: state.order ? state.order.selectedSeats : []
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {addSeatToOrder, removeSeatFromOrder},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (Seat);