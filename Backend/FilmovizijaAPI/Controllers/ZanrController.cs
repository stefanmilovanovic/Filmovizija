using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmovizijaAPI.Controllers
{
    [Route("api/zanrovi")]
    [ApiController]
    public class ZanrController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public ZanrController(ApplicationDbContext context,IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<ZanrDTO>> Get()
        {
            List<Zanr> zanrovi = context.Zanrovi.ToList();
            List<ZanrDTO> zanroviDTO = mapper.Map<List<ZanrDTO>>(zanrovi);
            return zanroviDTO;
        }
        [HttpPost]
        public ActionResult Post([FromBody] ZanrCreationDTO zanrCreationDTO)
        {
            var zanr = mapper.Map<Zanr>(zanrCreationDTO);
            context.Zanrovi.Add(zanr);
            context.SaveChanges();
            return NoContent();
        }
    }
}
