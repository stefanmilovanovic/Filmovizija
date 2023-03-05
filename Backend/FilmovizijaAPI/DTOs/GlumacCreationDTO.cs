using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.DTOs
{
    public class GlumacCreationDTO
    {
        [Required(ErrorMessage ="Ime i prezime je obavezno!")]
        [StringLength(120)]
        public string ImePrezime { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string Biografija { get; set; }
        public IFormFile Slika { get; set; }
    }
}
