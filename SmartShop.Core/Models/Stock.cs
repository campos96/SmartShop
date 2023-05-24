using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Core.Models
{
    public static class StockStatus
    {
        public static string Created => "Created";
        public static string UnderReview => "Under review";
        public static string Listed => "Listed";
        public static string OutOfStock => "Out of stock";
    }

    public class Stock
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ShopId { get; set; }

        [Required]
        public Guid PurchaseOrderId { get; set; }

        [Required]
        public decimal Price { get; set; }

        public decimal? EstimatedPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime Updated { get; set; }

        [Required]
        public string Status { get; set; }

        public string? Notes { get; set; }

        [ForeignKey(nameof(ShopId))]
        public Shop Shop { get; set; }  

        [ForeignKey(nameof(PurchaseOrderId))]
        public PurchaseOrder? PurchaseOrder { get; set; }
    }
}
