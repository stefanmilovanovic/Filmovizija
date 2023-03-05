import axios, { AxiosResponse } from "axios";
import React from "react";
import { urlFilmovi } from "../endpoints/endpoints";
import PocetnaSlika from "../slike/pocetna2.jpg";
import ListaFilmovaBootstrap from "./filmovi/FilmBootstrap/ListaFilmovaBootstrap";
import ListaFilmova from "./filmovi/ListaFilmova";
import { filmDTO } from "./interfejsi/film.model";
import css from "./Pocetna.module.css";

export default function Pocetna() {
  const [uBioskopima, setUBioskopima] = React.useState<filmDTO[]>();
  const [uskoroIzlaze, setUskoroIzlaze] = React.useState<filmDTO[]>();

  React.useEffect(() => {
    axios
      .get(`${urlFilmovi}/ubioskopima`)
      .then((response: AxiosResponse<filmDTO[]>) => {
        setUBioskopima(response.data);
      });
    axios
      .get(`${urlFilmovi}/uskoroizlaze`)
      .then((response: AxiosResponse<filmDTO[]>) => {
        setUskoroIzlaze(response.data);
      });
  }, []);

  return (
    <>
      <img className={css.pocetnaSlika} src={PocetnaSlika} alt="pocetna" />
      <div className="container">
        <h4
          style={{
            color: "#CCCCCC",
            fontStyle: "italic",
            marginBottom: "15px",
          }}
        >
          Popularno
        </h4>
        <ListaFilmovaBootstrap filmovi={uBioskopima} />
        <br/>
        {/*<h4>Popularno:</h4>
        <hr/>
        <ListaFilmova filmovi={uBioskopima} />
        <h4>Uskoro na repertoaru:</h4>
        <hr/>
        <ListaFilmova filmovi={uskoroIzlaze} />
  <br/>*/}
        <h4
          style={{
            color: "#CCCCCC",
            fontStyle: "italic",
            marginBottom: "15px",
          }}
        >
          Uskoro na repertoaru
        </h4>
        <ListaFilmovaBootstrap filmovi={uskoroIzlaze} />
        <br />
      </div>
    </>
  );
}
