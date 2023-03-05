using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.Entities
{
    public class Bioskop
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Naziv { get; set; }
        public Point Lokacija { get; set; }
    }
}
