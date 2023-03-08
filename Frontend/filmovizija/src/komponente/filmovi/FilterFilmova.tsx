import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { urlFilmovi, urlZanrovi } from "../../endpoints/endpoints";
import { filmDTO } from "../interfejsi/film.model";
import { zanrDTO } from "../interfejsi/zanr.model";
import Paginacija from "../ostalo/Paginacija";
import ListaFilmova from "./ListaFilmova";

export default function FilterFilmova() {
  const [zanrovi, setZanrovi] = React.useState<zanrDTO[]>([]);
  const [filmovi, setFilmovi] = React.useState<filmDTO[]>([]);
  const [ukupnoStrana, setUkupnoStrana] = React.useState(0);
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);

  const podaciZaPretragu: filterFilmovaForma = {
    naslov: "",
    zanrId: 0,
    uskoroIzlaze: false,
    uBioskopima: false,
    strana: 1,
    rezultataPoStrani: 10,
  };

  React.useEffect(() => {
    axios
      .get(`${urlZanrovi}/svi`)
      .then((response: AxiosResponse<zanrDTO[]>) => {
        setZanrovi(response.data);
      });
  }, []);

  React.useEffect(() => {
    if (query.get("nalsov")) {
      podaciZaPretragu.naslov = query.get("naslov")!;
    }
    if (query.get("zanrId")) {
      podaciZaPretragu.zanrId = parseInt(query.get("zanrId")!, 10);
    }
    if (query.get("uskoroIzlaze")) {
      podaciZaPretragu.uskoroIzlaze = true;
    }
    if (query.get("uBioskopima")) {
      podaciZaPretragu.uBioskopima = true;
    }
    if (query.get("strana")) {
      podaciZaPretragu.strana = parseInt(query.get("strana")!, 10);
    }

    pretraga(podaciZaPretragu);
  }, []);

  function pretraga(podaci: filterFilmovaForma) {
    radSaURL(podaci);
    axios
      .get(`${urlFilmovi}/filter`, { params: podaci })
      .then((response: AxiosResponse<filmDTO[]>) => {
        const brojRezultata = parseInt(response.headers["brojrezultata"],10);
        setUkupnoStrana(Math.ceil(brojRezultata/podaci.rezultataPoStrani));
        setFilmovi(response.data);
      });
  }

  function radSaURL(podaci: filterFilmovaForma) {
    const queryStrings: string[] = [];
    if (podaci.naslov) {
      queryStrings.push(`naslov=${podaci.naslov}`);
    }
    if (podaci.zanrId !== 0) {
      queryStrings.push(`zanrId=${podaci.zanrId}`);
    }
    if (podaci.uskoroIzlaze) {
      queryStrings.push(`uskoroIzlaze=${podaci.uskoroIzlaze}`);
    }
    if (podaci.uBioskopima) {
      queryStrings.push(`uBioskopima=${podaci.uBioskopima}`);
    }
    queryStrings.push(`strana=${podaci.strana}`);

    history.push(`/filmovi/filter?${queryStrings.join("&")}`);
  }

  return (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <h2>Filter filmova</h2>
        </div>
        <br />
      </div>
      <br />
      <div className="container">
        <Formik
          initialValues={podaciZaPretragu}
          onSubmit={(podaci) => {
            podaci.strana = 1;
            pretraga(podaci);
          }}
        >
          {(formikProps) => (
            <>
              <Form>
                <div className="row gx-3 align-items-center">
                  <div className="col-auto mt-2">
                    <input
                      type="text"
                      className="form-control"
                      id="naslov"
                      //name="title"
                      placeholder="Naslov filma"
                      {
                        ...formikProps.getFieldProps(
                          "naslov"
                        ) /* Koriscenje obicnih inputa u okviru formika */
                      }
                    />
                  </div>
                  <div className="col-auto mt-2">
                    <select
                      className="form-select"
                      {...formikProps.getFieldProps("zanrId")}
                    >
                      <option value="0">---Izabrati žanr</option>
                      {zanrovi.map((zanr) => {
                        return (
                          <option key={zanr.id} value={zanr.id}>
                            {zanr.naziv}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="col-auto mt-2">
                    <div className="form-check">
                      <Field
                        type="checkbox" /* Checkbox ne moze bez field-a */
                        className="form-check-input"
                        id="uskoroIzlaze"
                        name="uskoroIzlaze"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="uskoroIzlaze"
                      >
                        Uskoro izlazi
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mt-2">
                    <div className="form-check">
                      <Field
                        type="checkbox" /* Checkbox ne moze bez field-a */
                        className="form-check-input"
                        id="uBioskopima"
                        name="uBioskopima"
                      />
                      <label className="form-check-label" htmlFor="uBioskopima">
                        U bioskopima
                      </label>
                    </div>
                  </div>
                  <div className="col-auto mt-2">
                    <button
                      className="btn btn-primary"
                      style={{ width: "150px" }}
                      type="submit"
                      onClick={() => formikProps.submitForm()}
                    >
                      Filtriraj
                    </button>
                    <button
                      className="btn btn-danger ms-3"
                      style={{ width: "150px" }}
                      type="button"
                      onClick={() => {
                        formikProps.setValues(podaciZaPretragu);
                        pretraga(podaciZaPretragu);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </Form>
              <br />
              <hr />
              <h4>Rezultati pretrage:</h4>
              <br />
              <ListaFilmova filmovi={filmovi} />
              <Paginacija
                ukupnoStrana={ukupnoStrana}
                trenutnaStrana={formikProps.values.strana}
                onChange={(novaStrana) => {
                  formikProps.values.strana = novaStrana;
                  pretraga(formikProps.values);
                }}
              />
            </>
          )}
        </Formik>
      </div>
    </>
  );
}

interface filterFilmovaForma {
  naslov: string;
  zanrId: number;
  uskoroIzlaze: boolean;
  uBioskopima: boolean;
  strana: number;
  rezultataPoStrani: number;
}
