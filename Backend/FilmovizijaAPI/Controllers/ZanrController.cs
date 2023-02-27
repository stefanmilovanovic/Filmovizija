using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using FilmovizijaAPI.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<List<ZanrDTO>>> Get([FromQuery] PaginacijaDTO paginacijaDTO)
        {
            var queryable = context.Zanrovi.AsQueryable();
            await HttpContext.InsertParametresPaginationInHeader(queryable);
            var zanrovi = await queryable.OrderBy(x => x.Naziv).Paginate(paginacijaDTO).ToListAsync();
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
