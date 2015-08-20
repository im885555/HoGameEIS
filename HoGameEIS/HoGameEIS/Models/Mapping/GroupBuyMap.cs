using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace HoGameEIS.Models.Mapping
{
    public class GroupBuyMap : EntityTypeConfiguration<GroupBuy>
    {
        public GroupBuyMap()
        {
            // Primary Key
            this.HasKey(t => t.GroupBuyId);

            // Properties
            // Table & Column Mappings
            this.ToTable("GroupBuys");
            this.Property(t => t.GroupBuyId).HasColumnName("GroupBuyId");
            this.Property(t => t.Description).HasColumnName("Description");
            this.Property(t => t.StartTime).HasColumnName("StartTime");
            this.Property(t => t.EndTime).HasColumnName("EndTime");
            this.Property(t => t.StoreId).HasColumnName("StoreId");
            this.Property(t => t.StoreName).HasColumnName("StoreName");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.Tel).HasColumnName("Tel");
            this.Property(t => t.Memo).HasColumnName("Memo");
            this.Property(t => t.Creator).HasColumnName("Creator");
        }
    }
}

