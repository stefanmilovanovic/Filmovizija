import { Link } from "react-router-dom";
import { filmDTO } from "../../interfejsi/film.model";
import "./FilmKartica.css";

export default function FilmKartica(props: filmDTO) {
  const kreirajLink = () => `/film/${props.id}`;

  return (
    <div className="card h-100 moj-stil-kartica">
      <Link style={{height:"85%"}} to={kreirajLink()}>
      <img style={{height:"100%"}}  src={props.poster} className="card-img-top" alt="..." />
      </Link>
      <div className="card-body" style={{maxHeight:"20%", overflow:"hidden",wordBreak:"normal"}}>
        <p><Link to={kreirajLink()}>{props.naslov}</Link></p>
      </div>
    </div>
  );
}
