import axios, { AxiosResponse } from "axios";
import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { urlZanrovi } from "../../endpoints/endpoints";
import { zanrCreationDTO } from "../interfejsi/zanr.model";
import Ucitavanje from "../ostalo/Ucitavanje";
import ZanrForma from "./ZanrForma";

export default function IzmeniZanr() {
  const { id }: any = useParams();
  const [zanr, setZanr] = React.useState<zanrCreationDTO>();
  const [errors, setErrors] = React.useState<string[]>([]);
  const history = useHistory();

  React.useEffect(() => {
    axios
      .get(`${urlZanrovi}/${id}`)
      .then((response: AxiosResponse<zanrCreationDTO>) => {
        setZanr(response.data);
      });
  }, [id]);

  async function izmeni(zanrZaIzmenu: zanrCreationDTO) {
    try {
      await axios.put(`${urlZanrovi}/${id}`, zanrZaIzmenu);
      history.push("/zanrovi");
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  const zanrObjekat: zanrCreationDTO = {
    naziv: "Akcija",
  };

  return (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-9">
              <h2>
                Izmeni žanr <b>{id}</b>
              </h2>
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
          {zanr ? (
            <ZanrForma
              tip="izmeni"
              model={zanr}
              onSubmit={async (zanrPodaci) => izmeni(zanrPodaci)}
            />
          ) : (
            <Ucitavanje />
          )}
        </div>
      </div>
    </>
  );
}
