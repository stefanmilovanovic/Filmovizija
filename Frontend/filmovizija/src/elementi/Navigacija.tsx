import React from "react";
import { Link, NavLink } from "react-router-dom";
import AutentifikacijaContext from "../auth/AutentifikacijaContext";
import Autorizacija from "../auth/Autorizacija";
import { logout } from "../auth/handleJWT";
import Logo from "../slike/logo.png";

export default function Navigacija() {
  const { update, claims } = React.useContext(AutentifikacijaContext);

  function korisnikovEmail(): string {
    return claims.filter((x) => x.name === "email")[0]?.value;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark moj_stil_navigacija">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src={Logo}
            alt="filmovizija"
            height="34"
            style={{ marginRight: "10px", marginTop: "-10px" }}
          />
          <span style={{ fontSize: "25px", fontStyle: "italic" }}>
            FILMOVIZIJA
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                POČETNA
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/filmovi/filter">
                FILTER FILMOVA
              </NavLink>
            </li>
            <Autorizacija
              rola="admin"
              autorizovan={
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/filmovi/dodaj">
                      DODAJ FILM
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/zanrovi">
                      ŽANROVI
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/glumci">
                      GLUMCI
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/bioskopi">
                      BIOSKOPI
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/filmovi">
                      FILMOVI
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>
          <div className="d-flex">
            <Autorizacija
              autorizovan={
                <>
                  <button className="btn btn-dark" disabled>
                    {korisnikovEmail()}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      update([]);
                    }}
                    className="btn btn-primary ms-3"
                  >
                    ODJAVI SE
                  </button>
                </>
              }
              nijeAutorizovan={
                <>
                  <Link to="/registracija" className="btn btn-dark">
                    REGISTRACIJA
                  </Link>
                  <Link to="/prijava" className="btn btn-success ms-3">
                    PRIJAVA
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
