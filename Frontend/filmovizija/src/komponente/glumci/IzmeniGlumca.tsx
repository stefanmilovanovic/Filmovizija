import { urlGlumci } from "../../endpoints/endpoints";
import { glumacCreationDTO, glumacDTO } from "../interfejsi/glumac.model";
import { konvertujGlumcaUFormData } from "../ostalo/FormDataFunkcije";
import UniverzalnaKomponentaZaIzmenu from "../univerzalneKomponente/UniverzalnaKomponentaZaIzmenu";
import GlumacForm from "./GlumacForm";

export default function IzmeniGlumca() {
  function transform(glumac: glumacDTO): glumacCreationDTO {
    return {
      imePrezime: glumac.imePrezime,
      slikaURL: glumac.slika,
      biografija: glumac.biografija,
      datumRodjenja: new Date(glumac.datumRodjenja),
    };
  }

  return (
    <>
      <UniverzalnaKomponentaZaIzmenu<glumacCreationDTO, glumacDTO>
        url={urlGlumci}
        indexURL="/glumci"
        nazivObjekat="glumac"
        transformFormData={konvertujGlumcaUFormData}
        transform={transform}
      >
        {(glumac, izmeni) => (
          <GlumacForm
            model={glumac}
            onSubmit={async (glumacPodaci) => await izmeni(glumacPodaci)}
          />
        )}
      </UniverzalnaKomponentaZaIzmenu>
    </>
  );
}
