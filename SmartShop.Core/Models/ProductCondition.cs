using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Core.Models
{
    public class ProductCondition
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ShopId { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Description { get; set; }
    }
}
