import { ErrorMessage, Field } from "formik";

export default function TextField(props: textFieldProps) {
  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={props.nazivPolja}>
        {props.prikaz}
      </label>
      <Field
        type={props.tip === "tekst" ? "text" : "password"}
        name={props.nazivPolja}
        id={props.nazivPolja}
        className="form-control"
      />
      <ErrorMessage name={props.nazivPolja}>
        {(msg) => <p className="text-danger">{msg}</p>}
      </ErrorMessage>{" "}
      {/* Prikaz poruke u slucaju greske */}
    </div>
  );
}

interface textFieldProps {
  nazivPolja: string;
  prikaz: string;
  tip: "tekst" | "sifra";
}

TextField.defaultProps = {
  tip: "tekst",
};
