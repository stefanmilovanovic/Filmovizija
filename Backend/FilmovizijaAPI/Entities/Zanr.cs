using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.Entities
{
    public class Zanr
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Naziv je obavezan")]
        [StringLength(50)]
        public string Naziv { get; set; }

    }
}
