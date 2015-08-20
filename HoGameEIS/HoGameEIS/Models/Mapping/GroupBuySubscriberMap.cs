using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuySubscriberMap : EntityTypeConfiguration<GroupBuySubscriber>
    {
        public GroupBuySubscriberMap()
        {
            // Primary Key
            this.HasKey(t => t.SubscriberId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuySubscribers");
            this.Property(t => t.SubscriberId).HasColumnName("SubscriberId");
            this.Property(t => t.EmployeeId).HasColumnName("EmployeeId");
            this.Property(t => t.Amount).HasColumnName("Amount");
            this.Property(t => t.SubItemId).HasColumnName("SubItemId");
            this.Property(t => t.SubscriberName).HasColumnName("SubscriberName");

            this.HasRequired(t => t.GroupBuySubItem)
                .WithMany(t => t.GroupBuySubscribers)
                .HasForeignKey(d => d.SubItemId);

        }
    }
}
