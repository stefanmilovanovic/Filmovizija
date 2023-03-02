using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.DTOs
{
    public class ZanrCreationDTO
    {
        [Required(ErrorMessage = "Naziv je obavezan")]
        [StringLength(50,ErrorMessage = "Naziv može imati najviše 50 karaktera")]
        [RegularExpression(@"^[A-Z]{1}[A-z0-9 ]+$", ErrorMessage = "Prvo slovo mora biti veliko")] // Ovako se koristi RegEx ovde
        public string Naziv { get; set; }
    }
}
