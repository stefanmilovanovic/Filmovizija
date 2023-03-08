import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { urlNalozi } from "../endpoints/endpoints";
import PrikaziGreske from "../komponente/ostalo/PrikaziGreske";
import AutentifikacijaContext from "./AutentifikacijaContext";
import { authenticationResponse, userCredentials } from "./auth.model";
import AuthForma from "./AuthForma";
import { getClaims, saveToken } from "./handleJWT";

export default function Prijava() {
  const [errors, setErrors] = React.useState<string[]>([]);
  const { update } = React.useContext(AutentifikacijaContext);
  const history = useHistory();

  async function prijava(podaci: userCredentials) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlNalozi}/login`,
        podaci
      );
      saveToken(response.data);
      update(getClaims());
      Swal.fire({
        icon: "success",
        title: "Uspešna prijava!",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/");
    } catch (error: any) {
      if (error && error.response) {
        setErrors((oldState) => {
          return [...oldState, error.response.data];
        });
      }
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-6">
              <h2>Prijava</h2>
            </div>
            <div className="col-sm-6">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link className="btn btn-dark" to="/registracija">
                  Otvori nalog
                </Link>
                <Link className="btn btn-danger" to="/">
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
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-6">
              <PrikaziGreske greske={errors} />
              <AuthForma
                model={{ email: "", password: "" }}
                onSubmit={async (podaci) => await prijava(podaci)}
              />
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
