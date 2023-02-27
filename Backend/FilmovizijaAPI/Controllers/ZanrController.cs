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
        public ZanrController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public ActionResult<List<Zanr>> Get()
        {
            List<Zanr> zanrovi = context.Zanrovi.ToList();
            return zanrovi;
        }
    }
}
