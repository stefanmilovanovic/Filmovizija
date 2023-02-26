import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigacija from "./elementi/Navigacija";
import rute from "./rute/rute";

function App() {
  return (
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
    </BrowserRouter>
  );
}

export default App;
