using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Core.Models
{
    public class PurchaseOrder
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ShopId { get; set; }

        [Required]
        public Guid ProductId { get; set; }

        [Required]
        public string PurchaseOrderNumber { get; set; }

        [Required]
        public decimal Price { get; set; }

        public decimal? PriceInUSD { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        [ForeignKey(nameof(ShopId))]
        public Shop? Shop { get; set; }

        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }
    }
}
