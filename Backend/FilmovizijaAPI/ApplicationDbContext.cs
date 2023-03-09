using FilmovizijaAPI.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace FilmovizijaAPI
{
    public class ApplicationDbContext:IdentityDbContext
    {
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FilmoviGlumci>().HasKey(x => new { x.GlumacId, x.FilmId });
            modelBuilder.Entity<FilmoviZanrovi>().HasKey(x => new { x.ZanrId, x.FilmId });
            modelBuilder.Entity<FilmoviBioskopi>().HasKey(x => new { x.BioskopId, x.FilmId });
            base.OnModelCreating(modelBuilder);
        }

        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options) { }
        public DbSet<Zanr> Zanrovi { get; set; }
        public DbSet<Glumac> Glumci { set; get; }
        public DbSet<Bioskop> Bioskopi { set; get;}
        public DbSet<Film> Filmovi { get; set; }
        public DbSet<FilmoviBioskopi> FilmoviBioskopi { get; set; }
        public DbSet<FilmoviGlumci> FilmoviGlumci { get; set; }
        public DbSet<FilmoviZanrovi> FilmoviZanrovi { get; set; }
        public DbSet<Ocene> Ocene { get; set; }
    }
}
