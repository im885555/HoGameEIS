using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyStoreMenuImageMap : EntityTypeConfiguration<GroupBuyStoreMenuImage>
    {
        public GroupBuyStoreMenuImageMap()
        {
            // Primary Key
            this.HasKey(t => t.ImageId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyStoreMenuImages");
            this.Property(t => t.ImageId).HasColumnName("ImageId");
            this.Property(t => t.path).HasColumnName("path");
            this.Property(t => t.StoreId).HasColumnName("StoreId");

            // Relationships
            this.HasRequired(t => t.GroupBuyStore)
                .WithMany(t => t.GroupBuyStoreMenuImages)
                .HasForeignKey(d => d.StoreId);

        }
    }
}
