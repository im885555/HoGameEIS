using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HoGameEIS.Models
{
    public partial class GroupBuyStore
    {
        public GroupBuyStore()
        {
            this.GroupBuyStoreItems = new List<GroupBuyStoreItem>();
            this.GroupBuyStoreMenuImages = new List<GroupBuyStoreMenuImage>();
        }


        public int StoreId { get; set; }
        
        [Required]
        public string StoreName { get; set; }
        public string Address { get; set; }
        public string Tel { get; set; }
        public string Memo { get; set; }
        
        [Required]
        public string Category { get; set; }
        public virtual ICollection<GroupBuyStoreItem> GroupBuyStoreItems { get; set; }
        public virtual ICollection<GroupBuyStoreMenuImage> GroupBuyStoreMenuImages { get; set; }

        
        //public ICollection<GroupBuyStoreItem> ParserStoreItems()
        //{
        //    int itemId=-1;
        //    ICollection<GroupBuyStoreItem> items = this.GroupBuyStoreItems;
        //    List<GroupBuyStoreItem> _items = new List<GroupBuyStoreItem>();
        //    foreach (var item in items)
        //    {
        //        if (item.ItemId != itemId)
        //        {
        //            itemId = item.ItemId;
        //            var subItems = new List<GroupBuyStoreSubItem>();
        //            subItems.Add(new GroupBuyStoreSubItem()
        //            {
        //                SubItemId = item.SubItemId,
        //                SubItemName = item.SubItemName,
        //                Price = item.Price
        //            });

        //            _items.Add(new GroupBuyStoreItem()
        //            {
        //                ItemId = item.ItemId,
        //                StoreId = item.StoreId,
        //                SubItems = subItems

        //            });
        //        }
        //        else
        //        {
        //            var _item = _items.Find(o => o.ItemId == itemId);
        //            var subItems = _item.SubItems;
        //            subItems.Add(new GroupBuyStoreSubItem()
        //            {
        //                SubItemId = item.SubItemId,
        //                SubItemName = item.SubItemName,
        //                Price = item.Price
        //            });
        //            _item.SubItems = subItems;
        //        }

        //    }
        //    return _items;

        //}
    }
}
