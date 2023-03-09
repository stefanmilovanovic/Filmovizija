import { bioskopDTO } from "./bioskop.model";
import { glumacFilmDTO } from "./glumac.model";
import { zanrDTO } from "./zanr.model";

export interface filmDTO{
    id: number;
    naslov:string;
    poster:string;
    prikazujeSe:boolean;
    trailer:string;
    rezime?:string;
    datumIzlaska:Date;
    zanrovi: zanrDTO[];
    bioskopi: bioskopDTO[];
    glumci: glumacFilmDTO[];
    korisnikovaOcena:number;
    prosecnaOcena:number;
}

export interface filmCreationDTO{
    naslov: string;
    prikazujeSe: boolean;
    trailer: string;
    rezime?: string;
    datumIzlaska?: Date;
    poster?: File;
    posterURL: string;
    zanroviIds?: number[];
    bioskopiIds?:number[];
    glumci?:glumacFilmDTO[];
}

export interface filmoviPostGetDTO{
    zanrovi:zanrDTO[];
    bioskopi:bioskopDTO[];
}

export interface pocetnaDTO{
    uskoroIzlaze:filmDTO[];
    uBioskopima:filmDTO[];
}

export interface filmPutGetDTO{
    film:filmDTO;
    selektovaniZanrovi:zanrDTO[];
    neSelektovaniZanrovi: zanrDTO[];
    selektovaniBioskopi: bioskopDTO[];
    neSelektovaniBioskopi: bioskopDTO[];
    glumci: glumacFilmDTO[];
}

