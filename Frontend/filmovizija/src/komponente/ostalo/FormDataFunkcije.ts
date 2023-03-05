import { filmCreationDTO } from "../interfejsi/film.model";
import { glumacCreationDTO } from "../interfejsi/glumac.model";

export function konvertujGlumcaUFormData(glumac: glumacCreationDTO): FormData {
    const formData = new FormData();
    formData.append('imePrezime', glumac.imePrezime);
    if (glumac.biografija) {
        formData.append('biografija', glumac.biografija);
    }
    if (glumac.datumRodjenja) {
        formData.append('datumRodjenja', formatDate(glumac.datumRodjenja));
    }
    if (glumac.slika) {
        formData.append('slika', glumac.slika);
    }

    return formData;
}

export function konvertujFilmUFormData(film: filmCreationDTO) {
    const formData = new FormData();
    formData.append('naslov', film.naslov);
    if (film.rezime) {
        formData.append('rezime', film.rezime);
    }
    formData.append('trailer', film.trailer);
    formData.append('prikazujeSe', String(film.prikazujeSe));
    if (film.datumIzlaska) {
        formData.append('datumIzlaska', formatDate(film.datumIzlaska));
    }
    if (film.poster) {
        formData.append('poster', film.poster);
    }
    formData.append('zanroviIds', JSON.stringify(film.zanroviIds));
    formData.append('bioskopiIds', JSON.stringify(film.bioskopiIds));
    formData.append('glumci', JSON.stringify(film.glumci));
    return formData;
}

function formatDate(date: Date) {
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }
    ] = format.formatToParts(date);
    return `${year}-${month}-${day}`;
}