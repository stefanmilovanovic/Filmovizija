import { Field, Form, Formik, FormikHelpers } from "formik";
import { bioskopCreationDTO } from "../interfejsi/bioskop.model";
import { coordinateDTO } from "../interfejsi/coordinates.model";
import MapField from "../ostalo/MapField";

export default function BioskopForma(props: bioskopFormaProps) {
  function transformCoordinates(): coordinateDTO[] | undefined {
    if (props.model.geografskaSirina && props.model.geografskaDuzina) {
      const response: coordinateDTO = {
        lat: props.model.geografskaSirina,
        lng: props.model.geografskaDuzina,
      };
      return [response];
    } else return undefined;
  }

  return (
    <Formik initialValues={props.model} onSubmit={props.onSubmit}>
      {(formikProps) => (
        <Form>
          <div className="mb-3">
            <Field
              type="text"
              name="naziv"
              className="form-control"
              placeholder="Movie theater name"
            />
            <br />
            <div style={{ marginBottom: "1rem" }}>
              <MapField
                latField="geografskaSirina"
                lngField="geografskaDuzina"
                coordinates={transformCoordinates()}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                disabled={formikProps.isSubmitting}
                className="btn btn-primary"
                type="submit"
              >
                Potvrdi
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

interface bioskopFormaProps {
  model: bioskopCreationDTO;
  onSubmit(
    values: bioskopCreationDTO,
    action: FormikHelpers<bioskopCreationDTO>
  ): void;
}
