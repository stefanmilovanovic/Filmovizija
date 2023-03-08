import css from "./cssFilmovi/Film.module.css";
import { filmDTO } from "../interfejsi/film.model";
import { Link } from "react-router-dom";

export default function Film(props: filmDTO){

    const kreirajLink = () => `/film/${props.id}`;
    
    return(
        <div className={css.div}>
            <Link to={kreirajLink()}>
                <img alt="Poster" src={props.poster}/>
            </Link>
            <p>
                <Link to={kreirajLink()}>{props.naslov}</Link>
            </p>
        </div>
    )
}