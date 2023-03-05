import { filmDTO } from "../interfejsi/film.model";
import GenericList from "../ostalo/GenericList";
import Film from "./Film";
import css from "./ListaFilmova.module.css";

export default function ListaFilmova(props:listaFilmovaProps){


    return (
        <GenericList list={props.filmovi}>
            <div className={css.div}>{props.filmovi?.map(film=>(
                <Film key={film.id} {...film}/>
            ))}</div>
        </GenericList>
    )
}

interface listaFilmovaProps{
    filmovi?: filmDTO[];
}