namespace FilmovizijaAPI.Entities
{
    public class FilmoviBioskopi
    {
        public int BioskopId { get; set; }
        public int FilmId { get; set; }
        public Bioskop Bioskop { get; set; }
        public Film Film { get; set; }
    }
}
