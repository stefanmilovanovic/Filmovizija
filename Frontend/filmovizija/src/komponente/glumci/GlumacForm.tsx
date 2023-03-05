import { Form, Formik, FormikHelpers } from "formik";
import { glumacCreationDTO } from "../interfejsi/glumac.model";
import * as Yup from "yup";
import PoljeZaDatum from "../ostalo/PoljeZaDatum";
import TextField from "../ostalo/TextField";
import PoljeZaUnosSlike from "../ostalo/PoljeZaUnosSlike";
import MarkdownPolje from "../ostalo/MarkdownPolje";

export default function GlumacForm(props: glumacFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        imePrezime: Yup.string().required("Ovo polje je obazvezno!"),
        datumRodjenja: Yup.date().nullable().required("Datum je obavezan!"),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField prikaz="Ime i prezime" nazivPolja="imePrezime" />
          <PoljeZaDatum prikaz="Datum rođenja" nazivPolja="datumRodjenja" />
          <PoljeZaUnosSlike
            prikaz="Slika glumca:"
            nazivPolja="slika"
            slikaURL={props.model.slikaURL}
          />
          <br />
          <MarkdownPolje prikaz="Biografija:" nazivPolja="biografija" />
          <br />
          <button
            style={{ width: "300px", marginBottom: "50px" }}
            disabled={formikProps.isSubmitting}
            type="submit"
            className="btn btn-success"
          >
            Potvrdi
          </button>
        </Form>
      )}
    </Formik>
  );
}

interface glumacFormProps {
  model: glumacCreationDTO;
  onSubmit(
    values: glumacCreationDTO,
    action: FormikHelpers<glumacCreationDTO>
  ): void;
}
