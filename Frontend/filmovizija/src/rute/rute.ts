import DodajBioskop from "../komponente/bioskopi/DodajBioskop";
import IndexBioskopi from "../komponente/bioskopi/IndexBioskopi";
import IzmeniBioskop from "../komponente/bioskopi/IzmeniBioskop";
import DodajFilm from "../komponente/filmovi/DodajFilm";
import FilmDetalji from "../komponente/filmovi/FilmDetalji";
import FilterFilmova from "../komponente/filmovi/FilterFilmova";
import IndexFilmovi from "../komponente/filmovi/IndexFilmovi";
import IzmeniFilm from "../komponente/filmovi/IzmeniFilm";
import DodajGlumca from "../komponente/glumci/DodajGlumca";
import IndexGlumci from "../komponente/glumci/IndexGlumci";
import IzmeniGlumca from "../komponente/glumci/IzmeniGlumca";
import Pocetna from "../komponente/Pocetna";
import DodajZanr from "../komponente/zanrovi/DodajZanr";
import IndexZanrovi from "../komponente/zanrovi/IndexZanrovi";
import IzmeniZanr from "../komponente/zanrovi/IzmeniZanr";

const rute = [
    { path: "/", component: Pocetna, exact: true },

    { path: "/zanrovi", component: IndexZanrovi, exact: true },
    { path: "/zanrovi/dodaj", component: DodajZanr },
    { path: "/zanrovi/izmeni/:id(\\d+)", component: IzmeniZanr },

    { path: "/glumci", component: IndexGlumci, exact: true },
    { path: "/glumci/dodaj", component: DodajGlumca },
    { path: "/glumci/izmeni/:id(\\d+)", component: IzmeniGlumca },

    { path: "/bioskopi", component: IndexBioskopi, exact: true },
    { path: "/bioskopi/dodaj", component: DodajBioskop },
    { path: "/bioskopi/izmeni/:id(\\d+)", component: IzmeniBioskop },

    { path: "/filmovi", component: IndexFilmovi, exact: true },
    { path: "/filmovi/dodaj", component: DodajFilm },
    { path: "/filmovi/izmeni/:id(\\d+)", component: IzmeniFilm },
    { path: "/filmovi/filter", component: FilterFilmova },

    { path: "/film/:id(\\d+)", component: FilmDetalji },
]

export default rute;