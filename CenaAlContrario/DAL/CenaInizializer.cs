using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using CenaAlContrario.Models;

namespace CenaAlContrario.DAL
{
    public class CenaInizializer : CreateDatabaseIfNotExists<CenaContext>
    {
        protected override void Seed(CenaContext context)
        {
            var cena = new Cena() { Nome = "Nicola" };
            context.Cenas.Add(cena);
            context.SaveChanges();
        }
    }
}