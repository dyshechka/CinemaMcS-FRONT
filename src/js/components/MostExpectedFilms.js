import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {loadMostExpectedFilms} from "../actions/film_actions";

class MostExpectedFilms extends Component {

    componentDidMount() {
    }

    loadMostExpectedFilms = () => {
        if (!this.props.mostExpectedFilms) {
            this.props.loadMostExpectedFilms();
        }
    };

    render() {
        return (
            <div>
                {this.loadMostExpectedFilms()}
                <img src=""/>
                <div className="text-center pt-3 pb-3">
                    <h3>Самые ожидаемые фильмы</h3>
                </div>
                <div className="d-flex flex-wrap vacancy-block-wrapper flex-row">
                    {this.props.mostExpectedFilms ? this.props.mostExpectedFilms.map(film => (
                        <div key={film.id} className="d-flex flex-column m-3" style={{height: 360 + "px"}}>
                            <img style={{width: 200 + "px"}} src={"http://localhost:8082/getImg?filmId=" + film.id}></img>
                            <div className="d-flex flex-column">
                                <div className="pb-2 text-center">
                                    <div>
                                        {film.name}
                                    </div>
                                </div>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-row justify-content-center">
                                        {film.genres.map((g, index) => <div key={"genre-" + index}>{index === film.genres.length - 1 ? g.name + "" : g.name + ","}</div>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (<div>Loading...</div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    mostExpectedFilms: state.films ? state.films.mostExpectedFilms : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {loadMostExpectedFilms},
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (MostExpectedFilms);