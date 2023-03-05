namespace FilmovizijaAPI.DTOs
{
    public class FilmPutGetDTO
    {
        public FilmDTO Film { get; set; }
        public List<ZanrDTO> SelektovaniZanrovi { get; set; }
        public List<ZanrDTO> NeSelektovaniZanrovi { get; set; } 
        public List<BioskopDTO> SelektovaniBioskopi { get; set; }
        public List<BioskopDTO> NeSelektovaniBioskopi { get; set; }
        public List<GlumciFilmDTO> Glumci { get; set; }
    }
}
