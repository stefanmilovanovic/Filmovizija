import axios, { AxiosResponse } from "axios";
import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { Link, useHistory, useParams } from "react-router-dom";
import PrikaziGreske from "../ostalo/PrikaziGreske";
import Ucitavanje from "../ostalo/Ucitavanje";

export default function UniverzalnaKomponentaZaIzmenu<TKreiranje, TCitanje>(
  props: univerzalnaKomponentaZaIzmenuProps<TKreiranje, TCitanje>
) {
  const history = useHistory();
  const { id }: any = useParams();
  const [objekat, setObjekat] = React.useState<TKreiranje>();
  const [errors, setErrors] = React.useState<string[]>([]);

  React.useEffect(() => {
    axios
      .get(`${props.url}/${id}`)
      .then((response: AxiosResponse<TCitanje>) => {
        setObjekat(props.transform(response.data));
      });
  }, [id]);

  async function izmeni(objekatZaIzmenu: TKreiranje) {
    try {
      if (props.transformFormData) {
        const formData = props.transformFormData(objekatZaIzmenu);
        await axios({
          method: "put",
          url: `${props.url}/${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.put(`${props.url}/${id}`, objekatZaIzmenu);
      }
      history.push(props.indexURL);
    } catch (error: any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm-9">
              <h2>
                Izmeni {props.nazivObjekat} <b>{id}</b>
              </h2>
            </div>
            <div className="col-sm-3">
              <div className="d-grid gap-2">
                <Link className="btn btn-danger" to={props.indexURL}>
                  Odustani
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
      <div className="container">
        <br/>
        <br/>
        {objekat ? props.children(objekat, izmeni) : <Ucitavanje />}
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <PrikaziGreske greske={errors} />
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  );
}

interface univerzalnaKomponentaZaIzmenuProps<TKreiranje, TCitanje> {
  nazivObjekat: string;
  url: string;
  indexURL: string;
  transform(objekat: TCitanje): TKreiranje;
  transformFormData?(model: TKreiranje): FormData;
  children(
    objekat: TKreiranje,
    izmeni: (objekat: TKreiranje) => void
  ): ReactElement;
}

UniverzalnaKomponentaZaIzmenu.defaultProps = {
  transform: (objekat: any) => objekat,
};
