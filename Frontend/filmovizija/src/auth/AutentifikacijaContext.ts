import React from "react";
import { claim } from "./auth.model";

const AutentifikacijaContext = React.createContext<{
    claims: claim[];
    update(claims: claim[]): void;
}>({
    claims: [],
    update: () => { }
});

export default AutentifikacijaContext;