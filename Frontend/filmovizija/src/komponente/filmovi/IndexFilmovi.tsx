import { urlFilmovi } from "../../endpoints/endpoints";
import { filmDTO } from "../interfejsi/film.model";
import UniverzalnaKomponentaZaPrikaz from "../univerzalneKomponente/UniverzalnaKomponentaZaPrikaz";

export default function IndexFilmovi() {
  return (
    <UniverzalnaKomponentaZaPrikaz<filmDTO>
      url={urlFilmovi}
      urlZaKreiranje="filmovi/dodaj"
      naslov="Filmovi"
      nazivObjekta="novi film"
    >
      {(filmovi, opcije) => (
        <>
          <thead>
            <tr>
              <th>Broj</th>
              <th>Naziv</th>
              <th>Datum izlaska</th>
              <th style={{ textAlign: "right", paddingRight: "60px" }}>
                Opcije
              </th>
            </tr>
          </thead>
          <tbody>
            {filmovi?.map((film, index) => (
              <tr key={film.id}>
                <td>{index + 1}</td>
                <td>{film.naslov}</td>
                <td>{film.datumIzlaska.toString().split('T')[0]}</td>
                <td>{opcije(`filmovi/izmeni/${film.id}`, film.id)}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </UniverzalnaKomponentaZaPrikaz>
  );
}
