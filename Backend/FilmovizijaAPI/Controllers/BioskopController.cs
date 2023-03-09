using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using FilmovizijaAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilmovizijaAPI.Controllers
{
    [Route("api/bioskopi")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class BioskopController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public BioskopController(ApplicationDbContext context,IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<BioskopDTO>>> Get([FromQuery] PaginacijaDTO paginacijaDTO)
        {
            var queryable = context.Bioskopi.AsQueryable();
            await HttpContext.InsertParametresPaginationInHeader(queryable);
            var bioskopi = await queryable.OrderBy(bioskop => bioskop.Naziv).Paginate(paginacijaDTO).ToListAsync();
            return mapper.Map<List<BioskopDTO>>(bioskopi);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<BioskopDTO>> Get(int id)
        {
            var bioskop = await context.Bioskopi.FirstOrDefaultAsync(bioskop => bioskop.Id == id);
            if(bioskop == null)
            {
                return NotFound();
            }
            return mapper.Map<BioskopDTO>(bioskop);
        }
        [HttpPost]
        public async Task<ActionResult> Post(BioskopCreationDTO bioskopCreationDTO)
        {
            var bioskop = mapper.Map<Bioskop>(bioskopCreationDTO);
            context.Bioskopi.Add(bioskop);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id,BioskopCreationDTO bioskopCreationDTO)
        {
            var bioskop = await context.Bioskopi.FirstOrDefaultAsync(bioskop => bioskop.Id == id);
            if(bioskop == null)
            {
                return NotFound();
            }
            bioskop = mapper.Map(bioskopCreationDTO, bioskop);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var bioskop = await context.Bioskopi.FirstOrDefaultAsync(bioskop => bioskop.Id == id);
            if(bioskop == null)
            {
                return NotFound();
            }
            context.Bioskopi.Remove(bioskop);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
