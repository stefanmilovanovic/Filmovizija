using FilmovizijaAPI.DTOs;
using FilmovizijaAPI.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FilmovizijaAPI.Controllers
{
    [Route("api/ocene")]
    [ApiController]
    public class OceneController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<IdentityUser> userManager;

        public OceneController(ApplicationDbContext context,UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] OceneDTO oceneDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await userManager.FindByEmailAsync(email);
            var userId = user.Id;

            var trenutnaOcena = await context.Ocene.FirstOrDefaultAsync(x=>x.FilmId == oceneDTO.FilmId && x.KorisnikId == userId);

            if (trenutnaOcena == null)
            {
                var ocena = new Ocene();
                ocena.FilmId = oceneDTO.FilmId;
                ocena.Ocena = oceneDTO.Ocena;
                ocena.KorisnikId = userId;
                context.Add(ocena);
            }
            else
            {
                trenutnaOcena.Ocena = oceneDTO.Ocena;
            }

            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
