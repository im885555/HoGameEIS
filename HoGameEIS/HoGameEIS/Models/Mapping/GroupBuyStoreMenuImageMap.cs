using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyStoreMenuImageMap : EntityTypeConfiguration<GroupBuyStoreMenuImage>
    {
        public GroupBuyStoreMenuImageMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuyStoreMenuImageId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyStoreMenuImages");
            this.Property(t => t.GroupBuyStoreMenuImageId).HasColumnName("GroupBuyStoreMenuImageId");
            this.Property(t => t.path).HasColumnName("path");
            this.Property(t => t.GroupBuyStoreId).HasColumnName("GroupBuyStoreId");

            // Relationships
            this.HasRequired(t => t.GroupBuyStore)
                .WithMany(t => t.GroupBuyStoreMenuImages)
                .HasForeignKey(d => d.GroupBuyStoreId);

        }
    }
}