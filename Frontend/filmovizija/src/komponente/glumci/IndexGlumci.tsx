import { urlGlumci } from "../../endpoints/endpoints";
import { glumacDTO } from "../interfejsi/glumac.model";
import UniverzalnaKomponentaZaPrikaz from "../univerzalneKomponente/UniverzalnaKomponentaZaPrikaz";

export default function IndexGlumci() {
  return (
    <UniverzalnaKomponentaZaPrikaz<glumacDTO>
      url={urlGlumci}
      urlZaKreiranje="glumci/dodaj"
      naslov="Glumci"
      nazivObjekta="novog Glumca"
    >
      {(glumci, opcije) => (
        <>
          <thead>
            <tr>
              <th>Broj</th>
              <th>Naziv</th>
              <th>Datum rođenja</th>
              <th style={{ textAlign: "right", paddingRight: "60px" }}>
                Opcije
              </th>
            </tr>
          </thead>
          <tbody>
            {glumci?.map((glumac, index) => {
              return (
                <tr key={glumac.id}>
                  <td>{index + 1}</td>
                  <td>{glumac.imePrezime}</td>
                  <td>{glumac.datumRodjenja.toString().split('T')[0]}</td>
                  <td>{opcije(`glumci/izmeni/${glumac.id}`, glumac.id)}</td>
                </tr>
              );
            })}
          </tbody>
        </>
      )}
    </UniverzalnaKomponentaZaPrikaz>
  );
}
