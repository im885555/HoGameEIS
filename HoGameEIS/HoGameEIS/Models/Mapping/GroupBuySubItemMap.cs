using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuySubItemMap : EntityTypeConfiguration<GroupBuySubItem>
    {
        public GroupBuySubItemMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuySubItemId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuySubItems");
            this.Property(t => t.GroupBuySubItemId).HasColumnName("GroupBuySubItemId");
            this.Property(t => t.SubItemName).HasColumnName("SubItemName");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.GroupBuyItemId).HasColumnName("GroupBuyItemId");

            // Relationships
            this.HasRequired(t => t.GroupBuyItem)
                .WithMany(t => t.GroupBuySubItems)
                .HasForeignKey(d => d.GroupBuyItemId);

        }
    }
}
