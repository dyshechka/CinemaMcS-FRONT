import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React, {Component} from 'react';
import {addSeatToOrder} from "../../actions/order_actions";
import {Container, Row} from "reactstrap";
import WeekBar from "../WeekBar";
import seance from "../../reducers/seance";
import Seat from "./Seat";

class OrderSelectSeat extends Component {

    createSeatsGrid = () => this.props.hall ? this.props.hall.rows.rows : [];

    getHall = () => this.props.hall ? this.props.hall.rows.name : null;

    getSeance = () => this.props.seance ? this.props.seance : {};

    getFilms = () => this.props.films ? this.props.films : [];

    formatDuration = (duration) => {
        let hours = Math.floor(duration / 60) + " ч. ";
        let minutes = duration % 60 + " мин.";
        return hours + minutes;
    };

    dateFormat = (timeStamp) => {
        let date = new Date(timeStamp);
        let formatDate = date.getDate();
        const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        formatDate = formatDate + '.' + month + '.' + date.getFullYear() + ' ';
        formatDate = formatDate + date.getHours() + ':';
        const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();
        formatDate = formatDate + minutes;
        return formatDate;
    };

    componentDidMount() {
        if (!this.getSeance()) {
            this.props.seance = this.props.loadSeance;
        }
    }

    render() {
        let film = null;
        let seance = null;
        if (this.props.seance) {
            film = this.getFilms().filter(f => f.film.id === this.props.seance.filmId)[0].film;
            seance = this.getFilms().filter(f => f.film.id === this.props.seance.filmId)[0].seances.filter(s => s.id === this.props.seance.id)[0];
        }
        if (film != null) {
            film = (<div className="d-flex p-2 border-bottom border-1 border-secondary">
                <div className="w-15 d-flex flex-column text-left">
                    <h5>{film.name}</h5>
                    <div className="flex-row">{film.genres.map((item, index) => (
                        index === film.genres.length - 1 ? item.name + " " : item.name + ", "))}
                    </div>
                    <div>
                        {this.formatDuration(film.duration)}
                    </div>
                </div>
                <div className="w-10 flex-column text-center">
                    <div className="h-50 d-flex justify-content-center align-items-center">
                        <div>
                            {film.imdb}
                        </div>
                    </div>
                    <div className="h-50 d-flex justify-content-center align-items-center">
                        <div>
                            {film.ageRestrictions[0].name}
                        </div>
                    </div>
                </div>
                <div className="w-15 seance-type-cell">
                    {seance.format.name}
                </div>
                <div className="w-30 d-flex flex-row justify-content-center">
                    <div className="seance-type-cell">{this.dateFormat(seance.time)}</div>
                </div>
                <div className="w-50 d-flex flex-row justify-content-center">
                    <div className="seance-type-cell">{this.getHall() != null ? this.getHall() + " зал" : ""}</div>
                </div>
            </div>)
        }

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
        return(
            <div>
                {film}
                {rows}
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
    {loadSeance: seance, addSeatToOrder: addSeatToOrder},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelectSeat);