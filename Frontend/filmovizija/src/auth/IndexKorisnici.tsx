import axios from "axios";
import Swal from "sweetalert2";
import { urlNalozi } from "../endpoints/endpoints";
import PotvrdaSweetAlert from "../komponente/ostalo/PotvrdaSweetAlert";
import UniverzalnaKomponentaZaPrikaz from "../komponente/univerzalneKomponente/UniverzalnaKomponentaZaPrikaz";
import { korisnikDTO } from "./auth.model";

export default function IndexKorisnici() {
  async function postaviAdmina(id: string) {
    await adminFunkcija(`${urlNalozi}/makeAdmin`, id);
  }
  async function ukloniAdmina(id: string) {
    await adminFunkcija(`${urlNalozi}/removeAdmin`, id);
  }
  async function adminFunkcija(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
    Swal.fire({
      title: "Uspeh!",
      text: "Status admina uspešno promenjen",
      icon: "success",
    });
  }

  return (
    <UniverzalnaKomponentaZaPrikaz<korisnikDTO>
      naslov="Korisnici"
      url={`${urlNalozi}/korisnici`}
      urlZaKreiranje="/registracija"
      nazivObjekta="novog korisnika"
    >
      {(korisnici) => (
        <>
          <thead>
            <tr>
              <th>Broj</th>
              <th>E-mail</th>
              <th style={{ textAlign: "right" }}>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {korisnici?.map((korisnik, index) => (
              <tr key={korisnik.id}>
                <td>{index + 1}</td>
                <td>{korisnik.email}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        PotvrdaSweetAlert(() => postaviAdmina(korisnik.id))
                      }
                    >
                      Postavi kao Admina
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        PotvrdaSweetAlert(() => ukloniAdmina(korisnik.id))
                      }
                    >
                      Ukloni Admina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </UniverzalnaKomponentaZaPrikaz>
  );
}
