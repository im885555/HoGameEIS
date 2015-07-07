using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyStoreSubItemMap : EntityTypeConfiguration<GroupBuyStoreSubItem>
    {
        public GroupBuyStoreSubItemMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuyStoreSubItemId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyStoreSubItems");
            this.Property(t => t.GroupBuyStoreSubItemId).HasColumnName("GroupBuyStoreSubItemId");
            this.Property(t => t.SubItemName).HasColumnName("SubItemName");
            this.Property(t => t.Price).HasColumnName("Price");
            this.Property(t => t.GroupBuyStoreItemId).HasColumnName("GroupBuyStoreItemId");

            // Relationships
            this.HasRequired(t => t.GroupBuyStoreItem)
                .WithMany(t => t.GroupBuyStoreSubItems)
                .HasForeignKey(d => d.GroupBuyStoreItemId);

        }
    }
}
