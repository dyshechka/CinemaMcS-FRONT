import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import moment from "moment/moment";
import {Button, Input} from "reactstrap";
import {loadHalls} from "../../actions/hall_actions";
import {
    cleanScheduleFilms,
    cleanScheduleSeances,
    getFilmsByIds,
    loadSeancesForDateAndHall
} from "../../actions/schedule_actions";

class OrderPayment extends Component {

    state = {
      hallId: null,
      date: null,
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
    };

    loadSchedule = () => {
        this.state.hallId && this.state.date && this.props.seances === null ? this.props.loadSeancesForDateAndHall(this.state.date, this.state.hallId) : [];
    };

    getFilmIds = () => {
        let filmIds = [];
        this.props.seances ? this.props.seances.map(seance => {
            filmIds.push(seance.filmId);
        }) : null;

        return filmIds;
    };

    loadFilms = () => {
        if (this.props.seances && this.props.seances.length > 0 && !this.props.films) {
            this.props.getFilmsByIds(this.getFilmIds());
        }
    };

    componentDidUpdate() {
        console.log(this.props.seances);
        console.log(this.props.films);
    }

    render() {
        return (
            <div>
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
                {/*<div className="justify-content-center d-flex">*/}
                    {/*<Button onClick={() => this.loadFilms()}>Загрузить расписание</Button>*/}
                {/*</div>*/}
                <div>
                    {this.loadFilms()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    halls: state.hall ? state.hall.halls : [],
    films: state.schedule ? state.schedule.films : [],
    seances: state.schedule ? state.schedule.seances : []
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadHalls, loadSeancesForDateAndHall, cleanScheduleSeances, getFilmsByIds, cleanScheduleFilms},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (OrderPayment);