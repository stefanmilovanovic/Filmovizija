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
            var zanrovi = await queryable.OrderBy(zanr => zanr.Naziv).Paginate(paginacijaDTO).ToListAsync();
            List<ZanrDTO> zanroviDTO = mapper.Map<List<ZanrDTO>>(zanrovi);
            return zanroviDTO;
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ZanrDTO>> Get(int id)
        {
            var zanr = await context.Zanrovi.FirstOrDefaultAsync(zanr => zanr.Id == id);
            if(zanr == null)
            {
                return NotFound();
            }
            return mapper.Map<ZanrDTO>(zanr);
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ZanrCreationDTO zanrCreationDTO)
        {
            var zanr = mapper.Map<Zanr>(zanrCreationDTO);
            context.Zanrovi.Add(zanr);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,[FromBody] ZanrCreationDTO zanrCreationDTO)
        {
            var zanr = await context.Zanrovi.FirstOrDefaultAsync(zanr => zanr.Id == id);
            if(zanr == null)
            {
                return NotFound();
            }
            zanr = mapper.Map(zanrCreationDTO, zanr);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var daLiPostoji = await context.Zanrovi.AnyAsync(zanr=>zanr.Id==id);
            if (!daLiPostoji)
            {
                return NotFound();
            }
            context.Zanrovi.Remove(new Zanr() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
