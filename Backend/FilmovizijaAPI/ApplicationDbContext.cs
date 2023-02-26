using FilmovizijaAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace FilmovizijaAPI
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options) { }
        public DbSet<Zanr> Zanrovi { get; set; }
    }
}
