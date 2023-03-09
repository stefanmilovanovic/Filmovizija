import axios, { AxiosResponse } from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { urlFilmovi, urlOcene } from "../../endpoints/endpoints";
import { coordinateDTO } from "../interfejsi/coordinates.model";
import { filmDTO } from "../interfejsi/film.model";
import Map from "../ostalo/Map";
import Ocene from "../ostalo/Ocene";
import Ucitavanje from "../ostalo/Ucitavanje";

export default function FilmDetalji() {
  const { id }: any = useParams();
  const [film, setFilm] = React.useState<filmDTO>();

  React.useEffect(() => {
    axios
      .get(`${urlFilmovi}/${id}`)
      .then((response: AxiosResponse<filmDTO>) => {
        response.data.datumIzlaska = new Date(response.data.datumIzlaska);
        setFilm(response.data);
      });
  }, [id]);

  function YouTubeVideoURL(trailer: string): string {
    if (!trailer) {
      return "";
    }
    let videoId = trailer.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    return `https://www.youtube.com/embed/${videoId}`;
  }

  function transformacijaKoordinata(): coordinateDTO[] {
    if (film?.bioskopi) {
      const koordinate = film.bioskopi.map((bioskop) => {
        return {
          lat: bioskop.geografskaSirina,
          lng: bioskop.geografskaDuzina,
          naziv: bioskop.naziv,
        } as coordinateDTO;
      });
      return koordinate;
    }
    return [];
  }

  function ocenjivanje(ocena:number){
    axios.post(urlOcene,{ocena:ocena,filmId:id}).then(()=>{
      Swal.fire({icon:"success",title:"Ocenili ste film!"});
    })
  }

  return film ? (
    <>
      <div style={{ backgroundColor: "#00bb8c" }}>
        <div className="container">
          <br />
          <div className="row">
            <div className="col-md-8">
              <h2>
                {film?.naslov} ({film?.datumIzlaska.getFullYear()})
              </h2>
              {film.zanrovi?.map((zanr) => (
                <Link
                  key={zanr.id}
                  className="btn btn-primary rounded-pill"
                  to={`/filmovi/filter?zanrId=${zanr.id}`}
                  style={{ marginRight: "5px" }}
                >
                  {zanr.naziv}
                </Link>
              ))}
              | Datum izlaska: {film.datumIzlaska.toLocaleDateString()}
              <br />
              <br />
            </div>
            <div className="col-md-4">
              <br />
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="fs-4 ">Oceni film: </span>
                <span style={{width:"15px"}}></span>
                <Ocene
                  najvecaOcena={5}
                  selektovanaOcena={film.korisnikovaOcena}
                  onChange={ocenjivanje}
                /><span style={{width:"10px"}}></span>
                <span>({film.prosecnaOcena} &#9733;)</span>
              </div>
              <br/>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-sm-3">
            <img src={film.poster} style={{ width: "100%" }} alt="poster" />
            <br />
            <br />
          </div>
          <div className="col-sm-7">
            {film.trailer ? (
              <div>
                <iframe
                  title="youtube-trailer"
                  width="80%"
                  height="350px"
                  src={YouTubeVideoURL(film.trailer)}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
                  allowFullScreen
                ></iframe>
              </div>
            ) : null}
          </div>
        </div>

        <hr />
        {film.rezime ? (
          <div>
            <h3>Rezime</h3>
            <hr />
            <div>
              <ReactMarkdown>{film.rezime}</ReactMarkdown>
            </div>
            <hr />
          </div>
        ) : null}
        {film.glumci && film.glumci.length > 0 ? (
          <div>
            <h3>Uloge</h3>
            <hr />
            <div style={{ display: "flex", flexDirection: "column" }}>
              {film.glumci.map((glumac) => (
                <div key={glumac.id} style={{ marginBottom: "4px" }}>
                  <img
                    alt="pic"
                    src={glumac.slika}
                    style={{ width: "50px", verticalAlign: "middle" }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      width: "200px",
                      marginLeft: "1rem",
                    }}
                  >
                    {glumac.imePrezime}
                  </span>
                  <span
                    style={{ display: "inline-block", width: "45px" }}
                  ></span>
                  <span>{glumac.uloga}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {film.bioskopi && film.bioskopi.length > 0 ? (
          <div>
            <hr />
            <h3>Prikazuje se u bioskopima:</h3>
            <hr />
            <Map readonly={true} coordinates={transformacijaKoordinata()} />
          </div>
        ) : null}
        <br />
      </div>
    </>
  ) : (
    <Ucitavanje />
  );
}
