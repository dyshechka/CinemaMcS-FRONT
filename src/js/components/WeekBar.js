import React, {Component} from 'react';
import {Row, Button, Container} from "reactstrap";
import moment from 'moment';
import {loadFilmsForCurrentDay, loadFilmsForDate} from "../actions/film_actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class WeekBar extends Component {

    constructor(props) {
        super(props);
        this.state = {activeButton: 0};
    }

    loadForDate(timeStamp, index) {
        this.props.loadFilmsForDate(timeStamp);
        this.setState({
            activeButton: index
        });
    };

    render() {
        let days = [];
        for (let i = 0; i < 7; i++) {
            let m = moment(new Date());
            m.add(i, 'days');
            days.push(m);
        }

        const buttonClasses = 'week-bar-button button-color-two';

        const weekDays = days.map((day, index) => (
            <Button active={this.state.activeButton === index} className={buttonClasses} key={index} onClick={() => this.loadForDate(day.valueOf(), index)}>
                {day.format("D.MM.YYYY")}
            </Button>
        ));
        return (
          <Row className="justify-content-center mt-3 mb-3">
              {weekDays}
          </Row>
        );
    }
}

const mapStateToProps = state => ({
    films: state.films
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadFilmsForDate: loadFilmsForDate},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (WeekBar);