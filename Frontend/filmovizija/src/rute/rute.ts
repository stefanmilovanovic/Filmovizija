import Prijava from "../auth/Prijava";
import Registracija from "../auth/Registracija";
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
import Greska404 from "../komponente/ostalo/Greska404";
import Pocetna from "../komponente/Pocetna";
import DodajZanr from "../komponente/zanrovi/DodajZanr";
import IndexZanrovi from "../komponente/zanrovi/IndexZanrovi";
import IzmeniZanr from "../komponente/zanrovi/IzmeniZanr";

const rute = [
    { path: "/", component: Pocetna, exact: true },

    { path: "/zanrovi", component: IndexZanrovi, exact: true, isAdmin: true },
    { path: "/zanrovi/dodaj", component: DodajZanr, isAdmin: true },
    { path: "/zanrovi/izmeni/:id(\\d+)", component: IzmeniZanr, isAdmin: true },

    { path: "/glumci", component: IndexGlumci, exact: true, isAdmin: true },
    { path: "/glumci/dodaj", component: DodajGlumca, isAdmin: true },
    { path: "/glumci/izmeni/:id(\\d+)", component: IzmeniGlumca, isAdmin: true },

    { path: "/bioskopi", component: IndexBioskopi, exact: true, isAdmin: true },
    { path: "/bioskopi/dodaj", component: DodajBioskop, isAdmin: true },
    { path: "/bioskopi/izmeni/:id(\\d+)", component: IzmeniBioskop, isAdmin: true },

    { path: "/filmovi", component: IndexFilmovi, exact: true, isAdmin: true },
    { path: "/filmovi/dodaj", component: DodajFilm, isAdmin: true },
    { path: "/filmovi/izmeni/:id(\\d+)", component: IzmeniFilm, isAdmin: true },
    { path: "/filmovi/filter", component: FilterFilmova },

    { path: "/film/:id(\\d+)", component: FilmDetalji },

    {path:"/registracija",component:Registracija},
    {path:"/prijava",component:Prijava},

    { path: "*", component: Greska404 },
]

export default rute;