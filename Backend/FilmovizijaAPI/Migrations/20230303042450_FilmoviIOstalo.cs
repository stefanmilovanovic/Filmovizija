using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FilmovizijaAPI.Migrations
{
    /// <inheritdoc />
    public partial class FilmoviIOstalo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Filmovi",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naslov = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Rezime = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Trailer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrikazujeSe = table.Column<bool>(type: "bit", nullable: false),
                    DatumIzlaska = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Poster = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Filmovi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FilmoviBioskopi",
                columns: table => new
                {
                    BioskopId = table.Column<int>(type: "int", nullable: false),
                    FilmId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmoviBioskopi", x => new { x.BioskopId, x.FilmId });
                    table.ForeignKey(
                        name: "FK_FilmoviBioskopi_Bioskopi_BioskopId",
                        column: x => x.BioskopId,
                        principalTable: "Bioskopi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FilmoviBioskopi_Filmovi_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Filmovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FilmoviGlumci",
                columns: table => new
                {
                    GlumacId = table.Column<int>(type: "int", nullable: false),
                    FilmId = table.Column<int>(type: "int", nullable: false),
                    Uloga = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    Redosled = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmoviGlumci", x => new { x.GlumacId, x.FilmId });
                    table.ForeignKey(
                        name: "FK_FilmoviGlumci_Filmovi_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Filmovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FilmoviGlumci_Glumci_GlumacId",
                        column: x => x.GlumacId,
                        principalTable: "Glumci",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FilmoviZanrovi",
                columns: table => new
                {
                    ZanrId = table.Column<int>(type: "int", nullable: false),
                    FilmId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmoviZanrovi", x => new { x.ZanrId, x.FilmId });
                    table.ForeignKey(
                        name: "FK_FilmoviZanrovi_Filmovi_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Filmovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FilmoviZanrovi_Zanrovi_ZanrId",
                        column: x => x.ZanrId,
                        principalTable: "Zanrovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilmoviBioskopi_FilmId",
                table: "FilmoviBioskopi",
                column: "FilmId");

            migrationBuilder.CreateIndex(
                name: "IX_FilmoviGlumci_FilmId",
                table: "FilmoviGlumci",
                column: "FilmId");

            migrationBuilder.CreateIndex(
                name: "IX_FilmoviZanrovi_FilmId",
                table: "FilmoviZanrovi",
                column: "FilmId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmoviBioskopi");

            migrationBuilder.DropTable(
                name: "FilmoviGlumci");

            migrationBuilder.DropTable(
                name: "FilmoviZanrovi");

            migrationBuilder.DropTable(
                name: "Filmovi");
        }
    }
}
