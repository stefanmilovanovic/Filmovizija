import Pocetna from "../komponente/Pocetna";
import DodajZanr from "../komponente/zanrovi/DodajZanr";
import IndexZanrovi from "../komponente/zanrovi/IndexZanrovi";
import IzmeniZanr from "../komponente/zanrovi/IzmeniZanr";

const rute = [
    {path:"/",component:Pocetna,exact:true},
    {path:"/zanrovi",component:IndexZanrovi,exact:true},
    {path:"/zanrovi/dodaj",component:DodajZanr},
    {path:"/zanrovi/izmeni/:id(\\d+)",component:IzmeniZanr},
]

export default rute;