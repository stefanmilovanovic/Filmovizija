using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.DTOs
{
    public class BioskopCreationDTO
    {
        [Required]
        [StringLength(100)]
        public string Naziv { get; set; }
        [Range(-90, 90)]
        public double GeografskaSirina { get; set; }
        [Range(-180, 180)]
        public double GeografskaDuzina { get; set; }
    }
}
