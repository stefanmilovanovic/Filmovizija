import { urlBioskopi } from "../../endpoints/endpoints";
import { bioskopDTO } from "../interfejsi/bioskop.model";
import UniverzalnaKomponentaZaPrikaz from "../univerzalneKomponente/UniverzalnaKomponentaZaPrikaz";

export default function IndexBioskopi() {
  return (
    <UniverzalnaKomponentaZaPrikaz<bioskopDTO>
      url={urlBioskopi}
      urlZaKreiranje="bioskopi/dodaj"
      naslov="Bioskopi"
      nazivObjekta="novi bioskop"
    >
      {(bioskopi, opcije) => (
        <>
          <thead>
            <tr>
              <th>Broj</th>
              <th>Naziv</th>
              <th style={{ textAlign: "right", paddingRight: "60px" }}>Opcije</th>
            </tr>
          </thead>
          <tbody>
            {bioskopi?.map((bioskop, index) => (
              <tr key={bioskop.id}>
                <td>{index+1}</td>
                <td>{bioskop.naziv}</td>
                <td>{opcije(`bioskopi/izmeni/${bioskop.id}`, bioskop.id)}</td>
              </tr>
            ))}
          </tbody>
        </>
      )}
    </UniverzalnaKomponentaZaPrikaz>
  );
}
