import axios, { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { urlZanrovi } from "../../endpoints/endpoints";
import { zanrDTO } from "../interfejsi/zanr.model";
import Paginacija from "../ostalo/Paginacija";
import Paginacija2 from "../ostalo/Paginacija2";
import PotvrdaSweetAlert from "../ostalo/PotvrdaSweetAlert";
import RezultataPoStrani from "../ostalo/RezultataPoStrani";

export default function IndexZanrovi() {
  const [zanrovi, setZanrovi] = React.useState<zanrDTO[]>();
  const [ukupnoStrana, setUkupnoStrana] = React.useState(0);
  const [rezultataPoStrani, setRezultataPoStrani] = React.useState(5);
  const [strana, setStrana] = React.useState(1);

  React.useEffect(() => {
    ucitajPodatke();
  }, [strana, rezultataPoStrani]);

  function ucitajPodatke() {
    axios
      .get(urlZanrovi, { params: { strana, rezultataPoStrani } })
      .then((response: AxiosResponse<zanrDTO[]>) => {
        const ukupnoRezultata = parseInt(response.headers["brojrezultata"], 10);
        setUkupnoStrana(Math.ceil(ukupnoRezultata / rezultataPoStrani));
        setZanrovi(response.data);
      });
  }

  async function izbrisiZanr(id: number) {
    try {
      await axios.delete(`${urlZanrovi}/${id}`);
      ucitajPodatke();
    } catch (error: any) {
      if (error && error.response) {
        console.log(error.response.data);
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
              <h2>Žanrovi</h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-dark" to="/zanrovi/dodaj">
                  Dodaj novi žanr
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="col-sm-4">
            <RezultataPoStrani
              onChange={(brojRezultata) => {
                setStrana(1);
                setRezultataPoStrani(brojRezultata);
              }}
            />
          </div>
          <div className="col-sm-8">
            <Paginacija
              trenutnaStrana={strana}
              ukupnoStrana={ukupnoStrana}
              onChange={(novaStrana) => setStrana(novaStrana)}
            />
          </div>
        </div>
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Broj</th>
              <th>Naziv</th>
              <th style={{ textAlign: "right", paddingRight: "60px" }}>
                Opcije
              </th>
            </tr>
          </thead>
          <tbody>
            {zanrovi?.map((zanr, index) => {
              return (
                <tr key={zanr.id}>
                  <td>{index + 1}</td>
                  <td
                    style={{
                      maxWidth: "50vw",
                      overflow: "hidden",
                      overflowWrap: "break-word",
                    }}
                  >
                    {zanr.naziv}
                  </td>
                  <td>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <Link
                        className="btn btn-primary"
                        to={`/zanrovi/izmeni/${zanr.id}`}
                      >
                        Izmeni
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          PotvrdaSweetAlert(() => izbrisiZanr(zanr.id))
                        }
                        className="btn btn-secondary"
                      >
                        Izbriši
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
