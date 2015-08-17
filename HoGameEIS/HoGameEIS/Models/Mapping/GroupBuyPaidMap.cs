using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyPaidMap : EntityTypeConfiguration<GroupBuyPaid>
    {
        public GroupBuyPaidMap()
        {
            // Primary Key
            this.HasKey(t => t.PaidId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyPaids");
            this.Property(t => t.PaidId).HasColumnName("PaidId");
            this.Property(t => t.EmployeeId).HasColumnName("EmployeeId");
            this.Property(t => t.Paid).HasColumnName("Paid");
            this.Property(t => t.GroupBuyId).HasColumnName("GroupBuyId");

            this.HasRequired(t => t.GroupBuy)
                .WithMany(t => t.GroupBuyPaids)
                .HasForeignKey(d => d.GroupBuyId);

        }
    }
}
