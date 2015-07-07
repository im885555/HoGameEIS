using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyPaidMap : EntityTypeConfiguration<GroupBuyPaid>
    {
        public GroupBuyPaidMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuyPaidId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyPaids");
            this.Property(t => t.GroupBuyPaidId).HasColumnName("GroupBuyPaidId");
            this.Property(t => t.EmployeeId).HasColumnName("EmployeeId");
            this.Property(t => t.Paid).HasColumnName("Paid");
            this.Property(t => t.GroupBuyId).HasColumnName("GroupBuyId");

            // Relationships
            this.HasRequired(t => t.Employee)
                .WithMany(t => t.GroupBuyPaids)
                .HasForeignKey(d => d.EmployeeId);
            this.HasRequired(t => t.GroupBuy)
                .WithMany(t => t.GroupBuyPaids)
                .HasForeignKey(d => d.GroupBuyId);

        }
    }
}
