import { Link } from "react-router-dom";

export default function Greska403() {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        paddingTop: "10%",
      }}
    >
      <h1 style={{ fontSize: "100px", fontStyle: "italic" }}>403</h1>
      <p>Nemate pristup ovoj stranici</p>
      <Link to="/">Vrati na početnu</Link>
    </div>
  );
}
