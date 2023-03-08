import React from "react";
import { ReactElement } from "react";
import AutentifikacijaContext from "./AutentifikacijaContext";

export default function Autorizacija(props: autorizacijaProps) {
  const [autorizovan, setAutorizovan] = React.useState(false);
  const { claims } = React.useContext(AutentifikacijaContext);

  React.useEffect(() => {
    if (props.rola) {
      const index = claims.findIndex(
        (claim) => claim.name === "rola" && claim.value === props.rola
      );
      setAutorizovan(index > -1);
    } else {
      setAutorizovan(claims.length > 0);
    }
  }, [claims,props.rola]);

  return <>{autorizovan ? props.autorizovan : props.nijeAutorizovan}</>;
}

interface autorizacijaProps {
  autorizovan: ReactElement;
  nijeAutorizovan?: ReactElement;
  rola?: string;
}
