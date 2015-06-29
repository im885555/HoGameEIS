using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace HoGameEIS.Models
{
    public class HoGameEISContext : DbContext 
    {
        public DbSet<Employee> Employees { get; set; }

        public HoGameEISContext()
            : base("name=DefaultConnection") 
        {
            base.Configuration.ProxyCreationEnabled = false;
        }
    }
}