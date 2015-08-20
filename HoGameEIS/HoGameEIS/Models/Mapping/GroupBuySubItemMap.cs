using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuySubItemMap : EntityTypeConfiguration<GroupBuySubItem>
    {
        public GroupBuySubItemMap()
        {
            // Primary Key
            this.HasKey(t => t.SubItemId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuySubItems");
            this.Property(t => t.SubItemId).HasColumnName("SubItemId");
            this.Property(t => t.SubItemName).HasColumnName("SubItemName");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.ItemId).HasColumnName("ItemId");

            // Relationships
            this.HasRequired(t => t.GroupBuyItem)
                .WithMany(t => t.SubItems)
                .HasForeignKey(d => d.ItemId);

        }
    }
}
