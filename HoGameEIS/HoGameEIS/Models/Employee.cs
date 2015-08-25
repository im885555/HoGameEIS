using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace HoGameEIS.Models
{
    public partial class Employee
    {
        public Employee()
        {
           
        }

        public string Email { get; set; }
        public string Address { get; set; }
        public int EmployeeId { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }

    }
}
