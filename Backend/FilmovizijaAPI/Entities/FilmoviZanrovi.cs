namespace FilmovizijaAPI.Entities
{
    public class FilmoviZanrovi
    {
        public int ZanrId { get; set; }
        public int FilmId { get; set; }
        public Zanr Zanr { get; set; }
        public Film Film { get; set; }
    }
}
