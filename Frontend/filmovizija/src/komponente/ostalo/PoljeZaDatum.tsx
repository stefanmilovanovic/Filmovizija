import { useFormikContext } from "formik";

export default function PoljeZaDatum(props: poljeZaDatumProps) {
  const { values, validateForm, touched, errors } = useFormikContext<any>();
  // touched -> da li je forma vec bila editovana
  // errors -> da li ima errora za prikaz
  return (
    <div className="mb-3">
      <label htmlFor={props.nazivPolja} className="form-label">
        {props.prikaz}
      </label>
      <input
        type="date"
        className="form-control"
        id={props.nazivPolja}
        name={props.nazivPolja}
        defaultValue={values[props.nazivPolja]?.toLocaleDateString("en-CA")}
        onChange={(e) => {
          const date = new Date(e.currentTarget.value + "T00:00:00");
          values[props.nazivPolja] = date;
          validateForm();
        }}
      />
      {touched[props.nazivPolja] && errors[props.nazivPolja] ? (
        <div className="text-danger">
          {errors[props.nazivPolja]?.toString()}
        </div>
      ) : null}
    </div>
  );
}

interface poljeZaDatumProps {
  nazivPolja: string;
  prikaz: string;
}
