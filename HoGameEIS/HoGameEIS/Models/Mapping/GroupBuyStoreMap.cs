using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyStoreMap : EntityTypeConfiguration<GroupBuyStore>
    {
        public GroupBuyStoreMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuyStoreId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuyStores");
            this.Property(t => t.GroupBuyStoreId).HasColumnName("GroupBuyStoreId");
            this.Property(t => t.StoreName).HasColumnName("StoreName");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.Tel).HasColumnName("Tel");
            this.Property(t => t.Category).HasColumnName("Category");
        }
    }
}
