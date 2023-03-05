using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using FilmovizijaAPI.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Helpers;

namespace FilmovizijaAPI.Controllers
{
    [Route("api/glumci")]
    [ApiController]
    public class GlumacController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly string containerName = "glumci";

        public GlumacController(ApplicationDbContext context,IMapper mapper, IFileStorageService fileStorageService)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
        }

        [HttpGet]
        public async Task<ActionResult<List<GlumacDTO>>> Get([FromQuery] PaginacijaDTO paginacijaDTO)
        {
            var queryable = context.Glumci.AsQueryable();
            await HttpContext.InsertParametresPaginationInHeader(queryable);
            var glumci = await queryable.OrderBy(glumac => glumac.ImePrezime).Paginate(paginacijaDTO).ToListAsync();
            return mapper.Map<List<GlumacDTO>>(glumci);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<GlumacDTO>> Get(int id)
        {
            var glumac = await context.Glumci.FirstOrDefaultAsync(glumac => glumac.Id == id);
            if(glumac == null)
            {
                return NotFound();
            }
            return mapper.Map<GlumacDTO>(glumac);
        }
        [HttpGet("traziPoImenu/{query}")]
        public async Task<ActionResult<List<GlumciFilmDTO>>> TraziPoImenu(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return new List<GlumciFilmDTO>();
            }
            return await context.Glumci
                .Where(x => x.ImePrezime.Contains(query)).OrderBy(x => x.ImePrezime)
                .Select(x => new GlumciFilmDTO { Id = x.Id, ImePrezime = x.ImePrezime, Slika = x.Slika })
                .Take(5).ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] GlumacCreationDTO glumacCreationDTO)
        {
            var glumac = mapper.Map<Glumac>(glumacCreationDTO);
            if(glumacCreationDTO.Slika != null)
            {
                glumac.Slika = await fileStorageService.SaveFile(containerName, glumacCreationDTO.Slika);
            }
            context.Glumci.Add(glumac);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] GlumacCreationDTO glumacCreationDTO)
        {
            var glumac = await context.Glumci.FirstOrDefaultAsync(glumac => glumac.Id == id);
            if(glumac == null)
            {
                return NotFound();
            }
            glumac = mapper.Map(glumacCreationDTO,glumac);
            if(glumacCreationDTO.Slika != null)
            {
                glumac.Slika = await fileStorageService.EditFile(containerName, glumacCreationDTO.Slika, glumac.Slika);
            }
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var glumac = await context.Glumci.FirstOrDefaultAsync(glumac=>glumac.Id == id);
            if(glumac == null)
            {
                return NotFound();
            }
            context.Glumci.Remove(glumac);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(glumac.Slika, containerName);
            return NoContent();
        }
    }
}
