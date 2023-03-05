import axios, { AxiosResponse } from "axios";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link } from "react-router-dom";
import Paginacija from "../ostalo/Paginacija";
import PotvrdaSweetAlert from "../ostalo/PotvrdaSweetAlert";
import RezultataPoStrani from "../ostalo/RezultataPoStrani";

export default function UniverzalnaKomponentaZaPrikaz<T>(
  props: univerzalnaKomponentaZaPrikazProps<T>
) {
  const [listaObjekata, setListaObjekata] = React.useState<T[]>();
  const [ukupnoStrana, setUkupnoStrana] = React.useState(0);
  const [rezultataPoStrani, setRezultataPoStrani] = React.useState(5);
  const [strana, setStrana] = React.useState(1);

  React.useEffect(() => {
    ucitajPodatke();
  }, [strana, rezultataPoStrani]);

  function ucitajPodatke() {
    axios
      .get(props.url, {
        params: { strana, rezultataPoStrani },
      })
      .then((response: AxiosResponse<T[]>) => {
        const ukupnoRezultata = parseInt(response.headers["brojrezultata"], 10);
        setUkupnoStrana(Math.ceil(ukupnoRezultata / rezultataPoStrani));
        setListaObjekata(response.data);
      });
  }

  const opcije = (urlZaIzmenu: string, id: number) => {
    return (
      <>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link className="btn btn-primary" to={urlZaIzmenu}>
            Izmeni
          </Link>
          <button
            type="button"
            onClick={() => PotvrdaSweetAlert(() => izbrisiObjekat(id))}
            className="btn btn-secondary"
          >
            Izbriši
          </button>
        </div>
      </>
    );
  };

  async function izbrisiObjekat(id: number) {
    try {
      await axios.delete(`${props.url}/${id}`);
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
              <h2>{props.naslov}</h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-dark" to={props.urlZaKreiranje}>
                  Dodaj {props.nazivObjekta}
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
          {props.children(listaObjekata!, opcije)}
        </table>
      </div>
    </>
  );
}

interface univerzalnaKomponentaZaPrikazProps<T> {
  url: string;
  naslov: string;
  urlZaKreiranje: string;
  nazivObjekta: string;
  children(
    listaObjekata: T[],
    opcije: (urlZaIzmenu: string, id: number) => ReactElement
  ): ReactElement;
}
