import { filmDTO } from "../../interfejsi/film.model";
import Ucitavanje from "../../ostalo/Ucitavanje";
import FilmKartica from "./FilmKartica";

export default function ListaFilmovaBootstrap(
  props: listaFilmovaBootstrapProps
) {
  if (!props.filmovi) {
    return <Ucitavanje />;
  }
  if (props.filmovi.length === 0) {
    return <h2>Prazno...</h2>;
  } else {
    return (
      <div className="row">
        {props.filmovi.map((film) => {
          return (
            <div key={film.id} className="col-md-3 mb-2">
              <FilmKartica {...film} />
            </div>
          );
        })}
      </div>
    );
  }
}

interface listaFilmovaBootstrapProps {
  filmovi?: filmDTO[];
}
