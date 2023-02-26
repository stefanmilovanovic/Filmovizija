using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FilmovizijaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZanrController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        public ZanrController(ApplicationDbContext context)
        {
            this.context = context;
        }
    }
}
