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

export default function Registracija() {
  const [errors, setErrors] = React.useState<greskaObjekat[]>([]);
  const { update } = React.useContext(AutentifikacijaContext);
  const history = useHistory();

  async function registracija(podaci: userCredentials) {
    try {
      setErrors([]);
      const response = await axios.post<authenticationResponse>(
        `${urlNalozi}/create`,
        podaci
      );
      saveToken(response.data);
      update(getClaims());
      Swal.fire("Uspešna registracija!");
      history.push("/");
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  function transformacijaGreski() {
    var rezultat: string[] = [];
    if (errors.length > 0) {
      errors.map((error) => {
        return rezultat.push(error.description);
      });
    }
    return rezultat;
  }

  return (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-6">
              <h2>Registracija</h2>
            </div>
            <div className="col-sm-6">
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link className="btn btn-dark" to="/prijava">
                  Već imam nalog
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
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <PrikaziGreske greske={transformacijaGreski()} />
              <AuthForma
                model={{ email: "", password: "" }}
                onSubmit={async (podaci) => await registracija(podaci)}
              />
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}

interface greskaObjekat {
  code: string;
  description: string;
}
