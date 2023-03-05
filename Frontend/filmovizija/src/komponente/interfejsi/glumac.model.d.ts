export interface glumacCreationDTO {
    imePrezime: string;
    datumRodjenja?: Date;
    slika?: File;
    slikaURL?: string;
    biografija: string;
}
export interface glumacFilmDTO {
    id: number;
    imePrezime: string;
    uloga: string;
    slika: string;
}
export interface glumacDTO {
    id: number;
    imePrezime: string;
    datumRodjenja: Date;
    slika: string;
    biografija: string;
}