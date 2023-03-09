import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Swal from "sweetalert2";
import AutentifikacijaContext from "../../auth/AutentifikacijaContext";
import "./Ocene.css";

export default function Ocene(props: oceneProps) {
  const [najvecaOcenaNiz, setNajvecaOcenaNiz] = React.useState<number[]>([]);
  const [selektovanaOcena, setSelektovanaOcena] = React.useState(
    props.selektovanaOcena
  );
  const { claims } = React.useContext(AutentifikacijaContext);

  React.useEffect(() => {
    setNajvecaOcenaNiz(Array(props.najvecaOcena).fill(0));
  }, [props.najvecaOcena]);

  function handleMouseOver(ocena: number) {
    setSelektovanaOcena(ocena);
  }

  function handleClick(ocena: number) {
    const korisnikUlogovan = claims.length > 0;
    if (!korisnikUlogovan) {
      Swal.fire({
        title: "Greška",
        text: "Morate biti prijavljeni da bi ste ocenili film!",
        icon: "error",
      });
      return;
    }

    setSelektovanaOcena(ocena);
    props.onChange(ocena);
  }

  return (
    <>
      {najvecaOcenaNiz.map((_, index) => {
        return (
          <FontAwesomeIcon
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            icon="star"
            key={index}
            className={`fa-lg ${
              selektovanaOcena >= index + 1 ? "ocena-oznaka" : "null"
            }`}
          />
        );
      })}
    </>
  );
}

interface oceneProps {
  najvecaOcena: number;
  selektovanaOcena: number;
  onChange(ocena: number): void;
}
