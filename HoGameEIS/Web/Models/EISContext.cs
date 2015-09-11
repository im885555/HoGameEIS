using System.Data.Entity;
using System.Data.Entity.Infrastructure;

namespace Web.Models
{

    public partial class EISContext : DbContext
    {

        public EISContext()
            : base("Name=HoGameEISContext")
        {
            base.Configuration.ProxyCreationEnabled = false;
        }

       // public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {


        }
    }
}