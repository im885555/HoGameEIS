using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyItemMap : EntityTypeConfiguration<GroupBuyItem>
    {
        public GroupBuyItemMap()
        {
            // Primary Key
            this.HasKey(t => t.ItemId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyItems");
            this.Property(t => t.ItemId).HasColumnName("ItemId");
            this.Property(t => t.ItemName).HasColumnName("ItemName");
            this.Property(t => t.GroupBuyId).HasColumnName("GroupBuyId");

            // Relationships
            this.HasRequired(t => t.GroupBuy)
                .WithMany(t => t.GroupBuyItems)
                .HasForeignKey(d => d.GroupBuyId);

        }
    }
}
