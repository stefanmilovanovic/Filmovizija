namespace FilmovizijaAPI.DTOs
{
    public class PaginacijaDTO
    {
        public int Strana { get; set; } = 1;
        private int rezultataPoStrani = 10;
        private readonly int maxRezultataPoStrani = 50;

        public int RezultataPoStrani
        {
            get { return rezultataPoStrani; }
            set { rezultataPoStrani = (value > maxRezultataPoStrani) ? maxRezultataPoStrani : value; }
        }
    }
}
