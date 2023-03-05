import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { urlBioskopi } from "../../endpoints/endpoints";
import { bioskopCreationDTO } from "../interfejsi/bioskop.model";
import BioskopForma from "./BioskopForma";

export default function DodajBioskop() {
  const history = useHistory();
  const [errors, setErrors] = React.useState<string[]>([]);

  async function dodaj(bioskop: bioskopCreationDTO) {
    try {
      await axios.post(urlBioskopi, bioskop);
      history.push("/bioskopi");
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
              <h2>Dodaj novi bioskop</h2>
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
          <BioskopForma
            model={{ naziv: "" }}
            onSubmit={async (podaciBioskop) => await dodaj(podaciBioskop)}
          />
        </div>
      </div>
    </>
  );
}
