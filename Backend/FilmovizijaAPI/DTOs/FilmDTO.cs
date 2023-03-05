namespace FilmovizijaAPI.DTOs
{
    public class FilmDTO
    {
        public int Id { get; set; }
        public string Naslov { get; set; }
        public string Rezime { get; set; }
        public string Trailer { get; set; }
        public bool PrikazujeSe { get; set; }
        public DateTime DatumIzlaska { get; set; }
        public string Poster { get; set; }

        public List<ZanrDTO> Zanrovi { get; set; }
        public List<BioskopDTO> Bioskopi { get; set; }
        public List<GlumciFilmDTO> Glumci { get; set; }
    }
}
