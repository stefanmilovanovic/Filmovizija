import axios, { AxiosResponse } from "axios";
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { urlFilmovi } from "../../endpoints/endpoints";
import { filmCreationDTO, filmPutGetDTO } from "../interfejsi/film.model";
import { konvertujFilmUFormData } from "../ostalo/FormDataFunkcije";
import PrikaziGreske from "../ostalo/PrikaziGreske";
import Ucitavanje from "../ostalo/Ucitavanje";
import FilmForma from "./FilmForma";

export default function IzmeniFilm() {
  const { id }: any = useParams();
  const [film, setFilm] = React.useState<filmCreationDTO>();
  const [filmPutGet, setFilmPutGet] = React.useState<filmPutGetDTO>();
  const [errors, setErrors] = React.useState<string[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    axios
      .get(`${urlFilmovi}/PutGet/${id}`)
      .then((response: AxiosResponse<filmPutGetDTO>) => {
        const model: filmCreationDTO = {
          naslov: response.data.film.naslov,
          prikazujeSe: response.data.film.prikazujeSe,
          trailer: response.data.film.trailer,
          posterURL: response.data.film.poster,
          rezime: response.data.film.rezime,
          datumIzlaska: new Date(response.data.film.datumIzlaska),
        };
        setFilm(model);
        setFilmPutGet(response.data);
      });
  }, [id]);

  async function izmeni(filmZaIzmenu: filmCreationDTO) {
    try {
      const formData = konvertujFilmUFormData(filmZaIzmenu);
      await axios({
        method: "put",
        url: `${urlFilmovi}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push(`/film/${id}`);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-9">
              <h2>
                Izmeni film <b>{id}</b>
              </h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-danger" to="/filmovi">
                  Odustani
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="container">
        <br />
        <PrikaziGreske greske={errors} />
        <br />
        {film && filmPutGet ? (
          <FilmForma
            model={film}
            onSubmit={async (filmPodaci) => await izmeni(filmPodaci)}
            neSelektovaniZanrovi={filmPutGet.neSelektovaniZanrovi}
            selektovaniZanrovi={filmPutGet.selektovaniZanrovi}
            neSelektovaniBioskopi={filmPutGet.neSelektovaniBioskopi}
            selektovaniBioskopi={filmPutGet.selektovaniBioskopi}
            selektovaniGlumci={filmPutGet.glumci}
          />
        ) : (
          <Ucitavanje />
        )}
      </div>
    </>
  );
}
