import { Link } from "react-router-dom";

export default function Greska404() {
  return (
    <div style={{
        width:"100%",textAlign:"center",paddingTop:"10%"
    }}>
      <h1 style={{fontSize:"100px",fontStyle:"italic"}}>404</h1>
      <Link to="/">Vrati na početnu</Link>
    </div>
  );
}
