import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Input} from "reactstrap";
import {
    addSeance, cleanDateInSchedule, cleanFilmFormatInSchedule,
    cleanFilmInSchedule, cleanHallInSchedule, cleanScheduleFilmFormats, cleanScheduleFilms,
    cleanScheduleFreeTime, cleanScheduleSeances, cleanTimeInSchedule, getFilmFormats, getFilmsDate,
    getFreeTimes, selectDateInSchedule, selectFilmFormatInSchedule,
    selectFilmInSchedule, selectHallInSchedule, selectTimeInSchedule
} from "../../actions/schedule_actions";
import {formatDuration} from "../../util/formatters";

class AddSeance extends Component {

    componentDidMount() {

    }

    getFilms = () => {
        if (!this.props.films) {
            return (<option key={"nothing"}>Нет вариантов</option>);
        } else {
            let result = [];
            result.push((<option key={"film-id-stub"}>{"Выберите фильм"}</option>));
            const films = this.props.films.map(film => (<option key={"film-id-" + film.id}>{film.name}</option>));
            result = result.concat(films);
            return result;
        }
    };

    getFreeTimes = () => {
        if (!this.props.freeTimes) {
            return (<option key={"nothing"}>Нет вариантов</option>);
        } else {
            let result = [];
            result.push((<option key={"freetime-id-stub"}>{"Выберите время"}</option>));
            const times = this.props.freeTimes.map((freeTime, index) =>
                (<option key={"free-time-" + index}>{this.getFormattedDate(freeTime.start) + "-" + this.getFormattedDate(freeTime.finish)}</option>));
            result = result.concat(times);
            return result;
        }
    };

    getFilmFormats = () => {
        if (!this.props.filmFormats) {
            return (<option key={"nothing"}>Нет вариантов</option>);
        } else {
            let result = [];
            result.push((<option key={"filmFormat-id-stub"}>{"Выберите формат"}</option>));
            const times = this.props.filmFormats.map((filmFormat, index) =>
                (<option key={"film-format" + index}>{filmFormat.name}</option>));
            result = result.concat(times);
            return result;
        }
    };

    getFormattedDate = (timeStamp) => {
        let date = new Date(timeStamp);
        let formatDate = date.getHours() + ':';
        const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();
        formatDate = formatDate + minutes;
        return formatDate;
    };

    loadFreeTimes = (filmId) => {
        if (this.props.films) {
            this.props.getFreeTimes(this.props.date, this.props.hallId, filmId);
        }
    };

    handleFilmSelection = (e) => {
        this.props.cleanScheduleFreeTime();
        const filmName = e.target.value;
        if (filmName === "Выберите фильм") {
            return;
        }
        if (this.props.films) {
            const films = this.props.films.filter(film => film.name === filmName);
            if (films && films.length > 0) {
                this.loadFreeTimes(films[0].id);
                this.props.selectFilmInSchedule(films[0]);
            }
        }
    };

    handleChangeFormat = (e) => {
        const formatName = e.target.value;
        if (formatName === "Выберите формат") {
            return;
        }

        const result = this.props.filmFormats.filter(filmFormat => filmFormat.name === formatName);
        this.props.selectFilmFormatInSchedule(result[0]);
    };

    handleChangeTime = (e) => {
        const time = e.target.value;
        if (time === "Выберите время") {
            return;
        }
        const dateTime = time.split("-")[0];
        const dateTimeSplitted = dateTime.split(":");
        const propsDate = this.props.date;
        const propsDateAsDate = new Date(propsDate);
        const date = new Date(propsDateAsDate.getFullYear(), propsDateAsDate.getMonth(), propsDateAsDate.getDate(), dateTimeSplitted[0], dateTimeSplitted[1]);
        this.props.selectTimeInSchedule(date);
    };

    showFilmInfo = (film) => {
        return (
            <div className="d-flex flex-row order-block show-film-info">
                <div className="d-flex flex-column pr-4">
                    <div className="pb-2">
                    <div>{"Название: "}</div>
                <div>
                    {film.name}
                </div>
            </div>
                <div className="pb-2">
                    <div>{"Продолжительность: "}</div>
                    <div>
                        {formatDuration(film.duration)}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="pr-2">{"Жанр: "}</div>
                    <div className="d-flex flex-row">
                        {film.genres.map((g, index) => <div key={"genre-" + index}>{index === film.genres.length - 1 ? g.name + "" : g.name + ","}</div>)}
                    </div>
                </div>
            </div>
                <div className="d-flex flex-column pr-4">
                    <div className="pb-2">
                        <div>{"Возрастные ограничения: "}</div>
                        <div>
                            {film.ageRestrictions[0].name}
                        </div>
                    </div>
                    <div className="pb-2">{"IMDB: " + film.imdb}</div>
                    <div className="d-flex flex-column">
                        <div className="pr-1">{"Страна: "}</div>
                        <div className="d-flex flex-row">
                            {film.countries.map((r, index) => <div key={"country-" + index}>{index === film.countries.length - 1 ? r.name + "" : r.name + ","}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    checkForSave = () => {
        return this.props.selectedFilm && this.props.selectedHall && this.props.selectedFilmFormat && this.props.selectedTime;
    };

    addSeanceHandler = () => {
        const request = {
            filmId: this.props.selectedFilm.id,
            hallId: this.props.selectedHall,
            time: this.props.selectedTime,
            format: this.props.selectedFilmFormat,
            availability: true
        };

        this.props.addSeance(request);
        this.props.cleanScheduleSeances();
        this.props.cleanScheduleFilms();
        this.props.cleanScheduleFreeTime();
        this.props.cleanFilmInSchedule();
        this.props.cleanFilmFormatInSchedule();
    };

    render() {
        return (
            <div>
                <div className="d-flex flex-row flex-wrap seance-wrapper">
                    <div className="p-3 add-seance-select-box">
                        <Input type="select" onChange={this.handleFilmSelection} id="films">
                            {this.getFilms()}
                        </Input>
                    </div>

                    <div className="p-3 add-seance-select-box">
                        <Input type="select" id="freeTimes" onChange={this.handleChangeTime}>
                            {this.getFreeTimes()}
                        </Input>
                    </div>
                    <div className="p-3 add-seance-select-box">
                        <Input type="select" id="filmFormats" onChange={this.handleChangeFormat}>
                            {this.getFilmFormats()}
                        </Input>
                    </div>
                    <div className="d-flex justify-content-center">
                        {this.props.selectedFilm ? (
                            <div className="d-flex flex-column">
                                <div className="text-center"><h5>Информация о фильме</h5></div>
                                {this.showFilmInfo(this.props.selectedFilm)}
                            </div>) : ""}
                    </div>
                </div>
                <div className="p-3 d-flex justify-content-center">
                    {
                        this.checkForSave() ? ( <Button className="btn-success" onClick={() => this.addSeanceHandler()}>Сохранить</Button>) : ("")
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    freeTimes: state.schedule ? state.schedule.freeTimes : [],
    selectedFilm: state.schedule ? state.schedule.scheduleFilm : null,
    selectedHall: state.schedule ? state.schedule.scheduleHall : null,
    selectedFilmFormat: state.schedule ? state.schedule.scheduleFilmFormat : null,
    selectedTime: state.schedule ? state.schedule.scheduleTime : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getFreeTimes,
        cleanScheduleFreeTime,
        addSeance,
        selectFilmInSchedule,
        cleanFilmInSchedule,
        selectTimeInSchedule,
        cleanTimeInSchedule,
        selectHallInSchedule,
        cleanHallInSchedule,
        selectFilmFormatInSchedule,
        cleanFilmFormatInSchedule,
        cleanScheduleSeances,
        getFilmsDate,
        cleanScheduleFilms,
        getFilmFormats,
        cleanScheduleFilmFormats,
        selectDateInSchedule,
        cleanDateInSchedule
    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (AddSeance);