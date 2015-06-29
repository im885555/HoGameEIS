using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace HoGameEIS.Models
{
    public class Employee
    {
        [Key]
        public string Email { get; set; }
        public string Address { get; set; }
    }
}