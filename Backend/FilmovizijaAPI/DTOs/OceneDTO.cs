using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.DTOs
{
    public class OceneDTO
    {
        [Range(1,5)]
        public int Ocena { get; set; }
        public int FilmId { get; set; }
    }
}
