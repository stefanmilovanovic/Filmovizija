using AutoMapper;
using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using FilmovizijaAPI.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.Helpers;

namespace FilmovizijaAPI.Controllers
{
    [Route("api/filmovi")]
    [ApiController]
    [Authorize(AuthenticationSchemes =JwtBearerDefaults.AuthenticationScheme,Policy = "IsAdmin")]
    public class FilmController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly UserManager<IdentityUser> userManager;
        private readonly string container = "filmovi";

        public FilmController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService,UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
            this.userManager = userManager;
        }
        [HttpGet("PostGet")]
        public async Task<ActionResult<FilmPostGetDTO>> PostGet()
        {
            var bioskopi = await context.Bioskopi.ToListAsync();
            var zanrovi = await context.Zanrovi.ToListAsync();

            var bioskopiDTO = mapper.Map<List<BioskopDTO>>(bioskopi);
            var zanroviDTO = mapper.Map<List<ZanrDTO>>(zanrovi);

            return new FilmPostGetDTO() { Bioskopi = bioskopiDTO, Zanrovi = zanroviDTO };
        }
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<FilmDTO>> Get(int id)
        {
            var film = await context.Filmovi.Include(x => x.FilmoviZanrovi).ThenInclude(x => x.Zanr)
                .Include(x => x.FilmoviBioskopi).ThenInclude(x => x.Bioskop)
                .Include(x => x.FilmoviGlumci).ThenInclude(x => x.Glumac).FirstOrDefaultAsync(x => x.Id == id);
            if (film == null)
            {
                return NotFound();
            }

            var prosecnaOcena = 0.0;
            var korisnikovaOcena = 0;

            if(await context.Ocene.AnyAsync(x=>x.FilmId == id))
            {
                prosecnaOcena = await context.Ocene.Where(x => x.FilmId == id).AverageAsync(x => x.Ocena);
                if (HttpContext.User.Identity.IsAuthenticated)
                {

                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await userManager.FindByEmailAsync(email);
                    var userId = user.Id;

                    var ocenaDb = await context.Ocene.FirstOrDefaultAsync(x => x.FilmId == id && x.KorisnikId == userId);
                    if (ocenaDb != null)
                    {
                        korisnikovaOcena = ocenaDb.Ocena;
                    }
                }
            }


            var filmDTO = mapper.Map<FilmDTO>(film);

            filmDTO.ProsecnaOcena = prosecnaOcena;
            filmDTO.KorisnikovaOcena = korisnikovaOcena;

            filmDTO.Glumci = filmDTO.Glumci.OrderBy(x => x.Redosled).ToList();
            return filmDTO;
        }
        /*
        [HttpGet]
        public async Task<ActionResult<PocetnaDTO>> Get()
        {
            var najtrazeniji = 6;
            var danas = DateTime.Today;

            var uskoroIzlaze = await context.Filmovi
                .Where(film => film.DatumIzlaska > danas)
                .OrderBy(film => film.DatumIzlaska)
                .Take(najtrazeniji).ToListAsync();
            var uBioskopima = await context.Filmovi
                .Where(film => film.PrikazujeSe)
                .OrderBy(film => film.DatumIzlaska)
                .Take(najtrazeniji).ToListAsync();

            var pocetnaDTO = new PocetnaDTO();
            pocetnaDTO.UskoroIzlaze = mapper.Map<List<FilmDTO>>(uskoroIzlaze);
            pocetnaDTO.UBioskopma = mapper.Map<List<FilmDTO>>(uBioskopima);
            return pocetnaDTO;
        }*/
        [HttpGet("ubioskopima")]
        [AllowAnonymous]
        public ActionResult<List<FilmDTO>> UBioskopima()
        {
            List<Film> filmovi = context.Filmovi.Where(film => film.PrikazujeSe)
                .OrderBy(film => film.DatumIzlaska)
                .Take(4).ToList();
            return mapper.Map<List<FilmDTO>>(filmovi);
        }

        [HttpGet("uskoroizlaze")]
        [AllowAnonymous]
        public ActionResult<List<FilmDTO>> UskoroIzlaze()
        {
            var danas = DateTime.Today;
            List<Film> filmovi = context.Filmovi
                .Where(film => film.DatumIzlaska > danas)
                .OrderBy(film => film.DatumIzlaska)
                .Take(4).ToList();
            return mapper.Map<List<FilmDTO>>(filmovi);
        }
        [HttpGet]
        public async Task<ActionResult<List<FilmDTO>>> SviFilmovi([FromQuery] PaginacijaDTO paginacijaDTO)
        {
            var queryable = context.Filmovi.AsQueryable();
            await HttpContext.InsertParametresPaginationInHeader(queryable);
            var filmovi = await queryable.OrderBy(film=>film.DatumIzlaska).Paginate(paginacijaDTO).ToListAsync();
            return mapper.Map<List<FilmDTO>>(filmovi);

        }
        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<FilmPutGetDTO>> PutGet(int id)
        {
            var filmRezultat = await Get(id);
            if(filmRezultat.Result is NotFoundResult)
            {
                return NotFound();
            }
            var film = filmRezultat.Value;

            var selektovaniZanroviIds = film.Zanrovi.Select(x => x.Id).ToList();
            var neSelektovaniZanrovi = await context.Zanrovi.Where(x=>!selektovaniZanroviIds.Contains(x.Id)).ToListAsync();

            var selektovaniBioskopiIds = film.Bioskopi.Select(x=>x.Id).ToList();
            var neSelektovaniBioskopi = await context.Bioskopi.Where(x => !selektovaniBioskopiIds.Contains(x.Id)).ToListAsync();

            var neSelektovaniZanroviDTO = mapper.Map<List<ZanrDTO>>(neSelektovaniZanrovi);
            var neSelektovaniBioskopiDTO = mapper.Map<List<BioskopDTO>>(neSelektovaniBioskopi);

            var response = new FilmPutGetDTO();
            response.Film = film;
            response.SelektovaniZanrovi = film.Zanrovi;
            response.NeSelektovaniZanrovi = neSelektovaniZanroviDTO;
            response.SelektovaniBioskopi = film.Bioskopi;
            response.NeSelektovaniBioskopi = neSelektovaniBioskopiDTO;
            response.Glumci = film.Glumci;
            return response;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<FilmDTO>>> Filter([FromQuery] FilterFilmovaDTO filterFilmovaDTO)
        {
            var filmoviQueryable = context.Filmovi.AsQueryable();
            if (!string.IsNullOrEmpty(filterFilmovaDTO.Naslov))
            {
                filmoviQueryable = filmoviQueryable.Where(x => x.Naslov.Contains(filterFilmovaDTO.Naslov));
            }
            if (filterFilmovaDTO.UBioskopima)
            {
                filmoviQueryable = filmoviQueryable.Where(x => x.PrikazujeSe);
            }
            if(filterFilmovaDTO.UskoroIzlaze)
            {
                var danas = DateTime.Today;
                filmoviQueryable = filmoviQueryable.Where(x => x.DatumIzlaska > danas);
            }
            if (filterFilmovaDTO.ZanrId != 0)
            {
                filmoviQueryable = filmoviQueryable.Where(film=>film.FilmoviZanrovi.Select(zanr=>zanr.ZanrId).Contains(filterFilmovaDTO.ZanrId));
            }
            await HttpContext.InsertParametresPaginationInHeader(filmoviQueryable);
            var filmovi = await filmoviQueryable.OrderBy(x=>x.Naslov).Paginate(filterFilmovaDTO.PaginacijaDTO).ToListAsync();
            return mapper.Map<List<FilmDTO>>(filmovi);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] FilmCreationDTO filmCreationDTO)
        {
            var film = mapper.Map<Film>(filmCreationDTO);
            if (filmCreationDTO.Poster != null)
            {
                film.Poster = await fileStorageService.SaveFile(container, filmCreationDTO.Poster);
            }
            GlumciRedosled(film);
            context.Add(film);
            await context.SaveChangesAsync();
            return film.Id;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] FilmCreationDTO filmCreationDTO)
        {
            var film = await context.Filmovi
                .Include(film => film.FilmoviGlumci)
                .Include(film => film.FilmoviZanrovi)
                .Include(film => film.FilmoviBioskopi).FirstOrDefaultAsync(film=>film.Id == id);
            if(film == null)
            {
                return NotFound();
            }
            film = mapper.Map(filmCreationDTO, film);

            if(filmCreationDTO.Poster != null)
            {
                film.Poster = await fileStorageService.EditFile(container, filmCreationDTO.Poster,film.Poster);
            }
            GlumciRedosled(film);
            await context.SaveChangesAsync();
            return NoContent();
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var film = await context.Filmovi.FirstOrDefaultAsync(film => film.Id == id);

            if(film == null)
            {
                return NotFound();
            }
            context.Remove(film);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(film.Poster, container);
            return NoContent();
        }
        private void GlumciRedosled(Film film)
        {
            if (film.FilmoviGlumci != null)
            {
                for (int i = 0; i < film.FilmoviGlumci.Count; i++)
                {
                    film.FilmoviGlumci[i].Redosled = i;
                }
            }
        }
    }
}
