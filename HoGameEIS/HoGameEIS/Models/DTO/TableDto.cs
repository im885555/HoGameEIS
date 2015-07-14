using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HoGameEIS.Models.DTO
{
    public class TableDto<T>
    {
        public int total { get; set; }
        public ICollection<T> rows { get; set; }
    }
}