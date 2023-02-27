using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;

namespace FilmovizijaAPI.Helpers
{
    public class AutoMapperProfiles:Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ZanrDTO, Zanr>().ReverseMap(); //Pomocu ReverseMap konfigurisano mapiranje i iz ZanrDTO->Zanr i obrnuto
            CreateMap<ZanrCreationDTO, Zanr>().ReverseMap();
        }
    }
}
