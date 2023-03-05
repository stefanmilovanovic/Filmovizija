namespace FilmovizijaAPI.DTOs
{
    public class FilterFilmovaDTO
    {
        public int Strana { get; set; }
        public int RezultataPoStrani { get; set; }
        public PaginacijaDTO PaginacijaDTO
        {
            get { return new PaginacijaDTO() { Strana = Strana, RezultataPoStrani = RezultataPoStrani }; }
        }
        public string? Naslov { get;set; }
        public int ZanrId { get;set; }
        public bool UBioskopima { get; set; }
        public bool UskoroIzlaze { get; set; }
    }
}
