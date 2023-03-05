import axios, { AxiosResponse } from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { urlFilmovi } from "../../endpoints/endpoints";
import { bioskopDTO } from "../interfejsi/bioskop.model";
import { filmCreationDTO, filmoviPostGetDTO } from "../interfejsi/film.model";
import { zanrDTO } from "../interfejsi/zanr.model";
import { konvertujFilmUFormData } from "../ostalo/FormDataFunkcije";
import PrikaziGreske from "../ostalo/PrikaziGreske";
import Ucitavanje from "../ostalo/Ucitavanje";
import FilmForma from "./FilmForma";

export default function DodajFilm() {
  const [errors, setErrors] = React.useState<string[]>([]);
  const history = useHistory();
  const [neSelektovaniZanrovi, setNeSelektovaniZanrovi] = React.useState<
    zanrDTO[]
  >([]);
  const [neSelektovaniBioskopi, setNeSelektovaniBioskopi] = React.useState<
    bioskopDTO[]
  >([]);
  const [loading, setLoading] = React.useState(true);

  const filmObjekat: filmCreationDTO = {
    naslov: "",
    prikazujeSe: false,
    trailer: "",
    datumIzlaska: undefined,
    poster: undefined,
    posterURL: "",
    zanroviIds: [],
    bioskopiIds: [],
  };

  React.useEffect(() => {
    axios
      .get(`${urlFilmovi}/postget`)
      .then((response: AxiosResponse<filmoviPostGetDTO>) => {
        setNeSelektovaniZanrovi(response.data.zanrovi);
        setNeSelektovaniBioskopi(response.data.bioskopi);
        setLoading(false);
      });
  }, []);

  async function dodaj(film: filmCreationDTO) {
    try {
      const formData = konvertujFilmUFormData(film);
      const response = await axios({
        method: "post",
        url: urlFilmovi,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push(`/film/${response.data}`);
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
              <h2>Dodaj novi film</h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-danger" to="/bioskopi">
                  Odustani
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="container">
        <div style={{ marginTop: "4vh" }}>
          <PrikaziGreske greske={errors} />
          {loading ? (
            <Ucitavanje />
          ) : (
            <FilmForma
              model={filmObjekat}
              onSubmit={async (filmPodaci) => await dodaj(filmPodaci)}
              selektovaniZanrovi={[]}
              neSelektovaniZanrovi={neSelektovaniZanrovi}
              selektovaniBioskopi={[]}
              neSelektovaniBioskopi={neSelektovaniBioskopi}
              selektovaniGlumci={[]}
            />
          )}
        </div>
      </div>
    </>
  );
}
