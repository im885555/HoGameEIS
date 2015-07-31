using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyStoreSubItemMap : EntityTypeConfiguration<GroupBuyStoreSubItem>
    {
        public GroupBuyStoreSubItemMap()
        {
            // Primary Key
            this.HasKey(t => t.SubItemId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyStoreSubItems");
            this.Property(t => t.SubItemId).HasColumnName("SubItemId");
            this.Property(t => t.SubItemName).HasColumnName("SubItemName");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.ItemId).HasColumnName("ItemId");

            // Relationships
            this.HasRequired(t => t.GroupBuyStoreItem)
                .WithMany(t => t.GroupBuyStoreSubItems)
                .HasForeignKey(d => d.ItemId);

        }
    }
}
