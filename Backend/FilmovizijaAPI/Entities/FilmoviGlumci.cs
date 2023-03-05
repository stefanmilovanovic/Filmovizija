using System.ComponentModel.DataAnnotations;

namespace FilmovizijaAPI.Entities
{
    public class FilmoviGlumci
    {
        public int GlumacId { get; set; }
        public int FilmId { get; set; }
        [StringLength(maximumLength: 75)]
        public string Uloga { get; set; }
        public int Redosled { get; set; }
        public Glumac Glumac { get; set; }
        public Film Film { get; set; }
    }
}
