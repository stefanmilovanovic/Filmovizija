import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import React from "react";
import { bioskopDTO } from "../interfejsi/bioskop.model";
import { filmCreationDTO } from "../interfejsi/film.model";
import { glumacFilmDTO } from "../interfejsi/glumac.model";
import { zanrDTO } from "../interfejsi/zanr.model";
import MultipleSelector, {
  multipleSelectorModel,
} from "../ostalo/MultipleSelector";
import PoljeZaDatum from "../ostalo/PoljeZaDatum";
import PoljeZaUnosSlike from "../ostalo/PoljeZaUnosSlike";
import MarkdownPolje from "../ostalo/MarkdownPolje";
import TypeaheadGlumci from "../ostalo/TypeaheadGlumci";

export default function FilmForma(props: filmFormaProps) {
  function mapToModel(
    items: { id: number; naziv: string }[]
  ): multipleSelectorModel[] {
    return items.map((item) => {
      return { key: item.id, value: item.naziv };
    });
  }

  const [selektovaniZanrovi, setSelektovaniZanrovi] = React.useState(
    mapToModel(props.selektovaniZanrovi)
  );
  const [neSelektovaniZanrovi, setNeSelektovaniZanrovi] = React.useState(
    mapToModel(props.neSelektovaniZanrovi)
  );

  const [selektovaniBioskopi, setelektovaniBioskopi] = React.useState(
    mapToModel(props.selektovaniBioskopi)
  );
  const [neSelektovaniBioskopi, setNeSelektovaniBioskopi] = React.useState(
    mapToModel(props.neSelektovaniBioskopi)
  );

  const [selektovaniGlumci, setSelektovaniGlumci] = React.useState(
    props.selektovaniGlumci
  );

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(values, action) => {
        values.zanroviIds = selektovaniZanrovi.map((zanr) => zanr.key);
        values.bioskopiIds = selektovaniBioskopi.map((bioskop) => bioskop.key);
        values.glumci = selektovaniGlumci;
        props.onSubmit(values, action);
      }}
      validationSchema={Yup.object({
        naslov: Yup.string().required("Ovo polje je obavezno"),
      })}
    >
      {(formikProps) => (
        <Form>
          <div className="mb-3">
            <label className="form-label" htmlFor="Naslov">
              Naslov:
            </label>
            <Field
              type="text"
              className="form-control"
              name="naslov"
              id="naslov"
            />
            <ErrorMessage name="nalosv">
              {(poruka) => <p className="text-danger">{poruka}</p>}
            </ErrorMessage>
            <br />
            <label className="form-label" htmlFor="trailer">
              Trailer filma:
            </label>
            <Field
              type="text"
              className="form-control"
              name="trailer"
              id="trailer"
            />
            <ErrorMessage name="trailer">
              {(poruka) => <p className="text-danger">{poruka}</p>}
            </ErrorMessage>
            <br />
            <PoljeZaDatum nazivPolja="datumIzlaska" prikaz="Datum polja:" />
            <br />
            <div className="row">
              <div className="col-sm-6">
                <PoljeZaUnosSlike
                  nazivPolja="poster"
                  prikaz="Poster filma:"
                  slikaURL={props.model.posterURL}
                />
              </div>
              <div className="col-sm-6">
                <br />
                <div style={{ marginLeft: "100px" }} className="form-check">
                  <Field
                    type="checkbox"
                    name="prikazujeSe"
                    id="prikazujeSe"
                    className="form-check-input"
                  />
                  <label htmlFor="prikazujeSe" className="form-label">
                    {" "}
                    <b>Prikazuje se?</b>
                  </label>
                </div>
              </div>
            </div>
            <br />
            <MarkdownPolje nazivPolja="rezime" prikaz="Rezime:" />
            <br />
            <TypeaheadGlumci
              displayName="Glumci:"
              glumci={selektovaniGlumci}
              onAdd={(glumci) => setSelektovaniGlumci(glumci)}
              onRemove={(glumac) => {
                const glumci = selektovaniGlumci.filter((x) => x !== glumac);
                setSelektovaniGlumci(glumci);
              }}
              listUI={(glumac: glumacFilmDTO) => (
                <>
                  {glumac.imePrezime} /{" "}
                  <input
                    placeholder="Uloga"
                    type="text"
                    value={glumac.uloga}
                    onChange={(e) => {
                      const index = selektovaniGlumci.findIndex(
                        (x) => x.id === glumac.id
                      );
                      const glumci = [...selektovaniGlumci];
                      glumci[index].uloga = e.currentTarget.value;
                      setSelektovaniGlumci(glumci);
                    }}
                  />
                </>
              )}
            />
            <br />
            <br />
            <MultipleSelector
              displayName="Žanrovi filma:"
              selected={selektovaniZanrovi}
              nonSelected={neSelektovaniZanrovi}
              onChange={(selected, nonSelected) => {
                setSelektovaniZanrovi(selected);
                setNeSelektovaniZanrovi(nonSelected);
              }}
            />
            <br />
            <MultipleSelector
              displayName="Prikazuje se u bioskopima:"
              selected={selektovaniBioskopi}
              nonSelected={neSelektovaniBioskopi}
              onChange={(selected, nonSelected) => {
                setelektovaniBioskopi(selected);
                setNeSelektovaniBioskopi(nonSelected);
              }}
            />
            <br />
            <button
              type="submit"
              disabled={formikProps.isSubmitting}
              className="btn btn-success"
              style={{ width: "300px",marginBottom:"20px" }}
            >
              Potvrdi
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

interface filmFormaProps {
  model: filmCreationDTO;
  onSubmit(
    values: filmCreationDTO,
    action: FormikHelpers<filmCreationDTO>
  ): void;
  selektovaniZanrovi: zanrDTO[];
  neSelektovaniZanrovi: zanrDTO[];
  selektovaniBioskopi: bioskopDTO[];
  neSelektovaniBioskopi: bioskopDTO[];
  selektovaniGlumci: glumacFilmDTO[];
}
