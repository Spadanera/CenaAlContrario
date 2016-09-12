using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CenaAlContrario.Models
{
    public class Cena
    {
        [Key]
        public int CenaId { get; set; }
        public string Nome { get; set; }
        public DateTime DataInserimento { get; set; }
        public int Anno { get; set; }
        public int NumeroPartecipanti { get; set; }
        public string Localita { get; set; }
        public string Locale { get; set; }
        public virtual ICollection<Portata> Portatas { get; set; }
        public byte[] Foto { get; set; }
    }

    public class Portata
    {
        [Key]
        public int PortataId { get; set; }
        public Cena Cena { get; set; }
        public int Ordine { get; set; }
        public string Piatto { get; set; }
    }
}