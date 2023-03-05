import axios from "axios";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { urlGlumci } from "../../endpoints/endpoints";
import { glumacCreationDTO } from "../interfejsi/glumac.model";
import { konvertujGlumcaUFormData } from "../ostalo/FormDataFunkcije";
import GlumacForm from "./GlumacForm";

export default function DodajGlumca() {
  const [errors, setErrors] = React.useState<string[]>([]);
  const history = useHistory();

  async function dodaj(glumac: glumacCreationDTO) {
    try {
      const formData = konvertujGlumcaUFormData(glumac);
      await axios({
        method: "post",
        url: urlGlumci,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      history.push("/glumci");
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
              <h2>Dodaj novog glumca</h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-danger" to="/glumci">
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
        <GlumacForm
          model={{ imePrezime: "", datumRodjenja: undefined, biografija: "" }}
          onSubmit={async (glumacPodaci) => await dodaj(glumacPodaci)}
        />
        </div>
      </div>
    </>
  );
}
