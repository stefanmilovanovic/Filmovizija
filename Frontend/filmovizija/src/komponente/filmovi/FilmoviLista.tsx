import { filmDTO } from "../interfejsi/film.model";
import Film from "./Film";

export default function FilmoviLista(props: filmoviListaProps) {
    console.log(props.filmovi)
  return (
    <div>
      {props.filmovi?.map((film) => {
        return <Film key={film.id} {...film} />;
      })}
    </div>
  );
}

interface filmoviListaProps {
  filmovi?: filmDTO[];
}
