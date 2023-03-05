using Microsoft.AspNetCore.Mvc;
using MoviesAPI.Helpers;
using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.DTOs
{
    public class FilmCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 100)]
        public string Naslov { get; set; }
        public string Rezime { get; set; }
        public string Trailer { get; set; }
        public bool PrikazujeSe { get; set; }   
        public DateTime DatumIzlaska { get; set; }
        public IFormFile Poster { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> ZanroviIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> BioskopiIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<FilmoviGlumciCreationDTO>>))]
        public List<FilmoviGlumciCreationDTO> Glumci { get; set; }
    }
}
