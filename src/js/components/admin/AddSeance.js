import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Input} from "reactstrap";
import {addSeance, cleanScheduleFreeTime, getFreeTimes} from "../../actions/schedule_actions";
import {formatDuration} from "../../util/formatters";

class AddSeance extends Component {

    componentDidMount() {
        this.setState({
            ...this.state,
            hallId: this.props.hallId
        });
    }

    state = {
        film: null,
        hallId: null,
        date: null,
        filmFormat: null
    };

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
            result.push((<option key={"filmFormat-id-stub"}>{"Выберите формат фильма"}</option>));
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
                this.setState({
                    ...this.state,
                    film: films[0]
                });
            }
        }
    };

    handleChangeFormat = (e) => {
        const formatName = e.target.value;
        if (formatName === "Выберите формат фильма") {
            return;
        }

        const result = this.props.filmFormats.filter(filmFormat => filmFormat.name === formatName);
        this.setState({
            ...this.state,
            filmFormat: result[0]
        });
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
        this.setState({
            ...this.state,
            date: date
        });
    };

    showFilmInfo = (film) => {
        return (
            <div>
                <div>{film.name}</div>
                <div>{formatDuration(film.duration)}</div>
                <div>{film.ageRestrictions[0].name}</div>
            </div>
        );
    };

    checkForSave = () => {
        return this.state.film && this.state.date && this.state.filmFormat && this.state.hallId;
    };

    render() {
        return (
            <div>
                <Input type="select" onChange={this.handleFilmSelection} id="films">
                    {this.getFilms()}
                </Input>
                <div>
                    {this.state.film ? this.showFilmInfo(this.state.film) : ""}
                </div>
                <Input type="select" id="freeTimes" onChange={this.handleChangeTime}>
                    {this.getFreeTimes()}
                </Input>
                <Input type="select" id="filmFormats" onChange={this.handleChangeFormat}>
                    {this.getFilmFormats()}
                </Input>
                {
                    this.checkForSave() ? ( <Button className="btn-success"
                                                    onClick={() => this.props.addSeance(this.state)}>Сохранить</Button>)
                        : ("")
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    freeTimes: state.schedule ? state.schedule.freeTimes : [],
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getFreeTimes,
        cleanScheduleFreeTime,
        addSeance
    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (AddSeance);