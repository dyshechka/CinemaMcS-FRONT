import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {cleanVacancies, getVacancies} from "../actions/vacancy_actions";

class VacanciesList extends Component {

    componentDidMount() {
        this.props.cleanVacancies();
    }

    loadVacancies = () => {
        if (!this.props.vacancies) {
            this.props.getVacancies();
        }
    };

    render() {
        return (
            <div>
                {this.loadVacancies()}
                <div className="d-flex flex-wrap vacancy-block-wrapper flex-column">
                    {this.props.vacancies ? this.props.vacancies.map(vacancy => (
                        <div key={"vacancy-" + vacancy.id} className="d-flex vacancy-block">
                            <div></div>
                            <div className="pb-2"><h4>{"Должность: " + vacancy.name}</h4></div>
                            <div className="pb-2">{"Опыт работы: " + vacancy.workExperience}</div>
                            <div className="pb-2">{"График: "} <i>{vacancy.schedule}</i></div>
                            <div className="d-flex flex-column pb-2">
                                <div className="pr-2">{"Обязанности: "}</div>
                                <div className="d-flex flex-row">
                                    <i>{vacancy.duties.map((v, index) => <div key={"duty-" + index}>{index === vacancy.duties.length - 1 ? v.name + "" : v.name + ","}</div>)}</i>
                                </div>
                            </div>
                            <div className="d-flex flex-column pb-2">
                                <div className="pr-2">{"Требования: "}</div>
                                <div className="d-flex flex-row">
                                    <i>{vacancy.requirements.map((r, index) => <div key={"requirement-" + index}>{index === vacancy.requirements.length - 1 ? r.name + "" : r.name + ","}</div>)}</i>
                                </div>
                            </div>
                            <div className="pb-2">{"Зарплата: "} <i>{vacancy.salary} P</i></div>
                            <div className="pb-2">{"Статус: "} <i>{vacancy.statuses[0].name}</i></div>
                        </div>
                    )) : (<div>Loading...</div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    vacancies: state.vacancy ? state.vacancy : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {getVacancies, cleanVacancies},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (VacanciesList);