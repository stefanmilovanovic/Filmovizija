import axios, { AxiosResponse } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { urlZanrovi } from "../../endpoints/endpoints";
import { zanrDTO } from "../interfejsi/zanr.model";
import Paginacija from "../ostalo/Paginacija";
import Paginacija2 from "../ostalo/Paginacija2";

export default function IndexZanrovi() {
  const [zanrovi, setZanrovi] = React.useState<zanrDTO[]>();
  const [ukupnoStrana, setUkupnoStrana] = React.useState(0);
  const [rezultataPoStrani, setRezultataPoStrani] = React.useState(5);
  const [strana, setStrana] = React.useState(1);

  React.useEffect(() => {
    axios
      .get(urlZanrovi, { params: { strana, rezultataPoStrani } })
      .then((response: AxiosResponse<zanrDTO[]>) => {
        const ukupnoRezultata = parseInt(response.headers["brojrezultata"], 10);
        setUkupnoStrana(Math.ceil(ukupnoRezultata / rezultataPoStrani));
        setZanrovi(response.data);
      });
  }, [strana, rezultataPoStrani]);

  return (
    <>
      <div style={{ backgroundColor: "#D3F4FF" }}>
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
        <br/>
        <br/>
        <Paginacija2
          trenutnaStrana={strana}
          ukupnoStrana={ukupnoStrana}
          onChange={(novaStrana) => setStrana(novaStrana)}
        />
        <br/>
        <div className="list-group">
          {zanrovi?.map((zanr)=>{
            return(
              <a href="#" key={zanr.id} className="list-group-item list-group-item-action">{zanr.naziv}</a>
            )
          })}
        </div>
      </div>
    </>
  );
}
