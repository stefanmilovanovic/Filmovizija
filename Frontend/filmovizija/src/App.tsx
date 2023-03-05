import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigacija from "./elementi/Navigacija";
import rute from "./rute/rute";
import Footer from "./elementi/Footer";
//import "./css/Paginacija.css";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navigacija />
        <Switch>
          {rute.map((ruta) => {
            return (
              <Route
                key={ruta.path}
                path={ruta.path}
                component={ruta.component}
                exact={ruta.exact}
              />
            );
          })}
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
