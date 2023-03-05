import { useFormikContext } from "formik";
import React, { ChangeEvent } from "react";

export default function PoljeZaUnosSlike(props: poljeZaUnosSlike) {
  const [slika64, setSlika64] = React.useState("");
  const [slikaURL, setSlikaURL] = React.useState(props.slikaURL);
  const formikObjekat = useFormikContext<any>();

  const divStyle = { marginTop: "10px" };
  const imgStyle = { width: "450px" };

  const konvertujU64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleOnChange = (eventArgs: ChangeEvent<HTMLInputElement>) => {
    if (eventArgs.currentTarget.files) {
      const file = eventArgs.currentTarget.files[0];
      if (file) {
        konvertujU64(file)
          .then((konvertovana: string) => setSlika64(konvertovana))
          .catch((error) => console.log(error));
        formikObjekat.values[props.nazivPolja] = file;
        setSlikaURL("");
      } else {
        setSlika64("");
      }
    }
  };

  return (
    <div>
      <label>{props.prikaz}</label>
      <div>
        <input type="file" accept=".jpg,.jpg,.png" onChange={handleOnChange} />
      </div>
      {slika64 ? (
        <div>
          <div style={divStyle}>
            <img style={imgStyle} src={slika64} alt="selected" />
          </div>
        </div>
      ) : null}
      {slikaURL ? (
        <div>
          <div style={divStyle}>
            <img style={imgStyle} src={slikaURL} alt="selected" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface poljeZaUnosSlike {
  nazivPolja: string;
  prikaz: string;
  slikaURL: string;
}

PoljeZaUnosSlike.defaultProps = {
  slikaURL: "",
};
