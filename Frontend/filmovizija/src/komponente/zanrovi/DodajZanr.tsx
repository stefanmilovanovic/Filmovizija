import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { urlZanrovi } from "../../endpoints/endpoints";
import { zanrCreationDTO } from "../interfejsi/zanr.model";
import PrikaziGreske from "../ostalo/PrikaziGreske";
import ZanrForma from "./ZanrForma";

export default function DodajZanr() {
  const [greske, setGreske] = React.useState<string[]>([]);
  const history = useHistory();
  const zanrObjekat: zanrCreationDTO = {
    naziv: "",
  };

  async function PosaljiZanr(zanr: zanrCreationDTO) {
    try {
      await axios.post(urlZanrovi, zanr);
      history.push("/zanrovi");
    } catch (error: any) {
      if (error && error.response) {
        setGreske(error.response.data);
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
              <h2>Dodaj novi žanr</h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-danger" to="/zanrovi">
                  Odustani
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="container">
        <div style={{ marginTop: "8vh" }}>
          <ZanrForma
            tip="dodaj"
            model={zanrObjekat}
            onSubmit={(zanr) => PosaljiZanr(zanr)}
          />
          <br/>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <PrikaziGreske greske={greske} />
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
