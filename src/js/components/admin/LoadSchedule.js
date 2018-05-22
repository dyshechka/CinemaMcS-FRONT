import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment/moment";
import {Button, Card, Input} from "reactstrap";
import {loadHalls} from "../../actions/hall_actions";
import {
    cleanScheduleFilmFormats,
    cleanScheduleFilms, cleanScheduleFreeTime,
    cleanScheduleSeances, getFilmFormats,
    getFilmsDate, getFreeTimes,
    loadSeancesForDateAndHall
} from "../../actions/schedule_actions";
import {getFormattedDate, formatDuration} from "../../util/formatters";
import AddSeance from "./AddSeance";

class OrderPayment extends Component {

    // TODO hardcoded
    state = {
      hallId: 1,
      date: 1526803200000,
    };

    componentDidMount() {
        this.props.loadHalls();
    }

    getDates = () => {
        let days = [];
        days.push(<option key={"month-stub"}>{"Выберите день"}</option>);
        for (let i = 0; i < 7; i++) {
            let m = moment(new Date());
            m.add(i, 'days');
            m.days();
            days.push(<option key={"month-" + i}>{m.format("D.M.YYYY")}</option>);
        }

        return days;
    };

    getHalls = () => {
        let halls = [];
        halls.push(<option key={"hall-stub"}>{"Выберите зал"}</option>);
        const generated = this.props.halls ? this.props.halls.map(hall => (<option key={"hall-" + hall.id}>{hall.name}</option>)) : "";
        halls = halls.concat(generated);
        return halls;
    };

    selectDate = (e) => {
        const incDate = e.target.value;
        if (incDate === "Выберите день") {
            return;
        }
        const incDates = incDate.split("\.");
        let date = new Date(incDates[2], incDates[1] - 1, incDates[0]);
        this.setState({date: date.getTime()});
        this.props.cleanScheduleSeances();
        this.props.cleanScheduleFilms();
        this.props.cleanScheduleFreeTime();
        this.props.cleanScheduleFilmFormats();
    };

    selectHall = (e) => {
        const hallName = e.target.value;
        if (hallName === "Выберите зал") {
            return;
        }
        const hallId = this.props.halls ? this.props.halls.filter(hall => hall.name === hallName)[0].id : null;
        this.setState({hallId: hallId});
        this.props.cleanScheduleSeances();
        this.props.cleanScheduleFilms();
        this.props.cleanScheduleFreeTime();
    };

    // Loads list of seances for selected date and hall
    // Will work only if attributes: hall ID and date are filled by user
    loadSchedule = () => {
        this.state.hallId && this.state.date && this.props.seances === null ? this.props.loadSeancesForDateAndHall(this.state.date, this.state.hallId) : [];
    };

    // Loads films according film ids which enable from seance list. Without seance list loading of films doens't make sense
    loadFilms = () => {
        if (!this.props.films) {
            this.props.getFilmsDate(this.state.date);
        }
        if (!this.props.filmFormats) {
            this.props.getFilmFormats();
        }
    };

    getFilmInfo = (filmId) => {
        const info = this.props.films ? this.props.films.filter(film => film.id === filmId)[0] : null;
        if (info == null) {
            return "";
        }

        return (
          <div>
              <div>{info.name}</div>
              <div>{formatDuration(info.duration)}</div>
              <div>{info.ageRestrictions[0].name}</div>
          </div>
        );
    };

    componentDidUpdate() {
    }

    render() {

        const seanceCellWidth = {
            width: this.props.seances ? 100 / this.props.seances.length + 1 + "%" : 0,
            cursor: "pointer"
        };

        const seances = this.props.seances ? this.props.seances.map(seance => (
            <Card key={"seance-cell-" + seance.id} style={seanceCellWidth}>
                <div>{getFormattedDate(seance.time)}</div>
                <div>{this.getFilmInfo(seance.filmId)}</div>
            </Card>
        )) : (<div>Loading...</div>);

        const freeTimes = this.props.freeTimes ? console.log(this.props.freeTimes) : "";

        return (
            <div>
                {freeTimes}
                {this.loadSchedule()}
                <div className="text-center p-3">
                    <h3>Составить расписание</h3>
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <div className="">
                        <Input type="select"className="medium-input-field" onChange={this.selectDate} placeholder="Выберите день">
                            {
                                this.getDates()
                            }
                        </Input>
                    </div>
                    <div>
                        <Input type="select"className="medium-input-field" onChange={this.selectHall} placeholder="Выберите зал">
                            {
                                this.getHalls()
                            }
                        </Input>
                    </div>
                </div>
                {this.loadFilms()}
                <div className="d-flex flex-row">
                    {seances}
                    <Card className="add-seance-button d-flex justify-content-center text-center" style={seanceCellWidth}>
                        Добавить сеанс
                    </Card>
                </div>
                <AddSeance filmFormats={this.props.filmFormats} hallId={this.state.hallId} date={this.state.date} freeTimes={this.props.freeTimes} films={this.props.films}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    halls: state.hall ? state.hall.halls : [],
    films: state.schedule ? state.schedule.films : [],
    filmFormats: state.schedule ? state.schedule.filmFormats : [],
    seances: state.schedule ? state.schedule.seances : []
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        loadHalls,
        loadSeancesForDateAndHall,
        cleanScheduleSeances,
        getFilmsDate,
        cleanScheduleFilms,
        getFilmFormats,
        cleanScheduleFilmFormats,
        getFreeTimes,
        cleanScheduleFreeTime,
    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderPayment);