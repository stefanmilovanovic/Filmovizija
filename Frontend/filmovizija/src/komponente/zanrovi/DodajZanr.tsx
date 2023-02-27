import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { urlZanrovi } from "../../endpoints/endpoints";
import { zanrCreationDTO } from "../interfejsi/zanr.model";
import ZanrForma from "./ZanrForma";

export default function DodajZanr() {
  const zanrObjekat: zanrCreationDTO = {
    naziv: "",
  };

  return (
    <>
      <div style={{ backgroundColor: "#D3F4FF" }}>
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
            onSubmit={(values) => console.log(values)}
          />
        </div>
      </div>
    </>
  );
}
