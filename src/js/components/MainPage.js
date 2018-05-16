import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import React, {Component} from 'react';
import {loadFilmsForCurrentDay} from "../actions/film_actions";
import {Button} from "reactstrap";
import WeekBar from "./WeekBar";
import {selectSeanceWithFilm} from "../actions/order_actions";
import {Link} from "react-router-dom";

class MainPage extends Component {

    componentDidUpdate() {
        this.checkAndLoadFilms();
    }

    componentDidMount() {
        this.checkAndLoadFilms();
    }

    checkAndLoadFilms() {
        if (!this.props.films) {
            this.props.loadFilms();
        }
    }

    selectSeanceWithFilm(seance) {
        if (!this.props.seance) {
            this.props.selectSeanceWithFilm(seance);
        }
    }

    filmList = () => this.props.films ? this.props.films : [];

    formatDuration = (duration) => {
      let hours = Math.floor(duration / 60) + " ч. ";
      let minutes = duration % 60 + " мин.";
      return hours + minutes;
    };

    formatSeanceTime = (timeStamp) => {
        const date = new Date(timeStamp);
        const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();
        return date.getHours() + ":" + minutes;
    };

    getSeancesByFormat = (film, format, buttonClass) => {
        const seances = film.seances.filter(seance =>  seance.format.name === format);
        const buttonColor = buttonClass + " m-2 no-round-edges-button seance-button";
        return seances.map((seance, index) => (
            <Link to="/select-seat" className={buttonColor} key={index + "-seance"} onClick={() => this.selectSeanceWithFilm(seance)}>
                {this.formatSeanceTime(seance.time)}
            </Link>
        ));
    };

    render() {
        const filmList = this.filmList() ? this.filmList().map((film, index) => (
            <div key={index + '-film'} className="d-flex p-2 border-bottom border-1 border-secondary">
                <div className="w-15 d-flex flex-column text-left">
                    <h5>{film.film.name}</h5>
                    <div className="flex-row">{film.film.genres.map((item, index) => (
                        index === film.film.genres.length - 1 ? item.name + " " : item.name + ", "))}
                    </div>
                    <div>
                        {this.formatDuration(film.film.duration)}
                    </div>
                </div>
                <div className="w-10 flex-column text-center">
                    <div className="h-50 d-flex justify-content-center align-items-center">
                        <div>
                            {film.film.imdb}
                        </div>
                    </div>
                    <div className="h-50 d-flex justify-content-center align-items-center">
                        <div>
                            {film.film.ageRestrictions[0].name}
                        </div>
                    </div>
                </div>
                <div className="w-15">
                    <div className="h-50 d-flex justify-content-center align-items-center">
                        <div>
                            2D
                        </div>
                    </div>
                    <div className="h-50 d-flex justify-content-center align-items-center">
                        <div>
                            3D
                        </div>
                    </div>
                </div>
                <div className="w-60 d-flex flex-column">
                    <div className="h-50 d-flex justify-content-start align-items-center">{this.getSeancesByFormat(film, "2D", "button-color-one")}</div>
                    <div className="h-50 d-flex justify-content-start align-items-center">{this.getSeancesByFormat(film, "3D", "button-color-two")}</div>
                </div>
            </div>
        )) : (
            <Container>loading...</Container>
        );

        return (
            <div>
                <WeekBar/>
                {filmList}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    films: state.films,
    seance: state.seance
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadFilms: loadFilmsForCurrentDay, selectSeanceWithFilm: selectSeanceWithFilm},
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);