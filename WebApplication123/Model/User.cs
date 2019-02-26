using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication123.Model
{
    public class User
    {
        public int id_korisnik { get; set; }
        public string ime { get; set; }
        public string prezime { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string tip { get; set; }
    }
}
