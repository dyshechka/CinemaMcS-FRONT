import React, {Component} from 'react';
import {Row, Button, Container} from "reactstrap";
import moment from 'moment';

class WeekBar extends Component {
    render() {
        let days = [];
        for (let i = 0; i < 7; i++) {
            let m = moment(new Date());
            m.add(i, 'days');
            days.push(m);
        }
        const weekDays = days.map((day, index) => (
            <Button className="week-bar-button button-color-two" key={index}>
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

export default WeekBar;