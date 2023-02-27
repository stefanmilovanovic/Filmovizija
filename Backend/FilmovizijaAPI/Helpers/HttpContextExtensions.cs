using Microsoft.EntityFrameworkCore;

namespace FilmovizijaAPI.Helpers
{
    public static class HttpContextExtensions
    {
        public async static Task InsertParametresPaginationInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }
            double count = await queryable.CountAsync();
            httpContext.Response.Headers.Add("brojrezultata", count.ToString());

        }
    }
}
