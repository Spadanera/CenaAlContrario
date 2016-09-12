using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CenaAlContrario.DAL;
using CenaAlContrario.Models;
using Newtonsoft.Json;
using System.Web;
using System.Web.Mvc;

namespace CenaAlContrario.Controllers
{
    public class CenasController : ApiController
    {
        private CenaContext db = new CenaContext();
        // GET: api/Cenas
        public IHttpActionResult GetCenas()
        {
            var cene = db.Cenas.ToList();
            return Ok(JsonConvert.SerializeObject(cene, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }));
        }

        // GET: api/Cenas/5
        [ResponseType(typeof(Cena))]
        public IHttpActionResult GetCena(int id)
        {
            Cena cena = db.Cenas.Find(id);
            if (cena == null)
            {
                return NotFound();
            }

            return Ok(JsonConvert.SerializeObject(cena, Formatting.Indented,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                }));
        }

        // PUT: api/Cenas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCena(int id, Cena cena)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cena.CenaId)
            {
                return BadRequest();
            }

            db.Entry(cena).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CenaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Cenas
        [ResponseType(typeof(Cena))]
        public IHttpActionResult PostCena(Cena cena)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            cena.DataInserimento = DateTime.Now;
            db.Cenas.Add(cena);
            db.SaveChanges();

            return Ok(cena.CenaId.ToString());
        }

        // DELETE: api/Cenas/5
        [ResponseType(typeof(Cena))]
        public IHttpActionResult DeleteCena(int id)
        {
            Cena cena = db.Cenas.Find(id);
            if (cena == null)
            {
                return NotFound();
            }

            db.Portatas.Where(p => p.Cena.CenaId == id).ToList().ForEach(delegate (Portata portata)
            {
                Portata dbPortata = db.Portatas.Find(portata.PortataId);
                if (dbPortata != null)
                    db.Portatas.Remove(portata);
            });
            db.SaveChanges();

            db.Cenas.Remove(cena);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CenaExists(int id)
        {
            return db.Cenas.Count(e => e.CenaId == id) > 0;
        }
    }
}