import { Form, Formik, FormikHelpers } from "formik";
import { userCredentials } from "./auth.model";
import * as Yup from "yup";
import TextField from "../komponente/ostalo/TextField";

export default function AuthForma(props: authFormaProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string()
          .required("Ovo polje je obavezno")
          .email("Potrebno je uneti odgovarajući e-mail format"),
        password: Yup.string().required("Ovo polje je obavezno"),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField nazivPolja="email" prikaz="E-mail" />
          <TextField nazivPolja="password" prikaz="Šifra" tip="sifra" />
          <br />
          <button
            style={{ width: "200px" }}
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

interface authFormaProps {
  model: userCredentials;
  onSubmit(
    values: userCredentials,
    action: FormikHelpers<userCredentials>
  ): void;
}
