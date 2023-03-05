using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.Entities
{
    public class Film
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 100)]
        public string Naslov { get; set; }
        public string Rezime { get; set; }
        public string Trailer { get; set; }
        public bool PrikazujeSe { get; set; }
        public DateTime DatumIzlaska { get; set; }
        public string Poster { get; set; }
        public List<FilmoviZanrovi> FilmoviZanrovi { get; set; }
        public List<FilmoviBioskopi> FilmoviBioskopi { get; set; }
        public List<FilmoviGlumci> FilmoviGlumci { get; set; }
    }
}
