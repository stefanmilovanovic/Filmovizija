import { urlBioskopi } from "../../endpoints/endpoints";
import { bioskopCreationDTO, bioskopDTO } from "../interfejsi/bioskop.model";
import UniverzalnaKomponentaZaIzmenu from "../univerzalneKomponente/UniverzalnaKomponentaZaIzmenu";
import BioskopForma from "./BioskopForma";

export default function IzmeniBioskop() {
  return (
    <>
      <UniverzalnaKomponentaZaIzmenu<bioskopCreationDTO, bioskopDTO>
        url={urlBioskopi}
        indexURL="/bioskopi"
        nazivObjekat="bioskop"
      >
        {(bioskop, izmeni) => (
          <BioskopForma
            model={bioskop}
            onSubmit={async (bioskopPodaci) => await izmeni(bioskopPodaci)}
          />
        )}
      </UniverzalnaKomponentaZaIzmenu>
    </>
  );
}
