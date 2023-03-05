import axios, { AxiosResponse } from "axios";
import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { ReactElement } from "react-markdown/lib/react-markdown";
import { urlGlumci } from "../../endpoints/endpoints";
import { glumacFilmDTO } from "../interfejsi/glumac.model";

export default function TypeaheadGlumci(props: typeaheadGlumciProps) {
  const [glumci, setGlumci] = React.useState<glumacFilmDTO[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const selected: glumacFilmDTO[] = [];

  function handleSearch(query: string) {
    setIsLoading(true);

    axios
      .get(`${urlGlumci}/traziPoImenu/${query}`)
      .then((response: AxiosResponse<glumacFilmDTO[]>) => {
        setGlumci(response.data);
        setIsLoading(false);
      });
  }

  return (
    <div className="mb-3">
      <label>{props.displayName}</label>
      <AsyncTypeahead
        id="typeahead"
        onChange={(glumci) => {
          if (props.glumci.findIndex((x) => x.id === glumci[0].id) === -1) {
            glumci[0].uloga = "";
            props.onAdd([...props.glumci, glumci[0]]);
          }
        }}
        options={glumci}
        labelKey={(glumci) => glumci.imePrezime}
        filterBy={() => true}
        isLoading={isLoading}
        onSearch={handleSearch}
        placeholder="Unesite ime glumca..."
        minLength={1}
        flip={true}
        selected={selected}
        renderMenuItemChildren={(glumci) => (
          <>
            <img
              style={{ height: "64px", marginRight: "10px", width: "64px" }}
              src={glumci.slika}
              alt="slika"
            />
            <span>
              {glumci.imePrezime} <b>{glumci.uloga}</b>
            </span>
          </>
        )}
      />
      <ul className="list-group">
        {props.glumci.map((glumac) => {
          return (
            <li
              className="list-group-item list-group-item-action"
              key={glumac.id}
            >
              {props.listUI(glumac)}
              <span
                className="badge badge-primary badge-pill pointer text-dark"
                style={{ marginLeft: "0.5rem" }}
                onClick={() => props.onRemove(glumac)}
              >
                X
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface typeaheadGlumciProps {
  displayName: string;
  glumci: glumacFilmDTO[];
  onAdd(glumci: glumacFilmDTO[]): void;
  listUI(glumac: glumacFilmDTO): ReactElement;
  onRemove(glumac: glumacFilmDTO): void;
}
