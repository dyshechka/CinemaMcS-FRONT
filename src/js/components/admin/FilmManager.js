import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Input, Table} from "reactstrap";
import {
    addSeance, cleanDateInSchedule, cleanFilmFormatInSchedule,
    cleanFilmInSchedule, cleanHallInSchedule, cleanScheduleFilmFormats, cleanScheduleFilms,
    cleanScheduleFreeTime, cleanScheduleSeances, cleanTimeInSchedule, getFilmFormats, getFilmsDate,
    getFreeTimes, selectDateInSchedule, selectFilmFormatInSchedule,
    selectFilmInSchedule, selectHallInSchedule, selectTimeInSchedule
} from "../../actions/schedule_actions";
import {formatDuration} from "../../util/formatters";
import {
    applyEditFilm,
    cleanEditFilm,
    cleanSelectedGenres,
    getAllFilms,
    getAllGenres,
    setEditFilm,
    setSelectedGenres
} from "../../actions/film_actions";

class FilmManager extends Component {

    componentDidMount() {
        this.loadDataForCrud()
    }

    loadDataForCrud() {
        if (!this.props.allFilms) {
            this.props.getAllFilms();
        }
        if (!this.props.allGenres) {
            this.props.getAllGenres();
        }
    }

    crudPanel = () => {
        return (
            <div className="d-flex flex-row pt-3 pb-3">
                <Button className="btn btn-success mr-2">
                    Добавить фильм
                </Button>
                <Button className="btn btn-danger mr-2">
                    Удалить фильм
                </Button>
            </div>
        )
    };

    getFilmById = (filmId) => {
        return this.props.allFilms.filter(film => film.id === filmId)[0];
    };

    selectFilm = (filmId) => {
        const selectedEditFilm = Object.assign({}, this.getFilmById(filmId));
        this.props.setEditFilm(selectedEditFilm);
    };

    getGenresList = () => {
        const genreList = this.props.editFilm.genres.map(g => g.name);
        return (
            this.props.allGenres.map(genre => (
                <label key={"genre-label" + genre.id}>
                    {genre.name}
                    <input key={"genre-id-" + genre.id}
                        name={"genre" + genre.id}
                        type="checkbox"
                        checked={genreList.indexOf(genre.name) > -1}
                        value={genre.id}
                        onChange={this.handleGenreChange} />
                </label>
            ))
        )
    };

    changeFilmName = (e) => {
        this.changeField("name", e.target.value);
    };

    changeDuration = (e) => {
        this.changeField("duration", e.target.value);
    };

    changeRating = (e) => {
        this.changeField("imdb", e.target.value);
    };

    changeField = (attr, value) => {
        let editFilm = this.props.editFilm;
        editFilm = {
            ...editFilm,
            [attr]: value
        };
        this.props.setEditFilm(editFilm);
    };

    handleGenreChange = (event) => {
        const target = event.target;
        let selectedGenres = this.props.editFilm.genres;
        const checkExisting = selectedGenres.filter(genre => genre.id == target.value);

        if (checkExisting.length > 0) {
            selectedGenres.forEach((selectedGenre, index) => {
               if (selectedGenre.id == target.value && selectedGenres.length - 1 !== 0) {
                   selectedGenres.splice(index, 1);
               }
            });
            let editFilm = this.props.editFilm;
            editFilm = {
                ...editFilm,
                genres: selectedGenres
            };
            this.props.setEditFilm(editFilm);
        } else {
            const selectedGenreFromCommonList = this.props.allGenres.filter(g => g.id == target.value)[0];
            selectedGenres.push(selectedGenreFromCommonList);
            let editFilm = this.props.editFilm;
            editFilm = {
                ...editFilm,
                genres: selectedGenres
            };
            this.props.setEditFilm(editFilm);
        }
    };

    render() {
        const filmList = this.props.allFilms ? this.props.allFilms.map(film =>
            <tr key={film.id} onClick={() => this.selectFilm(film.id)}>
                <th scope="row">{film.id}</th>
                <td>{film.name}</td>
                <td>{film.duration}</td>
                <td>{film.genres.map((g, index) => index === film.genres.length - 1 ? g.name + "" : g.name + ",")}</td>
                <td>{film.ageRestrictions.map((a, index) => index === film.ageRestrictions.length - 1 ? a.name + "" : a.name + ",")}</td>
                <td>{film.imdb}</td>
                <td>{film.countries.map((c, index) => index === film.countries.length - 1 ? c.name + "" : c.name + ",")}</td>
            </tr>) : (null);


        const editFilm = this.props.editFilm ? (
            <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <b className="edit-film-label">Название:</b> <Input style={{width: 300 + "px"}} onChange={this.changeFilmName} value={this.props.editFilm.name}/>
                    </div>
                    <div className="d-flex flex-row">
                        <b className="edit-film-label">Продолжительность:</b> <Input style={{width: 300 + "px"}} type="number" onChange={this.changeDuration} value={this.props.editFilm.duration}/>
                    </div>
                    <div className="d-flex flex-row">
                        <b className="edit-film-label">Рейтинг (IMDB): </b><Input style={{width: 300 + "px"}} type="number" onChange={this.changeRating} value={this.props.editFilm.imdb}/>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        {this.getGenresList()}
                    </div>
                </div>
                <Button className="btn btn-info mr-2" onClick={() => this.props.applyEditFilm(this.props.editFilm)}>
                    Редактировать фильм
                </Button>
            </div>
        ) : null;

        return (
            <div>
                Film manager
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Название</th>
                                <th>Продолжительность (мин)</th>
                                <th>Жанры</th>
                                <th>Возрастные ограничения</th>
                                <th>IMDB</th>
                                <th>Страны</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filmList}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex flex-column">
                    <div>
                        {editFilm}
                    </div>
                </div>
                {this.crudPanel()}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allFilms: state.filmCrud ? state.filmCrud.allFilms : null,
    allGenres: state.filmCrud ? state.filmCrud.allGenres : null,
    editFilm: state.filmCrud ? state.filmCrud.editFilm : null,
});

const mapDispatchToProps = dispatch => bindActionCreators(
    {
        getAllFilms,
        getAllGenres,
        cleanSelectedGenres,
        setSelectedGenres,
        setEditFilm,
        cleanEditFilm,
        applyEditFilm,
    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (FilmManager);