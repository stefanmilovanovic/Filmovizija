using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.Entities
{
    public class Ocene
    {
        public int Id { get; set; }
        [Range(1,5)]
        public int Ocena { get; set; }
        public int FilmId { get; set; }
        public Film Film { get; set; }
        public string KorisnikId { get; set; }
        public IdentityUser User { get; set; }
    }
}
