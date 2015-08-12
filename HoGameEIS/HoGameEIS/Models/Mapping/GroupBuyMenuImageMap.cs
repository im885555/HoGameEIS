using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyMenuImageMap : EntityTypeConfiguration<GroupBuyMenuImage>
    {
        public GroupBuyMenuImageMap()
        {
            // Primary Key
            this.HasKey(t => t.ImageId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyMenuImages");
            this.Property(t => t.ImageId).HasColumnName("ImageId");
            this.Property(t => t.ImageUrl).HasColumnName("ImageUrl");
            this.Property(t => t.GroupBuyId).HasColumnName("GroupBuyId");

            // Relationships
            this.HasRequired(t => t.GroupBuy)
                .WithMany(t => t.GroupBuyMenuImages)
                .HasForeignKey(d => d.GroupBuyId);
        }
        // Primary Key
            

            // Properties
            // Table & Column Mappings
            //this.ToTable("GroupBuyItems");
            //this.Property(t => t.ItemId).HasColumnName("ItemId");
            //this.Property(t => t.ItemName).HasColumnName("ItemName");
            //this.Property(t => t.GroupBuyId).HasColumnName("GroupBuyId");

            //// Relationships
            //this.HasRequired(t => t.GroupBuy)
            //    .WithMany(t => t.GroupBuyItems)
            //    .HasForeignKey(d => d.GroupBuyId);
    }
}