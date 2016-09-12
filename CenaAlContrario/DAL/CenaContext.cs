using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using CenaAlContrario.Models;

namespace CenaAlContrario.DAL
{
    public class CenaContext : DbContext
    {
        public CenaContext() : base("name=CenaConnectionString")
        { }

        public DbSet<Cena> Cenas { get; set; }
        public DbSet<Portata> Portatas { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingEntitySetNameConvention>();
            //base.OnModelCreating(modelBuilder);
        }
    }
}