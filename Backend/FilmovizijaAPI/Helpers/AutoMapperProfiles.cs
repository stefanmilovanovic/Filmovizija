using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using NetTopologySuite.Geometries;

namespace FilmovizijaAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<ZanrDTO, Zanr>().ReverseMap(); //Pomocu ReverseMap konfigurisano mapiranje i iz ZanrDTO->Zanr i obrnuto
            CreateMap<ZanrCreationDTO, Zanr>();

            CreateMap<GlumacDTO, Glumac>().ReverseMap();
            CreateMap<GlumacCreationDTO, Glumac>().ForMember(x => x.Slika, opcije => opcije.Ignore());

            CreateMap<Bioskop, BioskopDTO>().ForMember(x => x.GeografskaSirina, dto => dto.MapFrom(prop => prop.Lokacija.Y))
                .ForMember(x => x.GeografskaDuzina, dto => dto.MapFrom((prop) => prop.Lokacija.X));
            CreateMap<BioskopCreationDTO, Bioskop>()
                .ForMember(x => x.Lokacija, x => x.MapFrom(dto => geometryFactory.CreatePoint(new Coordinate(dto.GeografskaDuzina, dto.GeografskaSirina))));

            CreateMap<FilmCreationDTO, Film>().ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.FilmoviZanrovi, options => options.MapFrom(MapFilmoviZanrovi))
                .ForMember(x => x.FilmoviBioskopi, options => options.MapFrom(MapFilmoviBioskopi))
                .ForMember(x => x.FilmoviGlumci, options => options.MapFrom(MapFilmoviGlumci));

            CreateMap<Film, FilmDTO>()
                .ForMember(x => x.Zanrovi, options => options.MapFrom(MapFilmoviZanrovi))
                .ForMember(x => x.Bioskopi, options => options.MapFrom(MapFilmoviBioskopi))
                .ForMember(x => x.Glumci, options => options.MapFrom(MapFilmoviGlumci));
        }
        private List<GlumciFilmDTO> MapFilmoviGlumci(Film film, FilmDTO filmDTO)
        {
            var result = new List<GlumciFilmDTO>();
            if (film.FilmoviGlumci != null)
            {
                foreach (var filmoviGlumci in film.FilmoviGlumci)
                {
                    result.Add(new GlumciFilmDTO()
                    {
                        Id = filmoviGlumci.GlumacId,
                        ImePrezime = filmoviGlumci.Glumac.ImePrezime,
                        Uloga = filmoviGlumci.Uloga,
                        Slika = filmoviGlumci.Glumac.Slika,
                        Redosled = filmoviGlumci.Redosled
                    });
                }
            }
            return result;
        }
        private List<ZanrDTO> MapFilmoviZanrovi(Film film, FilmDTO filmDTO)
        {
            var rezultat = new List<ZanrDTO>();
            if (film.FilmoviZanrovi != null)
            {
                foreach (var zanr in film.FilmoviZanrovi)
                {
                    rezultat.Add(new ZanrDTO() { Id = zanr.ZanrId, Naziv = zanr.Zanr.Naziv });
                }
            }
            return rezultat;
        }
        private List<BioskopDTO> MapFilmoviBioskopi(Film film, FilmDTO filmDTO)
        {
            var rezultat = new List<BioskopDTO>();
            if (film.FilmoviBioskopi != null)
            {
                foreach (var filmoviBioskopi in film.FilmoviBioskopi)
                {
                    rezultat.Add(new BioskopDTO()
                    {
                        Id = filmoviBioskopi.BioskopId,
                        Naziv = filmoviBioskopi.Bioskop.Naziv,
                        GeografskaSirina = filmoviBioskopi.Bioskop.Lokacija.Y,
                        GeografskaDuzina = filmoviBioskopi.Bioskop.Lokacija.X
                    });
                }
            }
            return rezultat;
        }

        private List<FilmoviZanrovi> MapFilmoviZanrovi(FilmCreationDTO filmCreationDTO, Film film)
        {
            var rezultat = new List<FilmoviZanrovi>();
            if (filmCreationDTO.ZanroviIds == null)
            {
                return rezultat;
            }
            foreach (var id in filmCreationDTO.ZanroviIds)
            {
                rezultat.Add(new FilmoviZanrovi() { ZanrId = id });
            }
            return rezultat;
        }
        private List<FilmoviBioskopi> MapFilmoviBioskopi(FilmCreationDTO filmCreationDTO, Film film)
        {
            var rezultat = new List<FilmoviBioskopi>();
            if (filmCreationDTO.BioskopiIds == null)
            {
                return rezultat;
            }
            foreach (var id in filmCreationDTO.BioskopiIds)
            {
                rezultat.Add(new FilmoviBioskopi() { BioskopId = id });
            }
            return rezultat;
        }
        private List<FilmoviGlumci> MapFilmoviGlumci(FilmCreationDTO filmCreationDTO, Film film)
        {
            var rezultat = new List<FilmoviGlumci>();
            if (filmCreationDTO.Glumci == null)
            {
                return rezultat;
            }
            foreach (var glumac in filmCreationDTO.Glumci)
            {
                rezultat.Add(new FilmoviGlumci() { GlumacId = glumac.Id, Uloga = glumac.Uloga });
            }
            return rezultat;
        }
    }
}
