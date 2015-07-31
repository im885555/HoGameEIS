using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyStoreItemMap : EntityTypeConfiguration<GroupBuyStoreItem>
    {
        public GroupBuyStoreItemMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuyStoreItemId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyStoreItems");
            this.Property(t => t.GroupBuyStoreItemId).HasColumnName("GroupBuyStoreItemId");
            this.Property(t => t.ItemName).HasColumnName("ItemName");
            this.Property(t => t.StoreId).HasColumnName("StoreId");

            // Relationships
            this.HasRequired(t => t.GroupBuyStore)
                .WithMany(t => t.GroupBuyStoreItems)
                .HasForeignKey(d => d.StoreId);

        }
    }
}
