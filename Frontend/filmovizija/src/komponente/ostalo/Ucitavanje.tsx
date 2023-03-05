import LoadingGif from "../../slike/loading.gif";

export default function Ucitavanje() {
  return <img className="img-fluid" style={{maxWidth:"200px",margin:" auto auto"}} src={LoadingGif} alt="loading-gif"/>;
}
