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

class AddFilm extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                Add film
            </div>
        );
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {

    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (AddFilm);