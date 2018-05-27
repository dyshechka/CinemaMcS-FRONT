import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Button, Input, Table} from "reactstrap";
import {
    addNewFilm,
    applyEditFilm,
    cleanEditFilm,
    cleanSelectedCountries,
    cleanSelectedGenres,
    deleteFilm,
    getAllAgeRestrictions,
    getAllCountries,
    getAllFilms,
    getAllGenres, getAllRentalPeriods, setAddFilm,
    setEditFilm,
    setSelectedCountries,
    setSelectedGenres
} from "../../actions/film_actions";
import {FaPencil} from "react-icons/lib/fa/index";
import {MdDeleteForever} from "react-icons/lib/md/index";
import {getFormattedDate, getFormattedDateOnlyDay} from "../../util/formatters";

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
        if (!this.props.allCountries) {
            this.props.getAllCountries();
        }
        if (!this.props.allAgeRestrictions) {
            this.props.getAllAgeRestrictions();
        }
        if (!this.props.allRentalPeriods) {
            this.props.getAllRentalPeriods();
        }
    }

    crudPanel = () => {
        return (
            <div className="d-flex flex-row pt-3 pb-3">
                <Button onClick={() => this.createFilm()} className="btn btn-success mr-2">
                    Добавить фильм
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

    createFilm = () => {
        const newFilm = {
            name: null,
            duration: null,
            imdb: null,
            ageRestrictions: [],
            countries: [],
            genres: [],
            rentalPeriod: null
        };

        this.props.setAddFilm(newFilm);
    };

    getGenresList = () => {
        const genreList = this.props.editFilm.genres.map(g => g.name);
        return (
            this.props.allGenres.map(genre => (
                <label className="pr-3" key={"genre-label" + genre.id}>
                    <input key={"genre-id-" + genre.id}
                           name={"genre" + genre.id}
                           type="checkbox"
                           checked={genreList.indexOf(genre.name) > -1}
                           value={genre.id}
                           onChange={this.handleGenreChange} />
                    <span className="pl-1">{genre.name}</span>
                </label>
            ))
        )
    };

    getAddingGenresList = () => {
        const genreList = this.props.addFilm.genres.map(g => g.name);
        return (
            this.props.allGenres.map(genre => (
                <label className="pr-3" key={"genre-label" + genre.id}>
                    <input key={"genre-id-" + genre.id}
                           name={"genre" + genre.id}
                           type="checkbox"
                           checked={genreList.indexOf(genre.name) > -1}
                           value={genre.id}
                           onChange={this.handleAddingGenreChange} />
                    <span className="pl-1">{genre.name}</span>
                </label>
            ))
        )
    };

    getCountriesList = () => {
        const countryList = this.props.editFilm.countries.map(c => c.name);
        return (
            this.props.allCountries.map(country => (
                <label className="pr-3" key={"country-label" + country.id}>
                    <input key={"country-id-" + country.id}
                           name={"country" + country.id}
                           type="checkbox"
                           checked={countryList.indexOf(country.name) > -1}
                           value={country.id}
                           onChange={this.handleCountryChange} />
                    <span className="pl-1">{country.name}</span>
                </label>
            ))
        )
    };

    getAddingCountriesList = () => {
        const countryList = this.props.addFilm.countries.map(c => c.name);
        return (
            this.props.allCountries.map(country => (
                <label className="pr-3" key={"country-label" + country.id}>
                    <input key={"country-id-" + country.id}
                           name={"country" + country.id}
                           type="checkbox"
                           checked={countryList.indexOf(country.name) > -1}
                           value={country.id}
                           onChange={this.handleAddingCountryChange} />
                    <span className="pl-1">{country.name}</span>
                </label>
            ))
        )
    };

    getAgeRestrictionsList = () => {
        const ageRestrictionsList = this.props.editFilm.ageRestrictions.map(c => c.name);
        return (
            this.props.allAgeRestrictions.map(ageRestriction => (
                <label className="pr-3" key={"ageRestriction-label" + ageRestriction.id}>
                    <input key={"ageRestriction-id-" + ageRestriction.id}
                           name={"ageRestriction" + ageRestriction.id}
                           type="checkbox"
                           checked={ageRestrictionsList.indexOf(ageRestriction.name) > -1}
                           value={ageRestriction.id}
                           onChange={this.handleAgeRestrictionsChange} />
                    <span className="pl-1">{ageRestriction.name}</span>
                </label>
            ))
        )
    };

    getRentalPeriods = () => {
        const crudRentalPeriod = this.props.editFilm.rentalPeriod.id;
        return (
            this.props.allRentalPeriods.map(rentalPeriod => (
                <label className="pr-3" key={"rentalPeriod-label" + rentalPeriod.id}>
                    <input key={"rentalPeriod-id-" + rentalPeriod.id}
                           name={"rentalPeriod" + rentalPeriod.id}
                           type="checkbox"
                           checked={rentalPeriod.id === crudRentalPeriod}
                           value={rentalPeriod.id}
                           onChange={this.handleRentalPeriodChange} />
                    <span className="pl-1">{getFormattedDateOnlyDay(rentalPeriod.dateBegin)} - {getFormattedDateOnlyDay(rentalPeriod.dateEnd)}</span>
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

    handleRentalPeriodChange = (event) => {
        const target = event.target;
        let editFilm = this.props.editFilm;
        editFilm = {
            ...editFilm,
            rentalPeriod: this.props.allRentalPeriods.filter(rp => rp.id == target.value)[0]
        };
        this.props.setEditFilm(editFilm);
    };

    handleAgeRestrictionsChange = (event) => {
        const target = event.target;
        let selectedAgeRestrictions = this.props.editFilm.ageRestrictions;
        const checkExisting = selectedAgeRestrictions.filter(ageRestriction => ageRestriction.id == target.value);

        if (checkExisting.length > 0) {
            selectedAgeRestrictions.forEach((selectedAgeRestriction, index) => {
                if (selectedAgeRestriction.id == target.value && selectedAgeRestrictions.length - 1 !== 0) {
                    selectedAgeRestrictions.splice(index, 1);
                }
            });
            let editFilm = this.props.editFilm;
            editFilm = {
                ...editFilm,
                ageRestrictions: selectedAgeRestrictions
            };
            this.props.setEditFilm(editFilm);
        } else {
            const selectedAgeRepositoryFromCommonList = this.props.allAgeRestrictions.filter(a => a.id == target.value)[0];
            selectedAgeRestrictions.push(selectedAgeRepositoryFromCommonList);
            let editFilm = this.props.editFilm;
            editFilm = {
                ...editFilm,
                ageRestrictions: selectedAgeRestrictions
            };
            this.props.setEditFilm(editFilm);
        }
    };

    handleCountryChange = (event) => {
        const target = event.target;
        let selectedCountries = this.props.editFilm.countries;
        const checkExisting = selectedCountries.filter(country => country.id == target.value);

        if (checkExisting.length > 0) {
            selectedCountries.forEach((selectedCountry, index) => {
                if (selectedCountry.id == target.value && selectedCountries.length - 1 !== 0) {
                    selectedCountries.splice(index, 1);
                }
            });
            let editFilm = this.props.editFilm;
            editFilm = {
                ...editFilm,
                countries: selectedCountries
            };
            this.props.setEditFilm(editFilm);
        } else {
            const selectedCountryFromCommonList = this.props.allCountries.filter(c => c.id == target.value)[0];
            selectedCountries.push(selectedCountryFromCommonList);
            let editFilm = this.props.editFilm;
            editFilm = {
                ...editFilm,
                countries: selectedCountries
            };
            this.props.setEditFilm(editFilm);
        }
    };

    handleAddingCountryChange = (event) => {
        const target = event.target;
        let selectedCountries = this.props.addFilm.countries;
        const checkExisting = selectedCountries.filter(country => country.id == target.value);

        if (checkExisting.length > 0) {
            selectedCountries.forEach((selectedCountry, index) => {
                if (selectedCountry.id == target.value && selectedCountries.length - 1 !== 0) {
                    selectedCountries.splice(index, 1);
                }
            });
            let addFilm = this.props.addFilm;
            addFilm = {
                ...addFilm,
                countries: selectedCountries
            };
            this.props.setAddFilm(addFilm);
        } else {
            const selectedCountryFromCommonList = this.props.allCountries.filter(c => c.id == target.value)[0];
            selectedCountries.push(selectedCountryFromCommonList);
            let addFilm = this.props.addFilm;
            addFilm = {
                ...addFilm,
                countries: selectedCountries
            };
            this.props.setAddFilm(addFilm);
        }
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

    handleAddingGenreChange = (event) => {
        const target = event.target;
        let selectedGenres = this.props.addFilm.genres;
        const checkExisting = selectedGenres.filter(genre => genre.id == target.value);

        if (checkExisting.length > 0) {
            selectedGenres.forEach((selectedGenre, index) => {
                if (selectedGenre.id == target.value && selectedGenres.length - 1 !== 0) {
                    selectedGenres.splice(index, 1);
                }
            });
            let addFilm = this.props.addFilm;
            addFilm = {
                ...addFilm,
                genres: selectedGenres
            };
            this.props.setAddFilm(addFilm);
        } else {
            const selectedGenreFromCommonList = this.props.allGenres.filter(g => g.id == target.value)[0];
            selectedGenres.push(selectedGenreFromCommonList);
            let addFilm = this.props.addFilm;
            addFilm = {
                ...addFilm,
                genres: selectedGenres
            };
            this.props.setAddFilm(addFilm);
        }
    };

    render() {
        const filmList = this.props.allFilms ? this.props.allFilms.map(film =>
            <tr key={film.id}>
                <th className="film-table-td" scope="row">{film.id}</th>
                <td className="film-table-td">{film.name}</td>
                <td className="film-table-td text-center">{film.duration}</td>
                <td className="film-table-td">{film.genres.map((g, index) => index === film.genres.length - 1 ? g.name + "" : g.name + ",")}</td>
                <td className="film-table-td text-center">{film.ageRestrictions.map((a, index) => index === film.ageRestrictions.length - 1 ? a.name + "" : a.name + ",")}</td>
                <td className="film-table-td text-center">{film.imdb}</td>
                <td className="film-table-td">{film.countries.map((c, index) => index === film.countries.length - 1 ? c.name + "" : c.name + ",")}</td>
                <td>
                    <div className="d-flex flex-row action-button justify-content-center">
                        <MdDeleteForever className="text-danger delete-seance-button" onClick={() => this.props.deleteFilm(film.id)}/>
                        <FaPencil className="pencil-action-button delete-seance-button" onClick={() => this.selectFilm(film.id)}/>
                    </div>
                </td>
            </tr>) : (null);

        const editFilm = this.props.editFilm ? (
            <div className="d-flex flex-column border-top border-secondary">
                <div className="pb-4 pt-4 text-center">
                    <h3>Редактирование фильма</h3>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row pb-2">
                        <b className="edit-film-label">Название:</b> <Input style={{width: 300 + "px"}} onChange={this.changeFilmName} value={this.props.editFilm.name}/>
                    </div>
                    <div className="d-flex flex-row pb-2">
                        <b className="edit-film-label">Продолжительность:</b> <Input style={{width: 300 + "px"}} type="number" onChange={this.changeDuration} value={this.props.editFilm.duration}/>
                    </div>
                    <div className="d-flex flex-row pb-2">
                        <b className="edit-film-label">Рейтинг (IMDb): </b><Input style={{width: 300 + "px"}} type="number" onChange={this.changeRating} value={this.props.editFilm.imdb}/>
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Жанры:"}</b>
                    </div>
                    <div className="flex-row">
                        {this.getGenresList()}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Страны:"}</b>
                    </div>
                    <div className="flex-row">
                        {this.getCountriesList()}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Возрастные ограничения:"}</b>
                    </div>
                    <div>
                        {this.getAgeRestrictionsList()}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Период проката:"}</b>
                    </div>
                    <div>
                        {this.getRentalPeriods()}
                    </div>
                </div>
                <Button className="btn btn-info mr-2" onClick={() => this.props.applyEditFilm(this.props.editFilm)}>
                    Редактировать фильм
                </Button>
            </div>
        ) : null;

        const createFilm = this.props.addFilm ? (
            <div className="d-flex flex-column border-top border-secondary">
                <div className="pb-4 pt-4 text-center">
                    <h3>Добавление фильма</h3>
                </div>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row pb-2">
                        <b className="edit-film-label">Название:</b> <Input style={{width: 300 + "px"}}/>
                    </div>
                    <div className="d-flex flex-row pb-2">
                        <b className="edit-film-label">Продолжительность:</b> <Input style={{width: 300 + "px"}} type="number" />
                    </div>
                    <div className="d-flex flex-row pb-2">
                        <b className="edit-film-label">Рейтинг (IMDb): </b><Input style={{width: 300 + "px"}} type="number"/>
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Жанры:"}</b>
                    </div>
                    <div className="flex-row">
                        {this.getAddingGenresList()}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Страны:"}</b>
                    </div>
                    <div className="flex-row">
                        {this.getAddingCountriesList()}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Возрастные ограничения:"}</b>
                    </div>
                    <div>
                        {/*{this.getAgeRestrictionsList()}*/}
                    </div>
                </div>
                <div className="d-flex flex-column pb-2">
                    <div className="flex-row">
                        <b>{"Период проката:"}</b>
                    </div>
                    <div>
                        {/*{this.getRentalPeriods()}*/}
                    </div>
                </div>
                <Button className="btn btn-info mr-2">
                    Добавить фильм
                </Button>
            </div>
        ) : null;


        return (
            <div>
                <div>
                    <Table>
                        <thead>
                            <tr>
                                <th className="text-center">#</th>
                                <th className="text-center">Название</th>
                                <th className="text-center">Продолжительность (мин)</th>
                                <th className="text-center">Жанры</th>
                                <th className="text-center">Возрастные ограничения</th>
                                <th className="text-center">IMDb</th>
                                <th className="text-center">Страны</th>
                                <th className="text-center">Действие</th>
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
                <div className="d-flex flex-column">
                    <div>
                        {createFilm}
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
    allCountries: state.filmCrud ? state.filmCrud.allCountries : null,
    allAgeRestrictions: state.filmCrud ? state.filmCrud.allAgeRestrictions : null,
    allRentalPeriods: state.filmCrud ? state.filmCrud.allRentalPeriods : null,
    editFilm: state.filmCrud ? state.filmCrud.editFilm : null,
    addFilm: state.filmCrud ? state.filmCrud.addFilm : null,
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
        getAllCountries,
        cleanSelectedCountries,
        setSelectedCountries,
        getAllAgeRestrictions,
        deleteFilm,
        addNewFilm,
        setAddFilm,
        getAllRentalPeriods,
    },
    dispatch
);


export default connect(mapStateToProps, mapDispatchToProps) (FilmManager);