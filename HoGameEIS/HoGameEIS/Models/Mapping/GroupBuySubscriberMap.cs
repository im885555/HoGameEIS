using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuySubscriberMap : EntityTypeConfiguration<GroupBuySubscriber>
    {
        public GroupBuySubscriberMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuySubscriberId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuySubscribers");
            this.Property(t => t.GroupBuySubscriberId).HasColumnName("GroupBuySubscriberId");
            this.Property(t => t.EmployeeId).HasColumnName("EmployeeId");
            this.Property(t => t.Amount).HasColumnName("Amount");
            this.Property(t => t.GroupBuySubItemId).HasColumnName("GroupBuySubItemId");

            // Relationships
            this.HasRequired(t => t.Employee)
                .WithMany(t => t.GroupBuySubscribers)
                .HasForeignKey(d => d.EmployeeId);
            this.HasRequired(t => t.GroupBuySubItem)
                .WithMany(t => t.GroupBuySubscribers)
                .HasForeignKey(d => d.GroupBuySubItemId);

        }
    }
}
