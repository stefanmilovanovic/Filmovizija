using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.Entities
{
    public class Glumac
    {
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string ImePrezime { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string Biografija { get; set; }
        public string Slika { get; set; }
    }
}
