import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { zanrCreationDTO } from "../interfejsi/zanr.model";
import * as Yup from "yup";

export default function ZanrForma(props: zanrFormaProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        naziv: Yup.string()
          .required("Ovo polje je obavezno")
          .max(50, "Naziv može imati najviše 50 karaktera")
          .matches(/^[A-Z]{1}[A-z0-9 ]+$/, "Prvo slovo mora biti veliko"),
      })}
    >
      {(formikProps) => (
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <Form>
              <label className="form-label fw-bolder" htmlFor="naziv">
                Uneti naziv nove kategorije:
              </label>
              <Field
                className="form-control"
                name="naziv"
                id="naziv"
                placeholder="Naziv uneti ovde..."
              />
              <ErrorMessage name="naziv">
                {(poruka) => <p className="text-danger">{poruka}</p>}
              </ErrorMessage>
              <br />
              <button
                disabled={formikProps.isSubmitting}
                type="submit"
                style={{ width: "200px" }}
                className="btn btn-success"
              >
                {props.tip === "dodaj" ? "Dodaj novi žanr" : "Potvrdi izmene"}
              </button>
            </Form>
          </div>
          <div className="col-sm-3"></div>
        </div>
      )}
    </Formik>
  );
}

interface zanrFormaProps {
  tip: "dodaj" | "izmeni";
  model: zanrCreationDTO;
  onSubmit(
    values: zanrCreationDTO,
    action: FormikHelpers<zanrCreationDTO>
  ): void;
}
