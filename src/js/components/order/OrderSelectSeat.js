import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React, {Component} from 'react';
import {addSeatToOrder, calculateOrder} from "../../actions/order_actions";
import {Button, Container, Row} from "reactstrap";
import WeekBar from "../WeekBar";
import seance from "../../reducers/seance";
import Seat from "./Seat";
import {Link} from "react-router-dom";
import OrderFilmPlate from "./OrderFilmPlate";

class OrderSelectSeat extends Component {

    createSeatsGrid = () => this.props.hall ? this.props.hall.rows.rows : [];

    getSeance = () => this.props.seance ? this.props.seance : {};

    getSelectedSeats = () => {
        return this.props.selectedSeats.length > 0 ? this.props.selectedSeats : [];
    };

    componentDidUpdate() {
        if (!this.getSeance()) {
            this.props.seance = this.props.loadSeance;
        }
    }

    componentDidMount() {
        if (!this.getSeance()) {
            this.props.seance = this.props.loadSeance;
        }
    }

    render() {
        const rows = this.createSeatsGrid() ? this.createSeatsGrid().map(row =>
            <Row className="flex-row justify-content-center" key={"row" + row.rowNumber}>
                <div className="w-5 row-cell">
                    <div>{row.rowNumber}</div>
                </div>
                <div className="w-90 row-block d-flex flex-row justify-content-center">
                    {row.seats.map(seat => (<Seat key={seat.id} seat={seat}/>))}</div>
                <div className="w-5 row-cell"><div>{row.rowNumber}</div></div>
            </Row>)
        : (<div>loading...</div>);

        const legend = (
            <Row className="justify-content-center pt-3 mt-3 border-top border-1 border-secondary">
                <div className="w-25 d-flex flex-column align-items-center">
                    <div className="seat-cell" id="usual-seat"></div><label style={{paddingTop: "12px"}} htmlFor="usual-seat">Обычное</label>
                </div>
                <div className="w-25 d-flex flex-column align-items-center">
                    <div className="seat-cell seat-vip" id="vip-seat"></div><label style={{paddingTop: "12px"}}  htmlFor="vip-seat">VIP</label>
                </div>
                <div className="w-25 d-flex flex-column align-items-center">
                    <div className="seat-cell seat-blocked" id="bought-seat"></div><label style={{paddingTop: "12px"}}  htmlFor="bought-seat">Куплено</label>
                </div>
                <div className="w-25 d-flex flex-column align-items-center">
                    <div className="seat-cell seat-selected" id="selected-seat"></div><label style={{paddingTop: "12px"}}  htmlFor="selected-seat">Выбрано</label>
                </div>
            </Row>
        );

        const selectedSeats = (
            <Row className="justify-content-center pt-3 mt-3 border-top border-1 border-secondary">
                {this.getSelectedSeats().map(seat => (<div className="p-3" key={"seat-id-" + seat.id}>{"Ряд: " + seat.row + " Место: " + seat.number}</div>))}
            </Row>
        );

        return(
            <div>
                <OrderFilmPlate/>
                {rows}
                {legend}
                {selectedSeats}
                <Row className="justify-content-end">
                    <Link to="/calculate-order" className="button-color-one p-2">Продолжить</Link>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hall: state.hall,
    seance: state.seance,
    films: state.films,
    selectedSeats: state.order ? state.order.selectedSeats : []
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadSeance: seance, addSeatToOrder: addSeatToOrder, calculateOrder: calculateOrder},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectSeat);