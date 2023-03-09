import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigacija from "./elementi/Navigacija";
import rute from "./rute/rute";
import Footer from "./elementi/Footer";
import { claim } from "./auth/auth.model";
import AutentifikacijaContext from "./auth/AutentifikacijaContext";
import Greska403 from "./komponente/ostalo/Greska403";
import { getClaims } from "./auth/handleJWT";
import configureInterceptor from "./komponente/ostalo/httpInterceptors";
//import "./css/Paginacija.css";

configureInterceptor();

function App() {
  const [claims, setClaims] = React.useState<claim[]>([]);

  React.useEffect(() => {
    setClaims(getClaims());
  }, []);

  function isAdmin() {
    // provera da li je korisnik admin
    return (
      claims.findIndex(
        (claim) => claim.name === "role" && claim.value === "admin"
      ) > -1
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <AutentifikacijaContext.Provider value={{ claims, update: setClaims }}>
          <Navigacija />
          <Switch>
            {rute.map((ruta) => {
              return (
                <Route key={ruta.path} path={ruta.path} exact={ruta.exact}>
                  {ruta.isAdmin && !isAdmin() ? (
                    <Greska403 />
                  ) : (
                    <ruta.component />
                  )}
                </Route>
              );
            })}
          </Switch>
          <Footer />
        </AutentifikacijaContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
