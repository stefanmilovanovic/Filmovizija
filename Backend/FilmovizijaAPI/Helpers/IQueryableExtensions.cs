using FilmovizijaAPI.DTOs;

namespace FilmovizijaAPI.Helpers
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginacijaDTO paginacijaDTO)
        {
            return queryable.Skip((paginacijaDTO.Strana - 1) * paginacijaDTO.RezultataPoStrani)
                .Take(paginacijaDTO.RezultataPoStrani);
        }
    }
}
